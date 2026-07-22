interface SectionHeadingProps {
  children: React.ReactNode;
  /** Small uppercase label above the title, e.g. "Career Path". */
  eyebrow?: string;
}

const SectionHeading = ({ children, eyebrow }: SectionHeadingProps) => {
  return (
    <div className="mb-16 text-center">
      {eyebrow ? (
        <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-accent mb-4">
          <span className="w-8 h-px bg-accent/60" aria-hidden />
          {eyebrow}
          <span className="w-8 h-px bg-accent/60" aria-hidden />
        </span>
      ) : null}
      <h2 className="font-display text-3xl md:text-4xl font-extrabold text-formal-900 dark:text-formal-50 tracking-tight">
        {children}
      </h2>
      <div
        className="mt-5 w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-sky-500"
        aria-hidden
      />
    </div>
  );
};

export default SectionHeading;
