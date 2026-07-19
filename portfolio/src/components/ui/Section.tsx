import AnimatedSection from "../AnimatedSection";
import SectionHeading from "./SectionHeading";

interface SectionProps {
  id: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxWidth?: string;
  delay?: number;
  elevated?: boolean;
}

const Section = ({
  id,
  title,
  children,
  className = "",
  containerClassName = "",
  maxWidth = "max-w-5xl",
  delay = 0,
  elevated = false,
}: SectionProps) => {
  return (
    <AnimatedSection
      id={id}
      delay={delay}
      className={`relative py-20 lg:py-32 transition-colors duration-500 ${
        elevated ? "section-elevated" : "section-surface"
      } ${className}`}
    >
      <div
        className={`container mx-auto px-6 lg:px-12 relative z-[2] ${maxWidth} ${containerClassName}`}
      >
        {title ? <SectionHeading>{title}</SectionHeading> : null}
        {children}
      </div>
    </AnimatedSection>
  );
};

export default Section;
