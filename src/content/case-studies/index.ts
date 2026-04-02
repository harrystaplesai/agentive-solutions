export interface CaseStudy {
  slug: string;
  industry: string;
  industryIcon: string;
  title: string;
  subtitle: string;
  description: string;
  heroMetric: {
    value: string;
    label: string;
    prefix?: string;
    suffix?: string;
  };
  problem: string[];
  approach: string[];
  techStack: string[];
  outcomes: {
    metric: string;
    description: string;
  }[];
  beforeAfter?: {
    before: string;
    after: string;
  };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "ai-document-intelligence",
    industry: "Energy",
    industryIcon: "Zap",
    title: "AI document intelligence for a national energy operator",
    subtitle: "Automated classification and retrieval across 4,000+ equipment certifications",
    description:
      "A national energy company managed thousands of equipment certifications, registrations, and compliance documents across multiple business units. Staff spent 10 to 15 hours per week sorting files by hand, and retrieving a single document during a regulatory inspection could take 15 minutes of searching through email inboxes.",
    heroMetric: {
      value: "95",
      label: "Reduction in document retrieval time",
      suffix: "%",
    },
    problem: [
      "Certificates and compliance documents scattered across multiple email inboxes with no systematic organization. Staff members spent 10 to 15 hours each week sorting and filing documents by hand.",
      "Retrieving a specific document during a regulatory inspection required 5 to 15 minutes of searching through email attachments, creating real compliance risk when inspectors needed answers in seconds.",
      "No tracking system for certification expiration dates meant the operations team discovered expired documents only when a regulator flagged them, putting equipment operation and business continuity at risk.",
    ],
    approach: [
      "Built an automated email ingestion system that monitors two dedicated inboxes, extracts attachments, and passes them through an AI classification pipeline. The system identifies document type, equipment unit, and relevant metadata without human intervention.",
      "Created a vector database using pgvector that stores document embeddings alongside traditional metadata. This enables both structured queries (find all certificates for equipment unit G07) and natural language search (show me documents expiring in the next 30 days).",
      "Deployed a chatbot interface that gives field staff instant access to any document through conversational queries. The system returns direct download links with previews, eliminating the need to dig through folder structures.",
    ],
    techStack: [
      "N8N",
      "OpenAI",
      "Supabase",
      "pgvector",
      "IMAP Integration",
      "Chatbot Interface",
    ],
    outcomes: [
      { metric: "95% faster retrieval", description: "Document search dropped from 5 to 15 minutes to under 30 seconds" },
      { metric: "10+ hours saved weekly", description: "Automated classification eliminated manual sorting across staff" },
      { metric: "Zero compliance gaps", description: "Expiration tracking catches renewals 60 days before deadline" },
      { metric: "4,000+ documents processed", description: "Full document backlog classified and indexed in the first month" },
    ],
    beforeAfter: {
      before: "15 minute average document retrieval, manual sorting, missed expiration deadlines",
      after: "30 second retrieval via chatbot, automatic classification, proactive expiration alerts",
    },
  },
  {
    slug: "erp-inventory-automation",
    industry: "Wholesale Distribution",
    industryIcon: "BarChart3",
    title: "Intelligent inventory agents for a wholesale distributor",
    subtitle: "Customer retention and stock optimization integrated with legacy ERP",
    description:
      "A wholesale distributor with thousands of SKUs across dozens of brands relied on a small purchasing team to review inventory levels and customer ordering patterns. Reviews happened every two to three months instead of monthly, and customer churn signals went undetected until it was too late to act.",
    heroMetric: {
      value: "2",
      label: "AI agents running autonomously on legacy ERP data",
    },
    problem: [
      "The purchasing team reviewed inventory min and max levels every two to three months instead of monthly, covering only a subset of high priority brands. The majority of inventory never received optimization analysis, leading to both stockouts on fast movers and excess carrying costs on slow movers.",
      "Customer ordering pattern changes went undetected until team members happened to notice a drop in activity. No proactive system existed to flag disengaging customers to sales representatives, which meant retention outreach arrived weeks or months too late.",
      "All analysis happened through manual review in Sage 300 ERP, consuming 2 to 3 hours per cycle. The team lacked the bandwidth to expand coverage, creating a bottleneck that limited the business's ability to respond to market changes.",
    ],
    approach: [
      "Built a Customer Retention Agent that pulls order history from Sage 300 via REST API, calculates each customer's normal ordering frequency using statistical analysis, and flags accounts showing deviation patterns. The agent generates personalized retention emails and routes them to the assigned sales representative for review before sending.",
      "Designed a Min Max Agent that analyzes inventory levels, historical ordering patterns, back orders, and movement data across all product brands. The agent produces adjustment recommendations with supporting rationale, then presents them through an admin dashboard where managers approve or decline each suggestion.",
      "Implemented a human in the loop approval system with an admin dashboard. Every recommendation from both agents passes through human review before taking effect. The system logs all approval decisions and overrides, creating a feedback loop that improves recommendation accuracy over time.",
    ],
    techStack: [
      "Sage 300 Web API",
      "Custom Admin Dashboard",
      "AI/ML Engine",
      "Email Integration",
      "PostgreSQL",
      "Human in the Loop Workflows",
    ],
    outcomes: [
      { metric: "100% SKU coverage", description: "Every product brand analyzed monthly instead of a handful quarterly" },
      { metric: "Automated retention alerts", description: "At risk customers flagged within days, not months" },
      { metric: "2 to 3 hours saved per cycle", description: "Manual ERP analysis replaced by automated agent processing" },
      { metric: "Continuous learning", description: "Manager feedback on recommendations improves agent accuracy each cycle" },
    ],
    beforeAfter: {
      before: "Quarterly partial reviews, reactive retention, manual ERP analysis",
      after: "Monthly full coverage, proactive customer alerts, autonomous agents with human oversight",
    },
  },
  {
    slug: "ai-lead-intelligence",
    industry: "Finance & Investment",
    industryIcon: "Search",
    title: "AI lead intelligence pipeline for an investment firm",
    subtitle: "Automated prospect discovery, enrichment, and scoring for high net worth targeting",
    description:
      "An investment firm sourced prospects through manual research: scanning news articles, browsing LinkedIn profiles, and searching foundation directories one name at a time. The process consumed hours of the founding team's week and produced inconsistent CRM data with delayed entries and incomplete enrichment.",
    heroMetric: {
      value: "20",
      label: "Qualified leads delivered per week to CRM",
      suffix: "+",
    },
    problem: [
      "The founding team spent hours each week scanning news articles, LinkedIn profiles, and foundation websites to find qualified prospects. Research happened ad hoc, with no systematic coverage of available sources and no way to ensure the same ground was not being covered twice.",
      "Contact information gathered through manual searches arrived incomplete and unverified. CRM entries often lacked phone numbers, verified email addresses, or company details, which weakened outreach efforts and forced follow up research that duplicated earlier work.",
      "Qualification relied on intuition and limited public data rather than structured scoring criteria. The team had no consistent way to evaluate prospect fit or prioritize outreach, which meant strong opportunities sometimes sat unworked while weaker leads received attention first.",
    ],
    approach: [
      "Configured automated LinkedIn discovery through Clay with advanced search filters covering location, company revenue, job titles, and industry. Scheduled weekly table refreshes ensure the pipeline surfaces new prospects continuously without manual intervention. Clay's waterfall enrichment runs 100+ data providers to verify emails, phone numbers, company details, and social profiles.",
      "Built a parallel news monitoring system using Perplexity Sonar API that tracks M&A activity, funding announcements, board appointments, and major philanthropic donations across regional business media. Names and companies extracted from articles feed back into Clay for full profile enrichment.",
      "Designed an AI scoring engine in n8n that evaluates each enriched lead against the firm's ideal client profile. Leads scoring above the threshold route to a Slack based review queue where the operations team approves or declines each prospect with a single button click. Approved leads populate Pipedrive with full enrichment data, source attribution, and score breakdown.",
    ],
    techStack: [
      "Clay",
      "Perplexity Sonar API",
      "n8n",
      "OpenAI",
      "Pipedrive API",
      "Slack API",
      "PostgreSQL",
    ],
    outcomes: [
      { metric: "20+ qualified leads per week", description: "Automated pipeline replaced hours of manual research" },
      { metric: "80%+ email verification rate", description: "Waterfall enrichment across 100+ providers ensures data quality" },
      { metric: "90%+ approval rate", description: "AI scoring aligns with human judgment on prospect fit" },
      { metric: "Under $20 per qualified lead", description: "Full enrichment and scoring at a fraction of manual research cost" },
    ],
    beforeAfter: {
      before: "Ad hoc manual research, incomplete CRM data, intuition based qualification",
      after: "Automated discovery from 3 sources, verified enrichment, AI scored leads with human review",
    },
  },
  {
    slug: "ai-crop-planning",
    industry: "Agriculture & Biocontrol",
    industryIcon: "Leaf",
    title: "AI crop plan generation for a biocontrol company",
    subtitle: "Automated biological control recommendations from discovery meeting data",
    description:
      "A biocontrol company produced detailed crop plans after every discovery meeting with growers, specifying week by week biological control recommendations, quantities, and costs. Each plan required roughly two hours of expert time and the turnaround stretched to one to two weeks, causing leads to go cold before proposals arrived.",
    heroMetric: {
      value: "90",
      label: "Reduction in crop plan generation time",
      suffix: "%",
    },
    problem: [
      "The IPM expert spent approximately two hours building each crop plan from scratch after a discovery meeting. With a growing sales pipeline, expert time became the bottleneck that limited how many growers the company could serve, and plans sometimes stacked up for over a week.",
      "Discovery data captured in CRM notes and meeting transcripts arrived in inconsistent formats, which meant the expert often worked from incomplete information. Missing fields required follow up conversations that added days to an already slow process.",
      "Turnaround time of one to two weeks between discovery meeting and proposal delivery caused qualified leads to cool off. Growers making purchasing decisions on tight seasonal timelines moved to competitors who could respond faster.",
    ],
    approach: [
      "Built a web interface where sales staff enter discovery meeting data through structured fields covering crop type, greenhouse configuration, plant density, pest history, and grower preferences. Validation checks flag missing information before the plan enters the generation queue, eliminating the back and forth that delayed previous workflows.",
      "Created an AI generation engine that references 40+ historical crop plans and a comprehensive IPM knowledge base covering pest and biological relationships, application rates by crop and season, and temperature based recommendations. The engine produces a complete week by week biological control schedule with quantities and estimated costs.",
      "Deployed a review dashboard where the IPM expert validates AI generated plans, makes adjustments, and approves for delivery. The system generates a formatted PDF and emails it to the grower. Every human override logs to a feedback table that the AI engine references for future plan generation.",
    ],
    techStack: [
      "React",
      "Node.js",
      "Supabase",
      "OpenAI / Claude",
      "Airtable API",
      "PDF Generation",
    ],
    outcomes: [
      { metric: "90% time reduction", description: "Plan generation dropped from 2 hours to under 10 minutes with review" },
      { metric: "Same day turnaround", description: "Proposals reach growers within hours of the discovery meeting" },
      { metric: "Consistent output quality", description: "AI references the full knowledge base on every plan, eliminating variance" },
      { metric: "Expert time freed", description: "IPM specialist focuses on review and client relationships instead of manual calculations" },
    ],
    beforeAfter: {
      before: "2 hour manual plans, 1 to 2 week turnaround, inconsistent discovery data",
      after: "10 minute AI generated plans, same day delivery, structured data capture with validation",
    },
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getNextCaseStudy(currentSlug: string): CaseStudy | undefined {
  const currentIndex = caseStudies.findIndex((cs) => cs.slug === currentSlug);
  if (currentIndex === -1) return undefined;
  return caseStudies[(currentIndex + 1) % caseStudies.length];
}
