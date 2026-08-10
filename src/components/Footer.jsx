import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    
  const year = new Date().getFullYear();

  return (
    <footer className="custom-footer bg-dark text-light pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row gy-4">
          {/* Brand / About */}
          <div className="col-12 col-md-4">
            <h4 className="footer-brand fw-bold mb-3">FoodApp</h4>
            <p className="text-secondary small mb-3">
              Fresh, delicious food delivered to your doorstep. Order from
              your favorite restaurants in just a few clicks.
            </p>
            <div className="d-flex gap-3 footer-social">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-light"
              >
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-light"
              >
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-light"
              >
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-light"
              >
                <i className="bi bi-github fs-5"></i>
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3 footer-heading">
              Company
            </h6>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/reviews">Reviews</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="col-4 col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3 footer-heading">
              Quick Links
            </h6>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/orders">Orders</Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="col-6 col-md-2">
            <h6 className="text-uppercase fw-semibold mb-3 footer-heading">
              Customer Support
            </h6>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/help-center">Help Center</Link>
              </li>
              <li>
                <Link to="/terms">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider my-4" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary small gap-2">
          <span>&copy; {year} FoodApp. All rights reserved.</span>
          <span>Made with care, delivered with speed.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
