import AnimatedSection from "../AnimatedSection";
import SectionHeading from "./SectionHeading";

interface SectionProps {
  id: string;
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  maxWidth?: string;
  delay?: number;
}

const Section = ({
  id,
  title,
  eyebrow,
  children,
  className = "",
  containerClassName = "",
  maxWidth = "max-w-5xl",
  delay = 0,
}: SectionProps) => {
  return (
    <AnimatedSection
      id={id}
      delay={delay}
      className={`relative py-20 lg:py-32 transition-colors duration-500 ${className}`}
    >
      <div
        className={`container mx-auto px-6 lg:px-12 relative z-[2] ${maxWidth} ${containerClassName}`}
      >
        {title ? (
          <SectionHeading eyebrow={eyebrow}>{title}</SectionHeading>
        ) : null}
        {children}
      </div>
    </AnimatedSection>
  );
};

export default Section;
