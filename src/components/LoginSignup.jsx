import React, { useState, useEffect } from 'react';
import loginAnimation from '../assets/Login.json'; // Import the JSON animation file
import Lottie from 'lottie-react'; // Lottie animation library

const LoginSignup = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(isLogin ? 'Login submitted' : 'Signup submitted');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  return (
    <div 
      className="container"
      style={{
        width: '100%',
        maxWidth: '1100px',
        display: 'flex',
        background: 'transparent',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        margin: '20px auto',
        
      }}
    >
      {/* Close Button - Changed from black to a lighter color */}
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
          style={{
            background: '#ffb6c1',
            border: 'none',
            padding: '14px',
            width: '100%',
            fontSize: '16px',
            borderRadius: '8px',
            cursor: 'pointer',
            marginBottom: '15px',
          }}
        >
          {isLogin ? 'Continue with Google' : 'Sign up with Google'}
        </button>

        <div 
          className="divider" 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '15px 0',
            color: '#777',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: '#ccc' }}></div>
          <span>or {isLogin ? 'Login' : 'Sign up'} with Email</span>
          <div style={{ flex: 1, height: '1px', background: '#ccc' }}></div>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input 
                type="text" 
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
              />
              <input 
                type="text" 
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
              />
            </>
          )}
          
          <input 
            type="email" 
            id="email" 
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
          />
          
          <input 
            type="password" 
            id="password" 
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
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              background: '#4b4ed6',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
            }}
          >
            {isLogin ? 'Login' : 'Sign Up'}
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