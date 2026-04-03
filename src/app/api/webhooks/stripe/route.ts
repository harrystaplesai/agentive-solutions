import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    let event: Stripe.Event;

    try {
      event = getStripe().webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const { blueprintSlug, tier, blueprintTitle } = session.metadata || {};
      const customerEmail = session.customer_details?.email;
      const amountPaid = session.amount_total;

      console.log("Payment received:", {
        blueprintSlug,
        tier,
        blueprintTitle,
        customerEmail,
        amountPaid: amountPaid ? amountPaid / 100 : 0,
        sessionId: session.id,
      });

      // TODO: Phase 2 integrations (wire up when services are configured)
      //
      // 1. Generate signed download URL from Supabase Storage
      //    Requires: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY env vars
      //    and blueprint files uploaded to a private "blueprints" bucket
      //
      // 2. Send email with download link via Resend
      //    Requires: RESEND_API_KEY env var
      //    and verified sending domain (agentivesolutions.co.uk)
      //
      // 3. Create FreeAgent invoice via API
      //    Requires: FREEAGENT_CLIENT_ID, FREEAGENT_CLIENT_SECRET,
      //    FREEAGENT_REFRESH_TOKEN env vars
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
