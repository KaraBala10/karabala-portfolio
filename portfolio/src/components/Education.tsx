import { FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import AnimatedSection from "./AnimatedSection";

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  address?: string;
}

const education: EducationItem[] = [
  {
    degree: "Computer and Automation Engineering",
    institution: "Damascus University",
    location: "Damascus, Syria",
    period: "09/2019 - 09/2025",
    address: "Airport Road, Damascus, Syria",
  },
  {
    degree: "Web Development Training",
    institution: "Enmaa Charity Association",
    location: "Rif Dimshq, Syria",
    period: "05/2022 - 04/2023",
    address: "Muleha, Rif Dimshq, Syria",
  },
];

const Education = () => {
  return (
    <AnimatedSection id="education" className="py-20 lg:py-32 transition-colors duration-500" delay={0.2}>
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-formal-900 dark:text-formal-50 tracking-tight">Education & Training</h2>
          <div className="mt-4 w-16 h-1 bg-formal-900 dark:bg-formal-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <div key={index} className="bg-white dark:bg-formal-800 rounded-2xl p-8 lg:p-10 border border-formal-200 dark:border-formal-700 shadow-sm hover:shadow-xl hover:shadow-formal-900/5 dark:hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300">
              <div className="w-14 h-14 bg-formal-100 dark:bg-formal-700 rounded-xl flex items-center justify-center text-formal-900 dark:text-formal-100 text-2xl mb-6 shadow-inner">
                <FaGraduationCap />
              </div>
              <h3 className="text-2xl font-bold text-formal-900 dark:text-formal-50 leading-snug mb-2">{edu.degree}</h3>
              <h4 className="text-lg font-semibold text-formal-600 dark:text-formal-400 mb-6">{edu.institution}</h4>
              
              <div className="space-y-4 pt-4 border-t border-formal-100 dark:border-formal-700">
                <div className="flex items-center text-sm font-medium text-formal-500 dark:text-formal-400">
                  <div className="w-8 flex justify-center text-formal-400 dark:text-formal-500 text-lg mr-2"><FaCalendarAlt /></div>
                  <span className="uppercase tracking-wider">{edu.period}</span>
                </div>
                <div className="flex items-center text-sm font-medium text-formal-500 dark:text-formal-400">
                  <div className="w-8 flex justify-center text-formal-400 dark:text-formal-500 text-lg mr-2"><FaMapMarkerAlt /></div>
                  <span className="uppercase tracking-wider">{edu.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default Education;
