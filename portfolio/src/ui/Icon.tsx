import type { SVGProps } from "react";

/**
 * Inline icon set. Hand-picked 24px glyphs (1.75 stroke) plus brand marks,
 * so the site ships no icon library. Decorative by default; pass `title`
 * for a labelled icon.
 */
export type IconName =
  | "arrow-up-right"
  | "arrow-right"
  | "arrow-down"
  | "arrow-up"
  | "external"
  | "download"
  | "copy"
  | "check"
  | "sun"
  | "moon"
  | "command"
  | "close"
  | "search"
  | "pin"
  | "clock"
  | "mail"
  | "email"
  | "phone"
  | "github"
  | "linkedin"
  | "telegram"
  | "whatsapp"
  | "facebook"
  | "bot"
  | "grid";

const strokes: Partial<Record<IconName, string>> = {
  "arrow-up-right": "M7 17 17 7M8 7h9v9",
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-down": "M12 5v14M6 13l6 6 6-6",
  "arrow-up": "M12 19V5M6 11l6-6 6 6",
  external: "M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5",
  download: "M12 4v12M6 11l6 6 6-6M4 20h16",
  copy: "M9 9h10v11H9zM5 15V4h11",
  check: "M5 12.5 10 17.5 19 7",
  sun: "M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  moon: "M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z",
  command: "M9 6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6z",
  close: "M6 6l12 12M18 6 6 18",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4",
  pin: "M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11zM12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  email: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z",
  bot: "M12 3v3M8 6h8a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3zM9 12h.01M15 12h.01M3 12H5M19 12h2",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
};

const fills: Partial<Record<IconName, string>> = {
  github:
    "M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z",
  linkedin:
    "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1c.5-.9 1.7-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.5V9h3.6v11.5z",
  telegram:
    "M12 .5C5.6.5.5 5.6.5 12S5.6 23.5 12 23.5 23.5 18.4 23.5 12 18.4.5 12 .5zm5.6 7.9-1.9 8.9c-.1.6-.5.8-1 .5l-2.9-2.1-1.4 1.3c-.2.2-.3.3-.6.3l.2-2.9 5.3-4.8c.2-.2 0-.3-.4-.1l-6.6 4.1-2.8-.9c-.6-.2-.6-.6.1-.9l11-4.2c.5-.2 1 .1.8.8z",
  whatsapp:
    "M12 .5C5.7.5.6 5.6.6 11.9c0 2.1.6 4.1 1.6 5.9L.5 23.5l5.9-1.6c1.7.9 3.6 1.4 5.6 1.4 6.3 0 11.4-5.1 11.4-11.4S18.3.5 12 .5zm0 20.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.5.9.9-3.4-.2-.4a9.4 9.4 0 0 1-1.4-5c0-5.2 4.3-9.5 9.5-9.5s9.5 4.3 9.5 9.5-4.2 9.5-9.4 9.5zm5.2-7.1c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1l-.9 1.2c-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.2 4.6 2.6 1 3.1.8 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4z",
  facebook:
    "M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.3l-.5 3.5h-2.8v8.4A12 12 0 0 0 24 12z",
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  title?: string;
}

export function Icon({ name, size = 18, title, ...rest }: IconProps) {
  const fill = fills[name];
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": title ? undefined : true,
    role: title ? "img" : undefined,
    focusable: "false" as const,
    ...rest,
  };
  if (fill) {
    return (
      <svg {...common} fill="currentColor">
        {title && <title>{title}</title>}
        <path d={fill} />
      </svg>
    );
  }
  return (
    <svg
      {...common}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {title && <title>{title}</title>}
      <path d={strokes[name]} />
    </svg>
  );
}
