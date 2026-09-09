import type { Profile, SocialLink } from "./types";

export const profile: Profile = {
  name: "Mohammad KaraBala",
  firstName: "Mohammad",
  lastName: "KaraBala",
  monogram: "MK",
  title: "AI & Automation Engineer",
  headline: "Systems that keep running after the demo.",
  intro:
    "I design automation pipelines, AI workflows and full-stack backends — Python at the core, React on top, Docker and Linux underneath — and I run them in production.",
  location: "Damascus, Syria",
  timezone: "Asia/Damascus",
  utcOffsetLabel: "UTC+3",
  availability: "Open to work",
  availableFor: ["Full-time (remote)", "Freelance & contract"],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional" },
  ],
  email: "mohammad.karabala@gmail.com",
  emailComposeUrl:
    "https://mail.google.com/mail/?view=cm&fs=1&to=mohammad.karabala@gmail.com",
  phone: "+963 949 257 963",
  phoneHref: "tel:+963949257963",
  cvPath: "/Mohammad_KaraBala.pdf",
  siteUrl: "https://karabala-portfolio.vercel.app/",
  now: [
    "Agentic workflows with LangGraph",
    "Running local models with Ollama",
    "Hardening scrapers against anti-bot systems",
  ],
  greeter: {
    teaser: "Hey, how's it going? 👋",
    message:
      "I'm Mohammad. If you're hiring an automation engineer or have a pipeline that needs to run itself, I'd love to hear about it. Messages come straight to me.",
  },
};

export const socials: SocialLink[] = [
  {
    id: "email",
    label: "Email",
    handle: "mohammad.karabala@gmail.com",
    href: profile.emailComposeUrl,
    primary: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: "+963 949 257 963",
    href: "https://wa.me/963949257963",
    primary: true,
  },
  {
    id: "telegram",
    label: "Telegram",
    handle: "@KaraBala10",
    href: "https://t.me/KaraBala10",
    primary: true,
  },
  {
    id: "github",
    label: "GitHub",
    handle: "KaraBala10",
    href: "https://github.com/KaraBala10/",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    handle: "in/karabala",
    href: "https://www.linkedin.com/in/karabala",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "mohammadkarabala10",
    href: "https://www.facebook.com/mohammadkarabala10",
  },
];
