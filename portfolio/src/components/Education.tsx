import { FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import "./Education.css";

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
    period: "15/09/2019 - 11/09/2025",
    address: "Airport Road, Damascus, Syria",
  },
  {
    degree: "Web Development",
    institution: "Enmaa Charity Association",
    location: "Rif Dimshq, Syria",
    period: "31/05/2022 - 08/04/2023",
    address: "Muleha, Rif Dimshq, Syria",
  },
];

const Education = () => {
  return (
    <section id="education" className="education-section">
      <h2 className="section-title">Education & Training</h2>
      <div className="education-grid">
        {education.map((edu, index) => (
          <div key={index} className="education-card">
            <div className="education-icon">
              <FaGraduationCap />
            </div>
            <h3 className="education-degree">{edu.degree}</h3>
            <h4 className="education-institution">{edu.institution}</h4>
            <div className="education-details">
              <div className="education-detail-item">
                <FaCalendarAlt />
                <span>{edu.period}</span>
              </div>
              <div className="education-detail-item">
                <FaMapMarkerAlt />
                <span>{edu.location}</span>
              </div>
              {edu.address && (
                <div className="education-address">
                  <span>{edu.address}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
