import "./Contact.css";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";

function Contact() {
  return (
    <>
      <section className="container">
        <div className="contact-hero">
          <div className="contact-title-wrap">
            <h1 className="contact-title">
              WE’RE HAPPY TO DISCUSS YOUR NEEDS
              <br />
              AND PROVIDE A PERSONALIZED PROPOSAL
            </h1>
          </div>

          {/* <div className="contact-badge">fluxed</div> */}
        </div>

        <div className="contact-content">
          <div className="contact-form-block">
            <p className="contact-label center">
              HAVE A PROJECT IN MIND OR A QUESTION?
            </p>

            <form className="contact-form">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
              <textarea placeholder="Text"></textarea>

              <button type="submit" className="contact-send-btn">
                Send
              </button>
            </form>
          </div>

          <div className="contact-info-block">
            <div className="contact-info-item">
              <p className="contact-label">EMAIL</p>
              <a
                href="mailto:fluxed.agency@gmail.com"
                className="contact-email"
              >
                fluxed.agency@gmail.com
              </a>
            </div>

            <div className="contact-info-item">
              <p className="contact-label">PHONE NUMBER / WHATSUP</p>
              <a href="tel:+32491345676" className="contact-phone">
                +32 491 34 56 76
              </a>
            </div>

            <div className="contact-info-item">
              <p className="contact-label">BOOK A CALL</p>
              <button className="contact-calendar-btn">Calendar</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Contact;
