export type BlueprintCategory =
  | "ai-agents"
  | "document-ai"
  | "lead-gen"
  | "workflow"
  | "integrations"
  | "data";

export interface WorkflowNode {
  label: string;
  color: string;
  icon: string;
}

export interface Blueprint {
  slug: string;
  title: string;
  headline: string;
  description: string;
  category: BlueprintCategory;
  categoryLabel: string;
  isNew: boolean;
  pricing: {
    blueprint: number;
    setup: number;
  };
  workflowNodes: WorkflowNode[];
  whatsIncluded: string[];
  requiredServices: {
    name: string;
    cost: string;
    url: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

const nodeColors = {
  blue: "#3b82f6",
  green: "#22c55e",
  orange: "#f59e0b",
  purple: "#a855f7",
  rose: "#f43f5e",
  cyan: "#06b6d4",
  emerald: "#10b981",
  amber: "#f59e0b",
};

export const categories: { value: BlueprintCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "ai-agents", label: "AI Agents" },
  { value: "document-ai", label: "Document AI" },
  { value: "lead-gen", label: "Lead Gen" },
  { value: "workflow", label: "Workflow" },
  { value: "integrations", label: "Integrations" },
  { value: "data", label: "Data" },
];

export const blueprints: Blueprint[] = [
  {
    slug: "email-document-classifier",
    title: "Email document classifier",
    headline: "Incoming emails sorted and filed in seconds, not hours",
    description:
      "Monitors one or more email inboxes, extracts attachments, classifies each document by type using AI, and routes it to the correct folder in your cloud storage. Metadata gets logged to a database for search and reporting.",
    category: "document-ai",
    categoryLabel: "Document AI",
    isNew: true,
    pricing: { blueprint: 249, setup: 599 },
    workflowNodes: [
      { label: "Email Inbox", color: nodeColors.blue, icon: "Mail" },
      { label: "Extract Files", color: nodeColors.cyan, icon: "Paperclip" },
      { label: "AI Classify", color: nodeColors.purple, icon: "Brain" },
      { label: "Route & Store", color: nodeColors.green, icon: "FolderOpen" },
    ],
    whatsIncluded: [
      "N8N workflow JSON with full configuration",
      "AI classification prompt templates (tested across 12 document types)",
      "Supabase schema with metadata table and indexes",
      "Cloud storage folder structure template",
      "Setup guide with screenshots for every step",
    ],
    requiredServices: [
      { name: "N8N", cost: "$24/month (Starter)", url: "https://n8n.io/pricing" },
      { name: "OpenAI API", cost: "$5 to $20/month based on volume", url: "https://platform.openai.com/pricing" },
      { name: "Supabase", cost: "Free tier works for most volumes", url: "https://supabase.com/pricing" },
      { name: "Email provider with IMAP access", cost: "Your existing email", url: "" },
    ],
    faqs: [
      { question: "What document types can it classify?", answer: "The AI prompt handles certificates, invoices, contracts, registrations, reports, and correspondence out of the box. You can add custom types by editing the prompt template." },
      { question: "How many emails can it process per day?", answer: "The workflow checks for new emails every 5 minutes. On the N8N Starter plan, it handles hundreds of documents per day without hitting limits." },
      { question: "Does it work with Gmail and Outlook?", answer: "Yes. Any email provider that supports IMAP works. The setup guide covers Gmail, Outlook/Microsoft 365, and generic IMAP configuration." },
    ],
  },
  {
    slug: "document-search-chatbot",
    title: "Document search chatbot",
    headline: "Ask questions about your documents and get answers with source links",
    description:
      "Takes your classified documents, generates vector embeddings, stores them in a searchable database, and provides a chatbot interface where your team asks natural language questions and receives answers with direct download links to the source files.",
    category: "document-ai",
    categoryLabel: "Document AI",
    isNew: true,
    pricing: { blueprint: 299, setup: 699 },
    workflowNodes: [
      { label: "Documents", color: nodeColors.blue, icon: "FileText" },
      { label: "Embed", color: nodeColors.purple, icon: "Layers" },
      { label: "Vector Store", color: nodeColors.cyan, icon: "Database" },
      { label: "Chatbot", color: nodeColors.green, icon: "MessageSquare" },
    ],
    whatsIncluded: [
      "N8N workflow JSON for document embedding pipeline",
      "Supabase schema with pgvector extension configured",
      "Chatbot interface (embeddable HTML/JS widget)",
      "Retrieval prompt templates optimized for accuracy",
      "Setup guide covering embedding, search tuning, and deployment",
    ],
    requiredServices: [
      { name: "N8N", cost: "$24/month (Starter)", url: "https://n8n.io/pricing" },
      { name: "OpenAI API", cost: "$10 to $30/month based on document volume", url: "https://platform.openai.com/pricing" },
      { name: "Supabase", cost: "$25/month (Pro, for pgvector)", url: "https://supabase.com/pricing" },
    ],
    faqs: [
      { question: "How many documents can it handle?", answer: "The Supabase Pro plan supports millions of vector embeddings. Most businesses with under 50,000 documents run comfortably on the base configuration." },
      { question: "Can I embed the chatbot on my internal site?", answer: "Yes. The chatbot ships as an embeddable widget you drop into any webpage with a single script tag." },
      { question: "Does it work with the email document classifier?", answer: "They pair together. The classifier sorts and stores your documents, then this system makes them searchable via natural language." },
    ],
  },
  {
    slug: "customer-retention-alerting",
    title: "Customer retention alerting",
    headline: "Catch disengaging customers before they leave",
    description:
      "Connects to your CRM or ERP, analyzes customer ordering frequency using statistical deviation detection, and alerts your sales team via email or Slack when a customer's behaviour deviates from their normal pattern. Includes draft retention email generation.",
    category: "ai-agents",
    categoryLabel: "AI Agents",
    isNew: true,
    pricing: { blueprint: 299, setup: 749 },
    workflowNodes: [
      { label: "CRM / ERP", color: nodeColors.blue, icon: "Building2" },
      { label: "Pattern Analysis", color: nodeColors.purple, icon: "TrendingDown" },
      { label: "Draft Email", color: nodeColors.orange, icon: "PenLine" },
      { label: "Alert Sales Rep", color: nodeColors.rose, icon: "Bell" },
    ],
    whatsIncluded: [
      "N8N workflow JSON with scheduling and CRM connection",
      "Statistical deviation algorithm (configurable thresholds)",
      "AI prompt templates for personalized retention email drafts",
      "Slack notification template with customer context",
      "Setup guide for CRM API connection",
    ],
    requiredServices: [
      { name: "N8N", cost: "$24/month (Starter)", url: "https://n8n.io/pricing" },
      { name: "OpenAI API", cost: "$5 to $15/month", url: "https://platform.openai.com/pricing" },
      { name: "CRM with API access", cost: "Your existing CRM (HubSpot, Pipedrive, Salesforce)", url: "" },
      { name: "Slack (optional)", cost: "Free tier works", url: "https://slack.com/pricing" },
    ],
    faqs: [
      { question: "What CRMs does this work with?", answer: "The workflow ships configured for HubSpot and Pipedrive. The setup guide includes instructions for adapting it to Salesforce or any CRM with a REST API." },
      { question: "How does it decide a customer is at risk?", answer: "It calculates each customer's average ordering interval over the past 12 months, then flags accounts where the current gap exceeds 1.5 standard deviations. The threshold is configurable." },
      { question: "Does it send emails automatically?", answer: "No. It drafts the email and sends it to the assigned sales rep for review. The rep edits and sends from their own inbox. Human stays in the loop." },
    ],
  },
  {
    slug: "inventory-monitoring-agent",
    title: "Inventory monitoring agent",
    headline: "AI that watches your stock levels and recommends adjustments",
    description:
      "Connects to your ERP or inventory system, analyzes historical ordering patterns, back orders, and movement data across all products, then generates min/max adjustment recommendations with supporting rationale. Recommendations pass through a review dashboard before taking effect.",
    category: "ai-agents",
    categoryLabel: "AI Agents",
    isNew: false,
    pricing: { blueprint: 349, setup: 899 },
    workflowNodes: [
      { label: "ERP Data", color: nodeColors.blue, icon: "BarChart3" },
      { label: "Analyze Patterns", color: nodeColors.purple, icon: "Brain" },
      { label: "Generate Recs", color: nodeColors.orange, icon: "ListChecks" },
      { label: "Review Queue", color: nodeColors.green, icon: "CheckCircle" },
    ],
    whatsIncluded: [
      "N8N workflow JSON with ERP connection and scheduling",
      "Analysis algorithm for fast/slow mover identification",
      "AI prompt for recommendation rationale generation",
      "Review dashboard template (React component)",
      "Supabase schema for recommendations and approval logging",
      "Setup guide for ERP API connection",
    ],
    requiredServices: [
      { name: "N8N", cost: "$24/month (Starter)", url: "https://n8n.io/pricing" },
      { name: "OpenAI API", cost: "$10 to $25/month", url: "https://platform.openai.com/pricing" },
      { name: "Supabase", cost: "Free tier works", url: "https://supabase.com/pricing" },
      { name: "ERP with API access", cost: "Your existing ERP", url: "" },
    ],
    faqs: [
      { question: "What ERPs does this support?", answer: "Ships with configuration for Sage 300 REST API. The setup guide covers adapting it to NetSuite, SAP Business One, or any ERP with REST/SOAP endpoints." },
      { question: "Can it write changes back to the ERP?", answer: "The base workflow generates recommendations for human approval. The setup tier includes configuring write back to your ERP after approval if your API supports it." },
      { question: "How often does it run?", answer: "Configurable. Most businesses run it weekly or monthly. The workflow handles any schedule you set in N8N." },
    ],
  },
  {
    slug: "lead-enrichment-pipeline",
    title: "Lead enrichment pipeline",
    headline: "Raw prospect names become verified, scored CRM contacts",
    description:
      "Takes prospect names or LinkedIn profile URLs, enriches them with verified email, phone, company data, and social profiles through waterfall data providers, then populates your CRM with complete contact records ready for outreach.",
    category: "lead-gen",
    categoryLabel: "Lead Gen",
    isNew: true,
    pricing: { blueprint: 279, setup: 699 },
    workflowNodes: [
      { label: "Prospect List", color: nodeColors.blue, icon: "Users" },
      { label: "Enrich Data", color: nodeColors.purple, icon: "Search" },
      { label: "Verify Email", color: nodeColors.cyan, icon: "ShieldCheck" },
      { label: "Push to CRM", color: nodeColors.green, icon: "UserPlus" },
    ],
    whatsIncluded: [
      "N8N workflow JSON with enrichment and CRM sync",
      "Waterfall enrichment logic (tries multiple providers until data found)",
      "Email verification integration",
      "CRM deduplication logic",
      "Setup guide for Clay, Apollo, or manual enrichment sources",
    ],
    requiredServices: [
      { name: "N8N", cost: "$24/month (Starter)", url: "https://n8n.io/pricing" },
      { name: "Clay or Apollo.io", cost: "$49 to $349/month depending on volume", url: "https://clay.com/pricing" },
      { name: "CRM (Pipedrive, HubSpot, or Salesforce)", cost: "Your existing CRM", url: "" },
    ],
    faqs: [
      { question: "Where do the prospects come from?", answer: "You provide them. Upload a CSV, connect a Google Sheet, or feed them from another workflow. This blueprint handles everything from enrichment onward." },
      { question: "What data does it enrich with?", answer: "Verified email, phone number, company name, job title, LinkedIn URL, company size, industry, and location. The exact fields depend on which enrichment provider you use." },
      { question: "How does deduplication work?", answer: "Before creating a CRM contact, the workflow checks for existing records by email and company name. Duplicates get flagged instead of created." },
    ],
  },
  {
    slug: "lead-scoring-engine",
    title: "Lead scoring engine",
    headline: "AI evaluates every prospect against your ideal client profile",
    description:
      "Takes enriched lead data, scores each prospect against your configurable ideal client profile using AI, and routes qualified leads through a Slack or email approval queue before they enter your CRM. Rejected leads get logged with reasoning for threshold tuning.",
    category: "lead-gen",
    categoryLabel: "Lead Gen",
    isNew: false,
    pricing: { blueprint: 249, setup: 599 },
    workflowNodes: [
      { label: "Enriched Lead", color: nodeColors.blue, icon: "User" },
      { label: "AI Score", color: nodeColors.purple, icon: "Gauge" },
      { label: "Approve / Reject", color: nodeColors.orange, icon: "ThumbsUp" },
      { label: "CRM", color: nodeColors.green, icon: "Contact" },
    ],
    whatsIncluded: [
      "N8N workflow JSON with scoring and routing logic",
      "AI scoring prompt template (configurable ICP criteria)",
      "Slack interactive approval workflow",
      "Supabase schema for score logging and threshold tracking",
      "Setup guide with ICP configuration examples",
    ],
    requiredServices: [
      { name: "N8N", cost: "$24/month (Starter)", url: "https://n8n.io/pricing" },
      { name: "OpenAI API", cost: "$5 to $15/month", url: "https://platform.openai.com/pricing" },
      { name: "Supabase", cost: "Free tier works", url: "https://supabase.com/pricing" },
      { name: "Slack", cost: "Free tier works", url: "https://slack.com/pricing" },
      { name: "CRM with API", cost: "Your existing CRM", url: "" },
    ],
    faqs: [
      { question: "How accurate is the scoring?", answer: "Accuracy depends on how well you define your ICP criteria. Most clients see 85%+ alignment with human judgment after the first week of threshold tuning." },
      { question: "Can I change the scoring criteria?", answer: "Yes. The ICP criteria live in a prompt template you edit. Add signals, change weights, adjust the score threshold for qualification." },
      { question: "Does it pair with the enrichment pipeline?", answer: "They chain together. The enrichment pipeline feeds verified lead data into this scoring engine. Purchase both for a complete prospect to CRM pipeline." },
    ],
  },
  {
    slug: "ai-report-generator",
    title: "AI report generator",
    headline: "Structured inputs become formatted PDF reports in minutes",
    description:
      "Accepts structured data through a web form, processes it through an AI engine that generates a complete report using domain knowledge and historical templates, then produces a branded PDF and emails it to the recipient. Built for repeatable report types where the structure stays consistent but the content changes per client.",
    category: "workflow",
    categoryLabel: "Workflow",
    isNew: true,
    pricing: { blueprint: 349, setup: 899 },
    workflowNodes: [
      { label: "Web Form", color: nodeColors.blue, icon: "ClipboardList" },
      { label: "AI Generate", color: nodeColors.purple, icon: "Sparkles" },
      { label: "Human Review", color: nodeColors.orange, icon: "Eye" },
      { label: "PDF & Email", color: nodeColors.green, icon: "FileOutput" },
    ],
    whatsIncluded: [
      "React web form component (customizable fields)",
      "Node.js API with AI generation endpoint",
      "AI prompt templates with knowledge base integration pattern",
      "PDF generation using Puppeteer (branded template)",
      "Email delivery integration",
      "Supabase schema for report storage and audit logging",
      "Setup guide covering form customization, prompt tuning, and PDF branding",
    ],
    requiredServices: [
      { name: "OpenAI or Claude API", cost: "$10 to $30/month based on volume", url: "https://platform.openai.com/pricing" },
      { name: "Supabase", cost: "$25/month (Pro)", url: "https://supabase.com/pricing" },
      { name: "Vercel", cost: "$20/month (Pro)", url: "https://vercel.com/pricing" },
      { name: "Resend (email)", cost: "Free tier (100 emails/day)", url: "https://resend.com/pricing" },
    ],
    faqs: [
      { question: "What kind of reports can it generate?", answer: "Any report with a consistent structure: crop plans, audit reports, assessment summaries, project scopes, compliance documents. You define the sections and the AI fills them based on the input data." },
      { question: "Can I customize the PDF design?", answer: "Yes. The PDF template is an HTML file styled with CSS. You change the branding, layout, fonts, and colors to match your company identity." },
      { question: "Is there a review step before sending?", answer: "Yes. Every generated report goes through a human review queue. The reviewer can edit, approve, or regenerate before the PDF gets created and sent." },
    ],
  },
  {
    slug: "inbound-email-router",
    title: "Inbound email router",
    headline: "Emails classified and routed to the right person in seconds",
    description:
      "Monitors a shared inbox, uses AI to classify each email by intent (support request, sales enquiry, invoice, complaint, general), extracts key information, and routes it to the appropriate team member or department via email forwarding or Slack notification with full context.",
    category: "workflow",
    categoryLabel: "Workflow",
    isNew: false,
    pricing: { blueprint: 199, setup: 499 },
    workflowNodes: [
      { label: "Shared Inbox", color: nodeColors.blue, icon: "Inbox" },
      { label: "AI Classify", color: nodeColors.purple, icon: "Brain" },
      { label: "Extract Info", color: nodeColors.cyan, icon: "ScanText" },
      { label: "Route", color: nodeColors.green, icon: "GitBranch" },
    ],
    whatsIncluded: [
      "N8N workflow JSON with email monitoring and routing",
      "AI classification prompt (configurable categories)",
      "Routing rules template (category to recipient mapping)",
      "Slack notification template with email summary",
      "Setup guide for inbox connection and routing configuration",
    ],
    requiredServices: [
      { name: "N8N", cost: "$24/month (Starter)", url: "https://n8n.io/pricing" },
      { name: "OpenAI API", cost: "$3 to $10/month", url: "https://platform.openai.com/pricing" },
      { name: "Email provider with IMAP", cost: "Your existing email", url: "" },
      { name: "Slack (optional)", cost: "Free tier works", url: "https://slack.com/pricing" },
    ],
    faqs: [
      { question: "How accurate is the classification?", answer: "The AI classifies with 90%+ accuracy on standard business email types. Edge cases get routed to a default handler that you specify." },
      { question: "Can it handle attachments?", answer: "Yes. Attachments get forwarded with the routed email. If you pair this with the document classifier, attachments also get classified and filed." },
      { question: "What if it routes an email incorrectly?", answer: "The recipient forwards it to the correct person. If you add the optional feedback logging, misroutes improve future classification accuracy." },
    ],
  },
  {
    slug: "news-monitoring-agent",
    title: "News monitoring agent",
    headline: "Track industry news, competitor moves, and market signals automatically",
    description:
      "Searches for news articles, press releases, and announcements matching your configured keywords and topics on a daily or weekly schedule. AI summarizes each finding, scores relevance, and delivers a digest to your inbox or Slack channel with links to the original sources.",
    category: "data",
    categoryLabel: "Data",
    isNew: false,
    pricing: { blueprint: 199, setup: 499 },
    workflowNodes: [
      { label: "Search Sources", color: nodeColors.blue, icon: "Globe" },
      { label: "AI Summarize", color: nodeColors.purple, icon: "BookOpen" },
      { label: "Score Relevance", color: nodeColors.orange, icon: "Star" },
      { label: "Deliver Digest", color: nodeColors.green, icon: "Send" },
    ],
    whatsIncluded: [
      "N8N workflow JSON with scheduled news search",
      "Search query templates for multiple monitoring scenarios",
      "AI summarization and relevance scoring prompts",
      "Email digest template (HTML formatted)",
      "Slack digest template",
      "Setup guide for keyword configuration and source selection",
    ],
    requiredServices: [
      { name: "N8N", cost: "$24/month (Starter)", url: "https://n8n.io/pricing" },
      { name: "Perplexity API or Brave Search API", cost: "$5 to $25/month", url: "https://docs.perplexity.ai/pricing" },
      { name: "OpenAI API", cost: "$3 to $10/month", url: "https://platform.openai.com/pricing" },
    ],
    faqs: [
      { question: "What sources does it search?", answer: "Configurable. The default setup searches web news via Perplexity or Brave Search API. You can add specific publication RSS feeds for targeted monitoring." },
      { question: "How often does it run?", answer: "Daily or weekly, configurable in N8N. Most clients run daily searches with a weekly compiled digest." },
      { question: "Can I monitor competitors?", answer: "Yes. Add competitor company names, executive names, and product names to your keyword list. The workflow tracks mentions across all configured sources." },
    ],
  },
  {
    slug: "expiration-tracking-alerts",
    title: "Expiration tracking and alerts",
    headline: "Certificates and contracts renewed before they expire",
    description:
      "Monitors a database of documents with expiration dates, sends automated alerts at configurable intervals (60 days, 30 days, 7 days before expiry), and tracks renewal status. Pairs with the email document classifier to automatically populate the expiration database as documents arrive.",
    category: "workflow",
    categoryLabel: "Workflow",
    isNew: false,
    pricing: { blueprint: 199, setup: 499 },
    workflowNodes: [
      { label: "Expiry Database", color: nodeColors.blue, icon: "CalendarClock" },
      { label: "Check Dates", color: nodeColors.cyan, icon: "Clock" },
      { label: "Send Alert", color: nodeColors.orange, icon: "AlertTriangle" },
      { label: "Track Renewal", color: nodeColors.green, icon: "RefreshCw" },
    ],
    whatsIncluded: [
      "N8N workflow JSON with daily expiration checks",
      "Supabase schema for document expiry tracking",
      "Email alert templates (60 day, 30 day, 7 day, expired)",
      "Renewal status tracking logic",
      "Dashboard component for viewing upcoming expirations",
      "Setup guide for database population and alert configuration",
    ],
    requiredServices: [
      { name: "N8N", cost: "$24/month (Starter)", url: "https://n8n.io/pricing" },
      { name: "Supabase", cost: "Free tier works", url: "https://supabase.com/pricing" },
      { name: "Resend (email)", cost: "Free tier (100 emails/day)", url: "https://resend.com/pricing" },
    ],
    faqs: [
      { question: "How do documents get into the system?", answer: "Three ways: manual entry through the dashboard, CSV import, or automatically via the email document classifier blueprint which extracts expiry dates from incoming documents." },
      { question: "Can I customize the alert schedule?", answer: "Yes. Edit the alert intervals in the N8N workflow. Add as many checkpoints as you need." },
      { question: "Does it handle multiple document types?", answer: "Yes. Certificates, licenses, contracts, registrations, insurance policies. Any document with an expiration date." },
    ],
  },
];

export function getBlueprint(slug: string): Blueprint | undefined {
  return blueprints.find((b) => b.slug === slug);
}

export function getBlueprintsByCategory(category: BlueprintCategory | "all"): Blueprint[] {
  if (category === "all") return blueprints;
  return blueprints.filter((b) => b.category === category);
}
