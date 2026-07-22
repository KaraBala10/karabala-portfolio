interface ChipProps {
  children: React.ReactNode;
  size?: "sm" | "md";
  /** Use on tinted surfaces (e.g. skills cards) */
  elevated?: boolean;
}

const Chip = ({ children, size = "md", elevated = false }: ChipProps) => {
  const sizeClasses =
    size === "sm"
      ? "px-2.5 py-1 text-xs rounded-md"
      : "px-3 py-1.5 text-sm rounded-lg";
  const toneClasses = elevated
    ? "bg-white dark:bg-formal-900"
    : "bg-formal-50 dark:bg-formal-900";

  return (
    <span
      className={`inline-block border border-formal-200 dark:border-formal-600 text-formal-700 dark:text-formal-300 font-medium ${sizeClasses} ${toneClasses} hover:border-emerald-500/50 dark:hover:border-emerald-400/50 hover:text-formal-900 dark:hover:text-formal-50 transition-colors cursor-default`}
    >
      {children}
    </span>
  );
};

export default Chip;
