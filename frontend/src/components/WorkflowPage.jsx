import React, { useState } from 'react';
import './WorkflowPage.css';

const WorkflowPage = () => {
  const [activeStep, setActiveStep] = useState(2);
  const [comment, setComment] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Mock tender data
  const tender = {
    title: "Solar Power Plant Installation - 50MW",
    category: "Solar Power Plant",
    client: "Renewable Energy Corp Ltd.",
    awardedDate: "January 19, 2026",
    contractValue: "₹45.2 Crores",
    engineer: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@company.com",
      phone: "+91 98765 43210",
      status: "PROGRESS"
    }
  };

  // 8-step workflow
  const workflowSteps = [
    {
      id: 1,
      title: "Assign Bidding Engineer",
      status: "completed",
      icon: "✓"
    },
    {
      id: 2,
      title: "Tender Reading & Technical Bid Sheet Preparation",
      status: "in_progress",
      icon: "→"
    },
    {
      id: 3,
      title: "EMD, Tender Fee, Processing Fee Request",
      status: "locked",
      icon: "🔒"
    },
    {
      id: 4,
      title: "Costing Request to Costing Engineers",
      status: "locked",
      icon: "🔒"
    },
    {
      id: 5,
      title: "Portal Registration",
      status: "locked",
      icon: "🔒"
    },
    {
      id: 6,
      title: "Documentation as per Tender Requirement",
      status: "locked",
      icon: "🔒"
    },
    {
      id: 7,
      title: "Tender Fee, Processing Fee & EMD Payment",
      status: "locked",
      icon: "🔒"
    },
    {
      id: 8,
      title: "Bidding in the Portal",
      status: "locked",
      icon: "🔒"
    }
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'status-completed';
      case 'in_progress': return 'status-in-progress';
      case 'locked': return 'status-locked';
      default: return '';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'COMPLETED';
      case 'in_progress': return 'IN PROGRESS';
      case 'locked': return 'LOCKED';
      default: return '';
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    }));
    setUploadedFiles(prev => [...prev, ...fileData]);
  };

  const handleMarkAsCompleted = () => {
    if (activeStep < 8) {
      setActiveStep(activeStep + 1);
    }
  };

  return (
    <div className="workflow-page">
      {/* 1️⃣ Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-left">
          <div className="logo">
            <span className="logo-icon">📋</span>
            <span className="logo-text">e-TenderAlert</span>
          </div>
        </div>
        
        <div className="nav-center">
          <div className="nav-item active">Home</div>
          <div className="nav-item">Dashboard</div>
          <div className="nav-item">Accepted</div>
          <div className="nav-item">Telecaller</div>

        </div>
        
        <div className="nav-right">
          <button className="register-btn">Register</button>
        </div>
      </nav>

      {/* 2️⃣ Breadcrumb Row */}
      <div className="breadcrumb-row">
        <span className="breadcrumb-text">Accepted Tenders / {tender.title}</span>
      </div>

      {/* 3️⃣ Gradient Tender Header */}
      <div className="tender-header">
        <div className="header-left">
          <h1 className="tender-title">{tender.title}</h1>
          <div className="tender-info">
            <div className="info-item">
              <span className="info-label">Category:</span>
              <span className="info-value">{tender.category}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Client:</span>
              <span className="info-value">{tender.client}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Awarded Date:</span>
              <span className="info-value">{tender.awardedDate}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Contract Value:</span>
              <span className="info-value">{tender.contractValue}</span>
            </div>
          </div>
        </div>

        <div className="header-right">
          <div className="progress-badge">
            Step {activeStep} of 8
          </div>
          
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${(activeStep / 8) * 100}%` }}
            ></div>
          </div>

          <div className="engineer-card">
            <div className="avatar-placeholder">👤</div>
            <div className="engineer-details">
              <div className="engineer-name">{tender.engineer.name}</div>
              <div className="engineer-email">{tender.engineer.email}</div>
              <div className="engineer-phone">{tender.engineer.phone}</div>
            </div>
            <div className="engineer-status status-progress">
              {tender.engineer.status}
            </div>
          </div>
        </div>
      </div>

      {/* 4️⃣ Main Workflow Section */}
      <div className="main-workflow-section">
        <h2 className="workflow-title">Progress Workflow – Step {activeStep} of 8</h2>
        
        <div className="workflow-content">
          {/* LEFT PANEL – Step List */}
          <div className="steps-panel">
            {workflowSteps.map((step) => (
              <div 
                key={step.id}
                className={`step-card ${getStatusClass(step.status)} ${activeStep === step.id ? 'active' : ''}`}
                onClick={() => setActiveStep(step.id)}
              >
                <div className="step-number">{step.icon}</div>
                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <span className={`step-status ${getStatusClass(step.status)}`}>
                    {getStatusText(step.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT PANEL – Step Details */}
          <div className="details-panel">
            <div className="step-details-card">
              <div className="step-header">
                <h3 className="step-detail-title">
                  {workflowSteps.find(s => s.id === activeStep)?.title}
                </h3>
                <span className={`step-status ${getStatusClass(workflowSteps.find(s => s.id === activeStep)?.status)}`}>
                  {getStatusText(workflowSteps.find(s => s.id === activeStep)?.status)}
                </span>
              </div>

              <div className="step-content-area">
                <div className="comment-section">
                  <label className="comment-label">Comments</label>
                  <textarea
                    className="comment-textarea"
                    placeholder="Add your comments here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="4"
                  />
                </div>

                <div className="file-upload-section">
                  <div className="file-upload-card">
                    <div className="file-upload-header">
                      <span className="file-icon">📁</span>
                      <span className="file-upload-text">Upload Documents</span>
                    </div>
                    
                    <div className="file-list">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="uploaded-file">
                          <span className="file-name">{file.name}</span>
                          <span className="file-meta">
                            {Math.round(file.size / 1024)}KB • {new Date(file.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="file-upload-actions">
                      <input
                        type="file"
                        id="file-upload"
                        className="file-input"
                        multiple
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="file-upload" className="browse-button">
                        Browse
                      </label>
                    </div>
                  </div>
                </div>

                <div className="action-section">
                  <button 
                    className="mark-complete-btn"
                    onClick={handleMarkAsCompleted}
                    disabled={workflowSteps.find(s => s.id === activeStep)?.status !== 'in_progress'}
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowPage;