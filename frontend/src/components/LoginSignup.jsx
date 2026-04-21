import React, { useState, useEffect } from 'react';
import loginAnimation from '../assets/Login.json'; // Import the JSON animation file
import Lottie from 'lottie-react'; // Lottie animation library
import apiClient from '../api/client';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const LoginSignup = ({ onClose, initialMode = true }) => {
  const [isLogin, setIsLogin] = useState(initialMode);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login logic
        await apiClient.login(formData.email, formData.password);
        if (onClose) onClose();
        // Redirect to homepage
        navigate('/');
        window.location.reload();
      } else {
        // Signup logic
        const userData = {
          username: formData.email,
          email: formData.email,
          password: formData.password,
          password_confirm: formData.password, // Simple confirmation for this modal
          first_name: formData.firstName,
          last_name: formData.lastName,
          role: 'ENGINEER'
        };
        await apiClient.register(userData);
        alert('Registration successful! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError(err.detail || (err.email ? `Email: ${err.email[0]}` : 'Authentication failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        await apiClient.googleLogin(tokenResponse.access_token);
        if (onClose) onClose();
        navigate('/');
        window.location.reload();
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
    <div
      className="login-container-new"
      style={{
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        background: '#fff',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        margin: '40px auto',
        border: '1px solid rgba(0,0,0,0.1)'
      }}
    >
      {/* Close Button - Only show if onClose provided */}
      {onClose && (
        <button
          className="close-modal-small"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: '#6c757d',
            border: 'none',
            borderRadius: '50%',
            width: '25px',
            height: '25px',
            fontSize: '16px',
            cursor: 'pointer',
            zIndex: 1001,
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}
        >
          &times;
        </button>
      )}

      <div className="form-box" style={{
        flex: '1 1 auto',
        padding: '40px',
        background: '#fdecec',
        minWidth: '300px',
      }}>
        <h1 style={{ fontSize: '28px', marginBottom: '10px', color: '#000' }}>
          {isLogin ? 'Login now' : 'Sign Up now'}
        </h1>
        <p style={{ color: '#444', marginBottom: '25px' }}>
          {isLogin ? 'Hi, Welcome back 👋' : 'Create your account 🚀'}
        </p>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            background: '#ffb6c1',
            border: 'none',
            padding: '14px',
            width: '100%',
            fontSize: '16px',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '15px',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'Processing...' : (isLogin ? 'Continue with Google' : 'Sign up with Google')}
        </button>

        <div className="divider" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '15px 0', color: '#777' }}>
          <div style={{ flex: 1, height: '1px', background: '#ccc' }}></div>
          <span>or {isLogin ? 'Login' : 'Sign up'} with Email</span>
          <div style={{ flex: 1, height: '1px', background: '#ccc' }}></div>
        </div>

        {error && <div className="error-message" style={{ color: '#dc3545', marginBottom: '15px', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#ffb6c1',
                  marginBottom: '15px',
                  fontSize: '14px',
                }}
                required
                disabled={loading}
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#ffb6c1',
                  marginBottom: '15px',
                  fontSize: '14px',
                }}
                required
                disabled={loading}
              />
            </>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              background: '#ffb6c1',
              marginBottom: '15px',
              fontSize: '14px',
            }}
            required
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              background: '#ffb6c1',
              marginBottom: '15px',
              fontSize: '14px',
            }}
            required
            disabled={loading}
          />

          {isLogin && (
            <div className="row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '14px',
              marginBottom: '20px',
            }}>
              <label style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  style={{ marginRight: '8px' }}
                />
                Remember Me
              </label>
              <a href="#" style={{ color: '#4b4ed6', textDecoration: 'none' }}>Forgot Password?</a>
            </div>
          )}

          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              background: '#4b4ed6',
              color: '#fff',
              fontSize: '18px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="switch" style={{
          marginTop: '20px',
          fontSize: '14px',
          color: '#000',
        }}>
          {isLogin ? 'Not registered yet? ' : 'Already have an account? '}
          <span
            onClick={toggleForm}
            style={{
              color: '#4b4ed6',
              cursor: 'pointer',
            }}
          >
            {isLogin ? 'Create an account' : 'Sign in'}
          </span>
        </div>
      </div>

      {/* Animation Box - Right side with JSON/GIF animation */}
      <div className="animation-box" style={{
        flex: '1 1 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f0f0',
        padding: '20px',
        minWidth: '300px',
      }}>
        <Lottie
          animationData={loginAnimation}
          loop={true}
          autoplay={true}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </div>
  );
};

export default LoginSignup;