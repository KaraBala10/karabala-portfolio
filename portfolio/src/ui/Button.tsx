import {
  forwardRef,
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { Icon, type IconName } from "./Icon";
import { useMagnetic } from "../lib/useMagnetic";
import styles from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "start" | "end";
  magnetic?: boolean;
  children: ReactNode;
  className?: string;
}

type AnchorProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type NativeButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type ButtonProps = AnchorProps | NativeButtonProps;

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/**
 * The one button. Renders an <a> when `href` is given. External links get
 * rel/target automatically. `magnetic` adds a restrained pointer pull.
 */
export const Button = forwardRef<HTMLElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "end",
    magnetic = false,
    children,
    className,
    ...rest
  } = props;

  const innerRef = useRef<HTMLElement | null>(null);
  const noRef = useRef<HTMLElement | null>(null);
  useMagnetic(magnetic ? innerRef : noRef);

  const setRef = (node: HTMLElement | null) => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  };

  const cls = cx(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      {icon && iconPosition === "start" && <Icon name={icon} size={16} className={styles.icon} />}
      <span className={styles.label}>{children}</span>
      {icon && iconPosition === "end" && <Icon name={icon} size={16} className={styles.icon} />}
    </>
  );

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorProps;
    const external = /^https?:\/\//.test(href);
    return (
      <a
        ref={setRef as (node: HTMLAnchorElement | null) => void}
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const buttonRest = rest as NativeButtonProps;
  return (
    <button
      ref={setRef as (node: HTMLButtonElement | null) => void}
      type="button"
      className={cls}
      {...buttonRest}
    >
      {content}
    </button>
  );
});
