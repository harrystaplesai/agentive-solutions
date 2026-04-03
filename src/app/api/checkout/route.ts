import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getBlueprint } from "@/content/blueprints";

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("STRIPE_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      timeout: 30000,
      maxNetworkRetries: 3,
    });

    const body = await request.json();
    const { blueprintSlug, tier } = body;

    if (!blueprintSlug || !tier || !["blueprint", "setup"].includes(tier)) {
      return NextResponse.json(
        { error: "Missing or invalid blueprintSlug or tier" },
        { status: 400 }
      );
    }

    const blueprint = getBlueprint(blueprintSlug);
    if (!blueprint) {
      return NextResponse.json(
        { error: "Blueprint not found" },
        { status: 404 }
      );
    }

    const price = tier === "setup" ? blueprint.pricing.setup : blueprint.pricing.blueprint;
    const tierLabel = tier === "setup" ? "Blueprint + Setup" : "Blueprint";
    const baseUrl = "https://www.agentivesolutions.co.uk";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${blueprint.title} (${tierLabel})`,
              description: blueprint.headline,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/blueprints/${blueprintSlug}?purchased=true&tier=${tier}`,
      cancel_url: `${baseUrl}/blueprints/${blueprintSlug}`,
      metadata: {
        blueprintSlug,
        tier,
        blueprintTitle: blueprint.title,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Checkout error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
