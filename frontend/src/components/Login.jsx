import React, { useState } from 'react';
import './Login.css'; // Import the CSS file
import loginIllustration from '../assets/Login Page.png'; // Import the illustration

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login form submission (no backend logic yet)
    console.log('Login form submitted:', formData);
  };

  const handleGoogleLogin = () => {
    // Handle Google login (UI only for now)
    console.log('Google login clicked');
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-content">
          <h1 className="login-heading">Login now</h1>
          <p className="login-subtext">Hi, Welcome back 👋</p>
          
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <i className="fab fa-google google-icon"></i>
            Login with Google
          </button>
          
          <div className="divider">
            <span className="divider-text">or Login with Email</span>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
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
                onClick={handlePasswordToggle}
              >
                {showPassword ? (
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
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="checkbox-input"
                />
                <label htmlFor="rememberMe" className="checkbox-label">Remember Me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>
            
            <button type="submit" className="login-btn">Login</button>
          </form>
          
          <div className="login-footer">
            <p>
              Not registered yet? Create an account <a href="#" className="signup-link">Sign Up</a>
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

export default Login;