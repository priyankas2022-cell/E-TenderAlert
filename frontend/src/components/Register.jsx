import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import apiClient from '../api/client';
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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (error) setError('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    if (!termsAgreed) {
      setError('Please agree to the terms and conditions.');
      setLoading(false);
      return;
    }

    try {
      // Prepare data for API (combine first/last name to username if needed, or backend handles it)
      // Backend expects username, email, password.
      // We'll use email as username or create one from name
      const userData = {
        username: formData.email, // Use email as username for simpler login
        email: formData.email,
        password: formData.password,
        password_confirm: formData.confirmPassword, // Required by backend serializer
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: 'ENGINEER'
      };

      await apiClient.register(userData);

      // Auto login or redirect to login
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
      // Check for specific error keys
      if (err.username) setError(`Username: ${err.username[0]}`);
      else if (err.email) setError(`Email: ${err.email[0]}`);
      else if (err.password) setError(`Password: ${err.password[0]}`);
      else setError(err.detail || 'Registration failed. Please try again.');
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

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-content">
          <h1 className="login-heading">Create Account</h1>
          <p className="login-subtext">Join us today to get started</p>

          <button className="google-login-btn" onClick={() => googleLogin()} disabled={loading}>
            <i className="fab fa-google google-icon"></i>
            Sign up with Google
          </button>

          <div className="divider">
            <span className="divider-text">or Sign up with Email</span>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message" style={{ color: '#dc3545', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

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
                  disabled={loading}
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
                  disabled={loading}
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
                onClick={() => handlePasswordToggle('password')}
                disabled={loading}
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
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => handlePasswordToggle('confirmPassword')}
                disabled={loading}
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
                  disabled={loading}
                />
                <label htmlFor="termsAgreed" className="checkbox-label">I agree to the <Link to="/terms" className="terms-link">Terms & Conditions</Link></label>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Already have an account? <Link to="/login" className="signup-link">Login</Link>
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