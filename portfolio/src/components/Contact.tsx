import {
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaFacebook,
  FaTelegram,
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io5";
import "./Contact.css";

const Contact = () => {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Get In Touch</h2>
      <div className="contact-content">
        <div className="contact-info">
          <p className="contact-description">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions. Feel free to reach out!
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <div className="contact-item-content">
                <span className="contact-label">Phone</span>
                <a href="tel:+963949257963" className="contact-value">
                  (+963) 949257963
                </a>
              </div>
            </div>

            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <div className="contact-item-content">
                <span className="contact-label">Location</span>
                <span className="contact-value">Midan, Damascus, Syria</span>
              </div>
            </div>
          </div>

          <div className="social-links-section">
            <h3 className="social-links-title">Connect With Me</h3>
            <div className="social-links-grid">
              <a
                href="https://github.com/KaraBala10/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.facebook.com/mohammad.karabala.5"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a
                href="https://t.me/KaraBala10"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <FaTelegram />
                <span>Telegram</span>
              </a>
              <a
                href="https://wa.me/963949257963"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <IoLogoWhatsapp />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Mohammad KaraBala. All rights
          reserved.
        </p>
        <p className="footer-subtitle">
          Computer and Automation Engineer & Software Developer
        </p>
      </footer>
    </section>
  );
};

export default Contact;
