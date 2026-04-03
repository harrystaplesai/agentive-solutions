import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getBlueprint } from "@/content/blueprints";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: NextRequest) {
  try {
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

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
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
      success_url: `${process.env.NEXT_PUBLIC_URL}/blueprints/${blueprintSlug}?purchased=true&tier=${tier}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/blueprints/${blueprintSlug}`,
      metadata: {
        blueprintSlug,
        tier,
        blueprintTitle: blueprint.title,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
