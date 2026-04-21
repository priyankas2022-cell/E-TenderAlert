import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import apiClient from '../api/client';
import './Login.css'; // Import the CSS file
import loginIllustration from '../assets/Login Page.png'; // Import the illustration

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (error) setError('');
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call to login
      // Note: Backend might expect 'username', so we send email as username
      await apiClient.login(formData.email, formData.password);

      // Redirect to home/dashboard on success
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.detail || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        // Send access token to backend for verification and user creation/login
        await apiClient.googleLogin(tokenResponse.access_token);
        navigate('/');
      } catch (err) {
        console.error('Google login failed:', err);
        setError('Google login failed. Please try again.');
        setLoading(false);
      }
    },
    onError: () => {
      setError('Google login failed.');
      setLoading(false);
    }
  });

  const handleGoogleLogin = () => {
    googleLogin();
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
            {error && <div className="error-message" style={{ color: '#dc3545', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

            <div className="form-group">
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your username or email"
                className="form-input"
                required
                disabled={loading}
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
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={handlePasswordToggle}
                disabled={loading}
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
                  disabled={loading}
                />
                <label htmlFor="rememberMe" className="checkbox-label">Remember Me</label>
              </div>
              <a href="#" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Not registered yet? Create an account <Link to="/register" className="signup-link">Sign Up</Link>
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