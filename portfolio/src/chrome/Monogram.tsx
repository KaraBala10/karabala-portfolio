/**
 * Site mark: three connected nodes inside a plate — the lattice, distilled.
 * Also used for the favicon (public/favicon.svg keeps a copy).
 */
export function Monogram({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1.5" y="1.5" width="25" height="25" rx="5" />
      <path d="M8.5 19.5 14 8.5l5.5 11z" />
      <circle cx="8.5" cy="19.5" r="2" fill="var(--c-bg)" />
      <circle cx="14" cy="8.5" r="2" fill="var(--c-bg)" />
      <circle cx="19.5" cy="19.5" r="2" fill="var(--c-accent)" stroke="var(--c-accent)" />
    </svg>
  );
}
