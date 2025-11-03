import "./About.css";
import developerImage from "../assets/karabala.jpeg";

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="hero-background"></div>
      <div className="hero-container">
        <div className="hero-wrapper">
          {/* Image Section */}
          <div className="hero-image-section">
            <div className="hero-image-wrapper">
              <div className="hero-image-container">
                <img
                  src={developerImage}
                  alt="Mohammad KaraBala"
                  className="hero-image"
                />
                <div className="image-border-gradient"></div>
              </div>
              <div className="floating-badge">
                <span className="badge-dot"></span>
                <span className="badge-text">Available for work</span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="hero-content-section">
            <div className="hero-intro">
              <span className="hero-greeting">Hello, I'm</span>
            </div>

            <h1 className="hero-title">
              <span className="gradient-text">Mohammad KaraBala</span>
            </h1>

            <div className="hero-role">
              <span className="role-badge">Computer & Automation Engineer</span>
              <span className="role-separator">•</span>
              <span className="role-badge">Software Developer</span>
            </div>

            <p className="hero-description">
              Computer and Automation Engineer and Software Developer
              specializing in building scalable web applications, managing
              complex data workflows, and creating efficient systems. Expert in
              clean database design, seamless file management, and user-friendly
              interfaces.
            </p>

            <div className="hero-info-grid">
              <div className="info-card">
                <div className="info-icon-wrapper">
                  <span className="info-icon">📅</span>
                </div>
                <div className="info-content">
                  <span className="info-label">Date of Birth</span>
                  <span className="info-value">16/10/2001</span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-wrapper">
                  <span className="info-icon">🌍</span>
                </div>
                <div className="info-content">
                  <span className="info-label">Nationality</span>
                  <span className="info-value">Syrian</span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-wrapper">
                  <span className="info-icon">📍</span>
                </div>
                <div className="info-content">
                  <span className="info-label">Location</span>
                  <span className="info-value">Damascus, Syria</span>
                </div>
              </div>

              <div className="info-card">
                <div className="info-icon-wrapper">
                  <span className="info-icon">📱</span>
                </div>
                <div className="info-content">
                  <span className="info-label">Phone</span>
                  <span className="info-value">(+963) 949257963</span>
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <a
                href="/Mohammad_KaraBala.pdf"
                download
                className="btn btn-download"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 13V3M10 13L6 9M10 13L14 9M3 17H17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Download CV</span>
              </a>
              <a href="#contact" className="btn btn-contact">
                <span>Get In Touch</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 15L12.5 10L7.5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#projects" className="btn btn-projects">
                <span>View Projects</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
