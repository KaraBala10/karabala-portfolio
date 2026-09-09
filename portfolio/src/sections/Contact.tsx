import type { CSSProperties } from "react";
import { profile, socials } from "../content/profile";
import { useCopy } from "../lib/useCopy";
import { Button } from "../ui/Button";
import { Icon, type IconName } from "../ui/Icon";
import { SectionShell } from "../ui/SectionShell";
import styles from "./Contact.module.css";

interface Channel {
  id: string;
  icon: IconName;
  label: string;
  handle: string;
  href: string;
}

export function Contact() {
  const { copied, copy } = useCopy();

  const channels: Channel[] = [
    ...socials
      .filter((s) => s.id !== "email")
      .map<Channel>((s) => ({ id: s.id, icon: s.id, label: s.label, handle: s.handle, href: s.href })),
  ];
  // phone sits after the messaging apps
  channels.splice(2, 0, { id: "phone", icon: "phone", label: "Phone", handle: profile.phone, href: profile.phoneHref });

  return (
    <SectionShell
      id="contact"
      title="Let's build something that runs."
      intro="Open to full-time remote roles and freelance work. Write to me directly — there is no form, every message lands with me."
    >
      <div className={styles.grid}>
        <div className={styles.primary} data-reveal>
          <p className={`mono ${styles.label}`}>Email</p>
          <a href={profile.emailComposeUrl} target="_blank" rel="noopener noreferrer" className={`display ${styles.email}`}>
            {/* Allow a clean break at the @ on narrow screens instead of mid-word */}
            {profile.email.split("@")[0]}
            <wbr />@{profile.email.split("@")[1]}
          </a>
          <div className={styles.actions}>
            <Button
              variant="secondary"
              icon={copied ? "check" : "copy"}
              iconPosition="start"
              onClick={() => void copy(profile.email)}
              aria-live="polite"
            >
              {copied ? "Copied" : "Copy address"}
            </Button>
            <Button href={profile.cvPath} variant="ghost" icon="download" download>
              Download CV
            </Button>
          </div>
          <p className={`mono ${styles.availability}`}>
            <span className={styles.dot} aria-hidden /> {profile.availability} · {profile.availableFor.join(" · ")}
          </p>
        </div>

        <ul className={styles.ledger} aria-label="Other channels" data-reveal style={{ "--i": 1 } as CSSProperties}>
          {channels.map((c) => (
            <li key={c.id}>
              <a
                href={c.href}
                className={styles.channel}
                {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                <Icon name={c.icon} size={16} className={styles.channelIcon} />
                <span className={styles.channelLabel}>{c.label}</span>
                <span className={`mono ${styles.channelHandle}`}>{c.handle}</span>
                <Icon name="arrow-up-right" size={14} className={styles.channelArrow} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
