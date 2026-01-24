import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 footer-links mb-4">
            <h5>About e-TenderAlert</h5>
            <p>A smart tender management platform that helps businesses discover, track, and manage tenders efficiently.</p>
            <div className="social-links mt-3">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="col-lg-2 col-md-6 footer-links mb-4">
            <h5>Quick Links</h5>
            <ul>
              <li><a href="#dashboard"><i className="fas fa-chevron-right"></i> Dashboard</a></li>
              <li><a href="#accepted-tenders"><i className="fas fa-chevron-right"></i> Accepted Tenders</a></li>
              <li><a href="#telecaller"><i className="fas fa-chevron-right"></i> Telecaller</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Pricing</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Contact Us</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 footer-links mb-4">
            <h5>Our Services</h5>
            <ul>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Tender Discovery</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Tender Tracking</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Progress Monitoring</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Automated Notifications</a></li>
              <li><a href="#"><i className="fas fa-chevron-right"></i> Analytics & Reports</a></li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 footer-links mb-4">
            <h5>Contact Info</h5>
            <ul>
              <li><a href="#"><i className="fas fa-map-marker-alt"></i>Odisha, India</a></li>
              <li><a href="#"><i className="fas fa-phone"></i> +91 7381965865</a></li>
              <li><a href="#"><i className="fas fa-envelope"></i> ndisurya03@gmail.com</a></li>
              <li><a href="#"><i className="fab fa-whatsapp"></i> +91 7381965865</a></li>
              <li><a href="#"><i className="fab fa-telegram"></i> +91 6811428357</a></li>
            </ul>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2023 e-TenderAlert. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;