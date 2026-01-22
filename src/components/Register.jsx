import React, { useState } from 'react';
import './Login.css'; // Reuse the same styles as login
import loginIllustration from '../assets/Login Page.png'; // Import the same illustration

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordToggle = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleTermsChange = () => {
    setTermsAgreed(!termsAgreed);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle registration form submission (no backend logic yet)
    console.log('Registration form submitted:', formData);
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!termsAgreed) {
      alert('Please agree to the terms and conditions.');
      return;
    }
    
    console.log('Registration successful!', formData);
  };

  const handleGoogleRegister = () => {
    // Handle Google registration (UI only for now)
    console.log('Google register clicked');
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-content">
          <h1 className="login-heading">Create Account</h1>
          <p className="login-subtext">Join us today to get started</p>
          
          <button className="google-login-btn" onClick={handleGoogleRegister}>
            <i className="fab fa-google google-icon"></i>
            Sign up with Google
          </button>
          
          <div className="divider">
            <span className="divider-text">or Sign up with Email</span>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="form-input"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email id"
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="form-input password-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => handlePasswordToggle('password')}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>
            
            <div className="form-group password-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                className="form-input password-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => handlePasswordToggle('confirmPassword')}
              >
                {showConfirmPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>
            
            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="termsAgreed"
                  checked={termsAgreed}
                  onChange={handleTermsChange}
                  className="checkbox-input"
                  required
                />
                <label htmlFor="termsAgreed" className="checkbox-label">I agree to the Terms & Conditions</label>
              </div>
            </div>
            
            <button type="submit" className="login-btn">Sign Up</button>
          </form>
          
          <div className="login-footer">
            <p>
              Already have an account? <a href="/login" className="signup-link">Login</a>
            </p>
          </div>
        </div>
      </div>
      
      <div className="login-illustration-container">
        <img 
          src={loginIllustration} 
          alt="Login illustration" 
          className="login-illustration"
        />
      </div>
    </div>
  );
};

export default Register;