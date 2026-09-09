import type { AnchorHTMLAttributes, ReactNode } from "react";
import { Icon } from "./Icon";
import styles from "./TextLink.module.css";

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: ReactNode;
  /** Show the ↗ affordance for links that leave the site. */
  external?: boolean;
}

/** Inline link with a drawn underline; external links open in a new tab. */
export function TextLink({ href, children, external, className, ...rest }: TextLinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={[styles.link, className].filter(Boolean).join(" ")}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    >
      <span className={styles.text}>{children}</span>
      {isExternal && <Icon name="arrow-up-right" size={14} className={styles.icon} />}
    </a>
  );
}
