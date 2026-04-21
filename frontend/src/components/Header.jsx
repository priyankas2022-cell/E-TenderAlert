import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/weblogo.png';
import LoginSignup from './LoginSignup';
import Notifications from './Notifications';
import { useNotifications } from '../context/NotificationContext';
import apiClient from '../api/client';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // State for scroll effect
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  // State for login/signup modal
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    apiClient.logout();
    setIsLoggedIn(false);
    navigate('/login');
  };

  // State for notifications
  const [showNotifications, setShowNotifications] = useState(false);

  // Use global notification context
  const { notifications, getUnreadCount } = useNotifications();

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
  const scrollToSection = (e, sectionId) => {
    if (e) e.preventDefault();

    if (window.location.pathname !== '/') {
      // If not on homepage, navigate there first
      navigate('/#' + sectionId);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add a listener for hash changes to scroll after navigation
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [navigate]);

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

  // Function to toggle notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Prevent scrolling when notifications panel is open
    if (!showNotifications) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  // Function to close notifications
  const closeNotifications = () => {
    setShowNotifications(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-gradient">
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div className="navbar-brand d-flex align-items-center text-white fw-bold" style={{ cursor: 'default' }}>
              <img src={logoImg} alt="e-TenderAlert Logo" className="logo-img me-2" style={{ width: '30px', height: '30px' }} />
              <span className="brand-text fs-4 text-white fw-bold">e-TenderAlert</span>
            </div>

            <div className="d-flex align-items-center">
              <div className="notification-bell me-3 position-relative" style={{ cursor: 'pointer' }} onClick={toggleNotifications}>
                <i className="fas fa-bell fa-lg text-warning"></i>
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle fw-bold" style={{ fontSize: '0.7rem' }}>
                  {getUnreadCount()}
                </span>
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
                  Home
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-white fw-bold" onClick={(e) => scrollToSection(e, 'dashboard')} href="#dashboard">
                  Dashboard
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-white fw-bold" onClick={(e) => scrollToSection(e, 'accepted-tenders')} href="#accepted-tenders">
                  Accepted
                </a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-white fw-bold" onClick={(e) => scrollToSection(e, 'telecaller')} href="#telecaller">
                  Telecaller
                </a>
              </li>

              {/* LOGIN/LOGOUT BUTTON - NOW DYNAMIC */}
              <li className="nav-item mx-2">
                {isLoggedIn ? (
                  <a className="nav-link text-warning fw-bold fs-6" href="#" onClick={handleLogout}>
                    Logout
                  </a>
                ) : (
                  <Link className="nav-link text-warning fw-bold fs-6" to="/login">
                    Login/SignUp
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Notifications Panel */}
      <Notifications
        isOpen={showNotifications}
        onClose={closeNotifications}
      />
    </header>
  );
};

export default Header;