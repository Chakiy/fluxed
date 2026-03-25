import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT SIDE */}
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/images/logo.png" height="40px" />
          </div>

          <div className="footer-agency">
            <span className="agency-name">FLUXED</span>
            <span className="agency-type">AGENCY</span>
            <span className="agency-year">2026</span>
          </div>
        </div>
        {/* RIGHT SIDE */}
        <div className="footer-right">
          <div className="footer-column">
            <div className="footer-title">CONTACTS</div>

            <a href="mailto:fluxed.agency@gmail.com">fluxed.agency@gmail</a>

            <a href="tel:+15551234567">(555) 123-4567</a>
          </div>

          <div className="footer-column">
            <div className="footer-title">SOCIALS</div>

            <div className="footer-socials">
              <a href="#">instagram</a>
              <a href="#">behance</a>
              <a href="#">facebook</a>
              <a href="#">linkedin</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-gradient"></div>
    </footer>
  );
}

export default Footer;
