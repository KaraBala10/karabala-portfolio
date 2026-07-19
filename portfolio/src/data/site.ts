export const site = {
  name: "Mohammad KaraBala",
  shortName: "MK",
  eyebrow: "Hello, I'm",
  roles: ["Automation Engineer", "Software Developer"],
  bio: "Full-Stack & Automation Engineer with strong expertise in Python backend systems and modern frontend development using React and Next.js. Specialized in building end-to-end applications and automation workflows using n8n, including AI-driven pipelines and multi-platform integrations. Experienced in deploying scalable systems using Docker and Linux environments.",
  availability: "Freelance & Full-time",
  cvPath: "/Mohammad_KaraBala.pdf",
  contact: {
    email: "mohammad.karabala@gmail.com",
    emailComposeUrl:
      "https://mail.google.com/mail/?view=cm&fs=1&to=mohammad.karabala@gmail.com",
    phone: "(+963) 949257963",
    phoneHref: "tel:+963949257963",
    location: "Damascus, Syria",
  },
  navItems: [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],
  socials: [
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/KaraBala10/",
      brand: "github" as const,
    },
    {
      id: "email",
      label: "Email",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=mohammad.karabala@gmail.com",
      brand: "email" as const,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/mohammadkarabala10",
      brand: "facebook" as const,
    },
    {
      id: "telegram",
      label: "Telegram",
      href: "https://t.me/KaraBala10",
      brand: "telegram" as const,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/963949257963",
      brand: "whatsapp" as const,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/karabala",
      brand: "linkedin" as const,
    },
  ],
} as const;

export type SocialItem = (typeof site.socials)[number];
export type NavItem = (typeof site.navItems)[number];
