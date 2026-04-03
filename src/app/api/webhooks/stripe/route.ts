import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhooks/stripe
 *
 * Handles Stripe webhook events after successful payment.
 *
 * On checkout.session.completed:
 *   1. Generate a signed Supabase Storage URL for the blueprint files
 *   2. Send an email to the buyer with the download link (via Resend)
 *   3. Create a FreeAgent invoice marked as paid (via FreeAgent API)
 *
 * Integration steps:
 *   1. npm install stripe @supabase/supabase-js resend
 *   2. Add environment variables:
 *      - STRIPE_WEBHOOK_SECRET
 *      - SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *      - RESEND_API_KEY
 *      - FREEAGENT_CLIENT_ID, FREEAGENT_CLIENT_SECRET, FREEAGENT_REFRESH_TOKEN
 *   3. Configure Stripe webhook endpoint in Stripe dashboard pointing to this URL
 *   4. Upload blueprint files to Supabase Storage in a private bucket
 *   5. Replace the stub below with real implementation
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    // TODO: Verify Stripe webhook signature
    //
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const sig = request.headers.get("stripe-signature")!;
    // const event = stripe.webhooks.constructEvent(
    //   body,
    //   sig,
    //   process.env.STRIPE_WEBHOOK_SECRET!
    // );

    // TODO: Handle checkout.session.completed event
    //
    // if (event.type === "checkout.session.completed") {
    //   const session = event.data.object;
    //   const { blueprintSlug, tier } = session.metadata;
    //   const customerEmail = session.customer_email;
    //
    //   // 1. Generate signed download URL (expires in 48 hours)
    //   // const supabase = createClient(
    //   //   process.env.SUPABASE_URL!,
    //   //   process.env.SUPABASE_SERVICE_ROLE_KEY!
    //   // );
    //   // const { data } = await supabase.storage
    //   //   .from("blueprints")
    //   //   .createSignedUrl(`${blueprintSlug}/files.zip`, 48 * 60 * 60);
    //
    //   // 2. Send email with download link
    //   // const resend = new Resend(process.env.RESEND_API_KEY!);
    //   // await resend.emails.send({
    //   //   from: "blueprints@agentivesolutions.co.uk",
    //   //   to: customerEmail,
    //   //   subject: `Your blueprint: ${blueprintSlug}`,
    //   //   html: `<p>Download your blueprint: <a href="${data.signedUrl}">Download link</a></p>
    //   //          <p>This link expires in 48 hours.</p>`,
    //   // });
    //
    //   // 3. Create FreeAgent invoice
    //   // await createFreeAgentInvoice(session);
    // }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
