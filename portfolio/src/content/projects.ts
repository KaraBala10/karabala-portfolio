import type { Project } from "./types";

/**
 * Projects, full-stack product first. `featured` entries render as full case rows;
 * the rest appear in the compact ledger. `flow` drives the generated
 * schematic, so every project gets a visual without a screenshot.
 */
export const projects: Project[] = [
  {
    slug: "marsad",
    title: "Marsad",
    tagline: "Short-video intelligence for Instagram & TikTok",
    domain: "AI · Video intelligence",
    year: "2026 —",
    role: "Architecture, backend, frontend",
    featured: true,
    summary:
      "A platform that follows public Instagram and TikTok accounts, pulls their clips and turns each one into an Arabic analysis: summary, hook, timestamped verbatim script, on-screen text and call to action.",
    problem:
      "Competitors' reels were being watched by hand, and the conclusions lived in someone's memory. Understanding what makes a clip work had to become searchable data instead.",
    built: [
      "FastAPI backend with a Go fetcher service and a TikTok scraper CLI behind it, fetching public pages over residential proxies",
      "Gemini for what the video shows, Whisper for what it says, and OpenAI for the Arabic narrative and structured hook, script and CTA extraction",
      "A job queue that runs analyses one at a time and streams progress to every teammate's browser, reattaching after a reload",
      "Bilingual Next.js interface with URL-driven filters, shared team state and a grounded question-and-answer thread per clip",
    ],
    impact:
      "Analyses are computed once and shared, so the pipeline watches the clips instead of the team.",
    stack: ["FastAPI", "Go", "Next.js", "TypeScript", "Gemini", "Whisper", "OpenAI", "SQLite"],
    flow: [
      { label: "IG / TikTok", kind: "source" },
      { label: "Go fetcher", kind: "process" },
      { label: "FastAPI", kind: "process" },
      { label: "Whisper", kind: "ai" },
      { label: "Gemini", kind: "ai" },
      { label: "Analysis", kind: "output" },
    ],
    links: [],
  },
  {
    slug: "hawees",
    title: "Hawees",
    tagline: "Affiliate commerce, on the web and on Android",
    domain: "Full-stack · Mobile",
    year: "2026",
    role: "Backend, web front end, Android client",
    featured: true,
    summary:
      "A multi-role commerce platform connecting merchants, marketers and customers through referral links, with commissions attributed and distributed automatically.",
    problem:
      "Merchants wanted marketers selling for them, but tracking who drove which order — and paying for it without an argument — was entirely manual.",
    built: [
      "Django REST Framework APIs covering products, orders, wallets, reviews and referral attribution",
      "Automated commission distribution tied to the referral link that produced the sale",
      "Next.js storefront in TypeScript, built around the three roles it serves",
      "Kotlin and Jetpack Compose Android client with push notifications",
    ],
    stack: ["Django REST Framework", "Next.js", "TypeScript", "Kotlin", "Jetpack Compose", "Docker"],
    flow: [
      { label: "Referral", kind: "source" },
      { label: "DRF API", kind: "process" },
      { label: "Orders", kind: "store" },
      { label: "Web & app", kind: "output" },
    ],
    links: [],
  },
  {
    slug: "keyboardy",
    title: "Keyboardy",
    tagline: "Arabic short-video curation, unattended",
    domain: "Automation · Media",
    year: "2026 —",
    role: "Design & engineering, end to end",
    featured: true,
    summary:
      "A pipeline that finds trending Arabic clips country by country, cuts them into scenes, reads what is in each scene, brands the survivors and publishes them.",
    problem:
      "Curating regional short video by hand stops scaling after a few clips a day, and the material worth keeping is scattered across countries and platforms.",
    built: [
      "Playwright scrapers for TikTok explore, search and the official Creative Center trends, per country",
      "yt-dlp downloads, scene splitting with per-scene keywords, and on-screen text read by OCR",
      "Transcript and summary analysis, theme matching, watermarking and AV1 and WhatsApp re-encoding with FFmpeg",
      "Publishing to Amazon S3 and a collector API, triggered by n8n webhooks on a daily schedule",
    ],
    impact:
      "A day of curation runs without supervision and lands as finished, branded clips.",
    stack: ["Python", "Playwright", "yt-dlp", "FFmpeg", "EasyOCR", "Amazon S3", "n8n"],
    flow: [
      { label: "TikTok", kind: "source" },
      { label: "Download", kind: "process" },
      { label: "Scenes", kind: "process" },
      { label: "OCR", kind: "ai" },
      { label: "Brand", kind: "process" },
      { label: "S3 + API", kind: "output" },
    ],
    links: [],
  },
  {
    slug: "instagram-engagement-suite",
    title: "Instagram Engagement Suite",
    tagline: "Comment automation for Instagram Business accounts",
    domain: "SaaS · Automation",
    year: "2026",
    role: "Backend, frontend, integrations",
    featured: true,
    summary:
      "A multi-account SaaS that watches Instagram comments as they arrive, replies automatically, follows up in direct messages, and reports on the engagement it handled.",
    problem:
      "Accounts with real engagement drown in comments, and the replies that matter most are the ones that arrive first.",
    built: [
      "FastAPI backend on the Instagram Graph API with Facebook OAuth and webhook-driven comment ingestion",
      "Auto-reply with follow-up direct messages, alongside manual replies from the dashboard",
      "Next.js dashboard in Arabic and English with engagement charts, comment classification and light and dark themes",
      "Subscription redeem codes, per-account n8n webhooks and signed sessions with expiry handling",
    ],
    stack: ["FastAPI", "Next.js", "TypeScript", "Tailwind CSS", "Instagram Graph API", "SQLite"],
    flow: [
      { label: "Comments", kind: "source" },
      { label: "Webhook", kind: "process" },
      { label: "FastAPI", kind: "process" },
      { label: "Reply & DM", kind: "output" },
    ],
    links: [],
  },
  {
    slug: "sp-today-api",
    title: "SP Today API",
    tagline: "Real-time currency & gold price service",
    domain: "Backend · Scraping",
    year: "2023",
    role: "Design & engineering",
    featured: true,
    summary:
      "A backend service that continuously collects live currency and gold prices and serves them as a structured API, plus a Telegram bot on top of it.",
    problem:
      "Prices lived on pages that change shape without notice. The service had to keep collecting reliably and answer fast, even while sources misbehaved.",
    built: [
      "Resilient scraping pipeline with structured, validated responses",
      "FastAPI service tuned for fast, continuous delivery",
      "n8n automations for scheduling and notifications",
      "Telegram bot as a consumer of the same API",
    ],
    stack: ["Python", "FastAPI", "Web scraping", "n8n", "Telegram API"],
    flow: [
      { label: "Sources", kind: "source" },
      { label: "Scraper", kind: "process" },
      { label: "FastAPI", kind: "process" },
      { label: "Bot / API", kind: "output" },
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/KaraBala10/sp-today-api" },
      { kind: "bot", label: "Telegram bot", href: "https://t.me/its_sptodayBOT" },
    ],
  },
  {
    slug: "ai-content-pipeline",
    title: "AI Content Automation Pipeline",
    tagline: "Social media publishing with zero manual steps",
    domain: "Automation · AI",
    year: "2024 —",
    role: "Design & engineering, end to end",
    featured: false,
    summary:
      "An end-to-end system that generates, formats and schedules text and video content, then publishes it across Telegram and social platforms without a human in the loop.",
    problem:
      "Publishing across several platforms meant repetitive manual work and inconsistent output. The goal was a pipeline that runs unattended, every day, and fails loudly rather than silently.",
    built: [
      "n8n workflows orchestrating generation, formatting and scheduled distribution",
      "AI-driven text and video generation stages with structured hand-offs between steps",
      "Multi-platform publishing through webhooks and platform APIs",
      "Python services for the steps a visual workflow shouldn't own",
    ],
    impact:
      "Removed the manual publishing workload entirely and made output consistent across platforms.",
    stack: ["n8n", "Python", "LLM APIs", "Webhooks", "Telegram API", "Docker"],
    flow: [
      { label: "Schedule", kind: "source" },
      { label: "n8n", kind: "process" },
      { label: "LLM", kind: "ai" },
      { label: "Format", kind: "process" },
      { label: "Publish", kind: "output" },
    ],
    links: [],
  },
  {
    slug: "sayar",
    title: "Sayar",
    tagline: "AI-powered Arabic pronunciation coaching",
    domain: "AI · Education",
    year: "2025",
    role: "Backend & frontend",
    featured: false,
    summary:
      "A bilingual learning platform that records a learner reading Arabic, analyses the recording with Whisper and returns feedback, with progress tracked over time.",
    problem:
      "Learners could practise endlessly without ever hearing what was actually wrong with their pronunciation.",
    built: [
      "Whisper transcription and scoring behind Celery workers with Redis, so recordings never block the request",
      "JWT authentication, progress tracking and an interactive audio interface",
    ],
    stack: ["Django REST Framework", "React", "Whisper", "Celery", "Redis", "MySQL", "Docker"],
    flow: [
      { label: "Recording", kind: "source" },
      { label: "Celery", kind: "process" },
      { label: "Whisper", kind: "ai" },
      { label: "Feedback", kind: "output" },
    ],
    links: [],
  },
  {
    slug: "medo-freight",
    title: "Medo Freight",
    tagline: "International freight management platform",
    domain: "Full-stack · Logistics",
    year: "2025",
    role: "Backend & frontend",
    featured: false,
    summary:
      "A freight platform for creating shipments, pricing them and generating the shipping labels and signature documents each route requires.",
    problem:
      "Freight paperwork is unforgiving: the wrong label or a missing signature document stops a shipment at the border.",
    built: [
      "Shipment creation and price calculation with label and document generation",
      "Workflows aligned with international shipping requirements, deployed behind Nginx with Docker Compose",
    ],
    stack: ["Django", "Next.js", "PostgreSQL", "Docker", "Nginx"],
    flow: [
      { label: "Shipment", kind: "source" },
      { label: "Pricing", kind: "process" },
      { label: "PostgreSQL", kind: "store" },
      { label: "Documents", kind: "output" },
    ],
    links: [{ kind: "live", label: "Live", href: "https://medo-freight.eu/" }],
  },
  {
    slug: "operations-portal",
    title: "Operation & Maintenance Portal",
    tagline: "Internal file operations, tagged and audited",
    domain: "Full-stack · Internal tools",
    year: "2024",
    role: "Backend & frontend",
    featured: false,
    summary:
      "An internal portal for searching, uploading, downloading, tagging and auditing operational files, with access controls and reporting on top.",
    problem:
      "Operational files moved through inboxes and shared drives, so nobody could say who touched what, or when a file had gone stale.",
    built: [
      "Search, upload, download, tagging and a full audit trail over operational files",
      "Paused and aged-file handling, access controls through Keycloak, configuration management and reporting workflows",
    ],
    stack: ["Django", "React", "MySQL", "Keycloak", "Docker"],
    flow: [
      { label: "Upload", kind: "source" },
      { label: "Tag & index", kind: "process" },
      { label: "MySQL", kind: "store" },
      { label: "Reports", kind: "output" },
    ],
    links: [],
  },
  {
    slug: "employee-recognition",
    title: "Employee Recognition Platform",
    tagline: "Nominations, approvals and verifiable certificates",
    domain: "Full-stack · Internal tools",
    year: "2024",
    role: "Backend & frontend",
    featured: false,
    summary:
      "A nomination system where colleagues recognise each other, approvals move through a defined workflow, and recipients get a certificate that can be verified.",
    problem:
      "Recognition programmes die when nominating is tedious and the award is a forwarded email nobody can check.",
    built: [
      "Nomination and approval workflows with star balances and administrative dashboards",
      "Google authentication, verifiable PDF certificates, email notifications and CSV reporting",
    ],
    stack: ["Django REST Framework", "React", "Google OAuth", "MariaDB", "Docker"],
    flow: [
      { label: "Nomination", kind: "source" },
      { label: "Approval", kind: "process" },
      { label: "MariaDB", kind: "store" },
      { label: "Certificate", kind: "output" },
    ],
    links: [],
  },
  {
    slug: "list-manager",
    title: "Full-Stack List Manager",
    tagline: "Internal data management system",
    domain: "Full-stack · Infrastructure",
    year: "2023",
    role: "Backend, frontend, deployment",
    featured: false,
    summary:
      "A production web application for managing and tracking structured data workflows, with secure file handling and fully automated server provisioning.",
    problem:
      "Structured data was tracked by hand across files with no integrity guarantees and no audit trail. It needed a real system: relational, secure and repeatably deployable.",
    built: [
      "Django backend with a relational schema designed around integrity constraints and optimized queries",
      "React front end for managing and tracking workflows",
      "Secure file upload, tracking and automated cleanup",
      "Docker images with server configuration automated through Ansible",
    ],
    impact:
      "One-command deployments and a single source of truth for the data the team relied on.",
    stack: ["Django", "React", "PostgreSQL", "Docker", "Ansible"],
    flow: [
      { label: "React", kind: "source" },
      { label: "Django API", kind: "process" },
      { label: "PostgreSQL", kind: "store" },
      { label: "Files", kind: "store" },
    ],
    links: [],
  },
  {
    slug: "live-wallpapers",
    title: "Live Wallpapers Automation",
    tagline: "Pinterest media harvester in Go",
    domain: "Automation · Go",
    year: "2026",
    role: "Design & engineering",
    featured: false,
    summary:
      "A Go command-line tool that searches Pinterest, resolves the highest-resolution image behind each pin and downloads the results through a worker pool.",
    problem:
      "Collecting source imagery meant clicking through Pinterest and re-downloading pins that were already on disk.",
    built: [
      "Concurrent downloads through a configurable worker pool",
      "Deduplication against previously saved pins, per-query folders and a links-only mode for downstream automation",
    ],
    stack: ["Go", "Concurrency", "HTTP scraping"],
    flow: [
      { label: "Search", kind: "source" },
      { label: "Resolve", kind: "process" },
      { label: "Worker pool", kind: "process" },
      { label: "Files", kind: "store" },
    ],
    links: [],
  },
  {
    slug: "chatbang-pro",
    title: "Chatbang Pro",
    tagline: "Terminal client for ChatGPT",
    domain: "Open source · Go",
    year: "2025",
    role: "Contributor & maintainer",
    featured: false,
    summary:
      "An open-source terminal client extended with DOM-based response extraction, Unicode and right-to-left support, browser detection and custom GPT support.",
    problem:
      "The client broke on long responses, on disconnected browsers, and on any language that isn't left-to-right.",
    built: [
      "DOM-based extraction through chromedp, with browser detection and custom GPT support",
      "Reliability fixes for long responses and dropped browser connections, plus a Linux release workflow",
    ],
    stack: ["Go", "chromedp", "Chromium automation"],
    flow: [
      { label: "Terminal", kind: "source" },
      { label: "chromedp", kind: "process" },
      { label: "ChatGPT", kind: "ai" },
      { label: "Response", kind: "output" },
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/KaraBala10/chatbang-pro" },
    ],
  },
  {
    slug: "cv-mailer",
    title: "CV Mailer",
    tagline: "Automated job application system",
    domain: "Automation",
    year: "2023",
    role: "Design & engineering",
    featured: false,
    summary:
      "Sends personalised application emails with CV attachments at scale, with dynamic generation, scheduling and delivery tracking.",
    problem:
      "Applying widely meant rewriting the same email by hand dozens of times a week.",
    built: [
      "Dynamic email generation from templates and structured inputs",
      "Scheduling and delivery tracking",
    ],
    stack: ["Python", "SMTP", "Automation"],
    flow: [
      { label: "Targets", kind: "source" },
      { label: "Compose", kind: "process" },
      { label: "SMTP", kind: "output" },
    ],
    links: [{ kind: "live", label: "Live", href: "https://cv-mailer-nine.vercel.app/" }],
  },
  {
    slug: "fmee-results-bot",
    title: "FMEE Results Bot",
    tagline: "University exam results, in Telegram, in Arabic",
    domain: "Bot · Scraping",
    year: "2022",
    role: "Design & engineering",
    featured: false,
    summary:
      "A Telegram bot that retrieves and presents university exam results in real time — marks, averages and missing subjects — with specialization detection.",
    problem:
      "Results were buried in a clunky portal; students wanted them in the chat app they already used.",
    built: [
      "Robust scraping with specialization detection and structured output",
      "Arabic-first conversational interface",
    ],
    stack: ["Python", "Web scraping", "Telegram API"],
    flow: [
      { label: "Portal", kind: "source" },
      { label: "Scraper", kind: "process" },
      { label: "Telegram", kind: "output" },
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/KaraBala10/du-fmee-results-bot" },
      { kind: "bot", label: "Telegram bot", href: "https://t.me/Hamak_Marks_BOT" },
    ],
  },
  {
    slug: "syria-location-database",
    title: "Syria Location Database",
    tagline: "Administrative divisions as clean, queryable data",
    domain: "Data · Open source",
    year: "2022",
    role: "Design & engineering",
    featured: false,
    summary:
      "Extracts Syria's governorates, cities, districts and towns from text files into MySQL and CSV, de-duplicated, bilingual and ready to query.",
    problem:
      "No clean, bilingual dataset of Syria's administrative divisions existed for developers.",
    built: [
      "Parsing pipeline with duplicate prevention",
      "Arabic–English translation layer and an SQL view for easy queries",
    ],
    stack: ["Python", "MySQL", "CSV"],
    flow: [
      { label: "Text files", kind: "source" },
      { label: "Parse", kind: "process" },
      { label: "MySQL", kind: "store" },
    ],
    links: [
      { kind: "github", label: "Source", href: "https://github.com/KaraBala10/syria-location-database" },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
