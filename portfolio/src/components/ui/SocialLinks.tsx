import { FaGithub, FaFacebook, FaTelegram, FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import { site, type SocialItem } from "../../data/site";

const brandIcons = {
  github: FaGithub,
  email: FaEnvelope,
  facebook: FaFacebook,
  telegram: FaTelegram,
  whatsapp: IoLogoWhatsapp,
  linkedin: FaLinkedinIn,
} as const;

const brandColors: Record<SocialItem["brand"], string> = {
  github: "text-formal-900 dark:text-formal-100",
  email: "text-[#ea4335]",
  facebook: "text-[#1877F2]",
  telegram: "text-[#0088cc]",
  whatsapp: "text-[#25D366]",
  linkedin: "text-[#0A66C2]",
};

interface SocialLinksProps {
  variant?: "icon" | "button";
  className?: string;
}

const SocialLinks = ({ variant = "icon", className = "" }: SocialLinksProps) => {
  if (variant === "button") {
    return (
      <div className={`flex flex-wrap justify-center gap-3 ${className}`}>
        {site.socials.map((social) => {
          const Icon = brandIcons[social.brand];
          return (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="inline-flex items-center gap-3 px-5 py-3 bg-formal-50 dark:bg-formal-800 border border-formal-200 dark:border-formal-700 rounded-xl text-formal-700 dark:text-formal-200 hover:border-formal-400 dark:hover:border-formal-500 hover:bg-white dark:hover:bg-formal-700 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50"
            >
              <Icon className={`text-xl ${brandColors[social.brand]}`} />
              <span className="font-semibold text-sm">{social.label}</span>
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {site.socials.map((social) => {
        const Icon = brandIcons[social.brand];
        return (
          <a
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-formal-600 dark:text-formal-400 hover:text-formal-900 dark:hover:text-formal-50 transition-colors text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-formal-900 dark:focus-visible:ring-formal-50 rounded-sm"
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
