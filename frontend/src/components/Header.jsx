import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/weblogo.png';
import LoginSignup from './LoginSignup';

const Header = () => {
  // State for scroll effect
  const [scrolled, setScrolled] = useState(false);
  
  // State for login/signup modal
  const [showLoginSignupModal, setShowLoginSignupModal] = useState(false);
  
  // Function to handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to open login/signup modal
  const openLoginSignupModal = (e) => {
    e.preventDefault();
    setShowLoginSignupModal(true);
    // Prevent scrolling on the background page
    document.body.style.overflow = 'hidden';
  };

  // Function to close login/signup modal
  const closeLoginSignupModal = () => {
    setShowLoginSignupModal(false);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'auto';
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="navbar-brand d-flex align-items-center text-white fw-bold" style={{cursor: 'default'}}>
              <img src={logoImg} alt="e-TenderAlert Logo" className="logo-img me-2" style={{width: '30px', height: '30px'}} />
              <span className="brand-text fs-4 text-white fw-bold">e-TenderAlert</span>
            </div>
            
            <div className="d-flex align-items-center">
              <div className="notification-bell me-3 position-relative">
                <i className="fas fa-bell fa-lg text-warning"></i>
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle fw-bold" style={{fontSize: '0.7rem'}}>3</span>
              </div>
              
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-2">
                <a className="nav-link active text-white fw-bold" href="#">
                  <i className="fas fa-home me-1 text-warning"></i>
                  Home
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-white fw-bold" onClick={(e) => { e.preventDefault(); scrollToSection('dashboard'); }} href="#dashboard">
                  <i className="fas fa-tachometer-alt me-1 text-warning"></i>
                  Dashboard
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-white fw-bold" onClick={(e) => { e.preventDefault(); scrollToSection('accepted-tenders'); }} href="#accepted-tenders">
                  <i className="fas fa-check-circle me-1 text-warning"></i>
                  Accepted
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-white fw-bold" onClick={(e) => { e.preventDefault(); scrollToSection('telecaller'); }} href="#telecaller">
                  <i className="fas fa-headset me-1 text-warning"></i>
                  Telecaller
                </a>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-white fw-bold" to="/statistics">
                  <i className="fas fa-chart-line me-1 text-warning"></i>
                  Statistics
                </Link>
              </li>
              {/* LOGIN/SIGNUP BUTTON - NOW FUNCTIONAL */}
              <li className="nav-item mx-2">
                <a className="nav-link text-warning fw-bold fs-6" href="#" onClick={openLoginSignupModal}>
                  <i className="fas fa-sign-in-alt me-1 text-warning"></i>
                  Login/SignUp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Login/Signup Modal - Popup on Homepage without dark background */}
      {showLoginSignupModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'transparent', /* Removed black background */
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          overflow: 'hidden'
        }} onClick={closeLoginSignupModal}>
          <div className="modal-content" style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            overflowY: 'auto',
            borderRadius: '0',
            boxShadow: 'none',
            border: 'none',
            margin: '0',
            backgroundColor: 'transparent'
          }} onClick={(e) => e.stopPropagation()}>
            <LoginSignup onClose={closeLoginSignupModal} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;