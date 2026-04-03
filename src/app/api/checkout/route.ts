import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout session for a blueprint purchase.
 *
 * Request body:
 *   { blueprintSlug: string, tier: "blueprint" | "setup" }
 *
 * Integration steps (when Stripe is connected):
 *   1. npm install stripe
 *   2. Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET to .env.local
 *   3. Create Stripe products/prices for each blueprint and tier
 *   4. Replace the stub below with real Stripe Checkout session creation
 *   5. Return the session URL for client redirect
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { blueprintSlug, tier } = body;

    if (!blueprintSlug || !tier) {
      return NextResponse.json(
        { error: "Missing blueprintSlug or tier" },
        { status: 400 }
      );
    }

    // TODO: Replace with real Stripe Checkout session creation
    //
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({
    //   mode: "payment",
    //   line_items: [{ price: priceId, quantity: 1 }],
    //   success_url: `${process.env.NEXT_PUBLIC_URL}/blueprints/${blueprintSlug}?purchased=true`,
    //   cancel_url: `${process.env.NEXT_PUBLIC_URL}/blueprints/${blueprintSlug}`,
    //   metadata: { blueprintSlug, tier },
    //   customer_email: body.email,
    // });
    // return NextResponse.json({ url: session.url });

    return NextResponse.json(
      { message: "Stripe integration pending. Blueprint: " + blueprintSlug + ", Tier: " + tier },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
