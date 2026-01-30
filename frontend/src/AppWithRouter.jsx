import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';

import Login from './components/Login';
import Register from './components/Register';
import WorkflowPage from './components/WorkflowPage';

const AppWithRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/workflow" element={<WorkflowPage />} />
      </Routes>
    </Router>
  );
};

export default AppWithRouter;