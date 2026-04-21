import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';

import WorkflowPage from './components/WorkflowPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginSignup from './components/LoginSignup';
import { NotificationProvider } from './context/NotificationContext';

const AppWithRouter = () => {
  return (
    <Router>
      <NotificationProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={
            <div style={{ background: 'linear-gradient(135deg, #0f1419 0%, #2c3e50 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
                <LoginSignup initialMode={true} />
              </div>
              <Footer />
            </div>
          } />
          <Route path="/register" element={
            <div style={{ background: 'linear-gradient(135deg, #0f1419 0%, #2c3e50 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <Header />
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
                <LoginSignup initialMode={false} />
              </div>
              <Footer />
            </div>
          } />

          <Route path="/workflow" element={<WorkflowPage />} />
        </Routes>
      </NotificationProvider>
    </Router>
  );
};

export default AppWithRouter;