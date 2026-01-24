import React, { useState } from 'react';

const WorkflowSteps = ({
  tender,
  currentStep,
  onStepComplete,
  submittedSteps,
  showDocumentSuccess,
  onUploadDocument,
  onRemoveDocument,
  uploadingFiles,
  uploadProgress,
  setUploadingFiles,
  setUploadProgress,
  setShowDocumentSuccess
}) => {
  const [stepData, setStepData] = useState({});
  
  // Define the 8 steps for the workflow
  const steps = [
    {
      id: 0,
      title: "Assign Bidding Engineer",
      description: "Assign a qualified engineer to manage the bidding process",
      required: true
    },
    {
      id: 1,
      title: "Technical Specifications Review",
      description: "Review and analyze the technical requirements of the tender",
      required: true
    },
    {
      id: 2,
      title: "Financial Analysis",
      description: "Analyze cost estimates and financial aspects of the project",
      required: true
    },
    {
      id: 3,
      title: "Compliance Check",
      description: "Verify all legal and regulatory compliance requirements",
      required: true
    },
    {
      id: 4,
      title: "Documentation Preparation",
      description: "Prepare all necessary documents for the bidding process",
      required: true
    },
    {
      id: 5,
      title: "Bid Submission",
      description: "Submit the prepared bid documents before deadline",
      required: true
    },
    {
      id: 6,
      title: "Follow-up & Clarifications",
      description: "Address any queries from the tender authority",
      required: true
    },
    {
      id: 7,
      title: "Final Review & Approval",
      description: "Final review and approval of the submitted bid",
      required: true
    }
  ];

  const handleStepSubmit = (stepId) => {
    // Mark the step as completed
    onStepComplete(stepId);
    
    // Store step data if needed
    setStepData(prev => ({
      ...prev,
      [stepId]: { completed: true, timestamp: new Date() }
    }));
  };

  const handleFileUpload = (stepId, e) => {
    const files = Array.from(e.target.files);
    const fileId = `${tender.id}-${stepId}-${Date.now()}`;
    
    // Simulate upload progress
    setUploadingFiles(prev => ({
      ...prev,
      [fileId]: true
    }));

    // Simulate upload completion
    setTimeout(() => {
      onUploadDocument(tender.id, stepId, { target: { files } });
      setUploadingFiles(prev => ({
        ...prev,
        [fileId]: false
      }));
      
      setShowDocumentSuccess(prev => ({
        ...prev,
        [`${tender.id}-${stepId}`]: true
      }));
      
      setTimeout(() => {
        setShowDocumentSuccess(prev => ({
          ...prev,
          [`${tender.id}-${stepId}`]: false
        }));
      }, 3000);
    }, 1000);
  };

  const isStepCompleted = (stepId) => {
    return submittedSteps[`${tender.id}-${stepId}`] || stepData[stepId]?.completed;
  };

  const isStepActive = (stepId) => {
    return stepId === currentStep;
  };

  const isStepLocked = (stepId) => {
    // Steps are locked if they're not the current step or a completed step
    return stepId > currentStep && !isStepCompleted(stepId);
  };

  return (
    <div className="workflow-steps-container">
      <div className="steps-progress-overview">
        <h4>Workflow Progress</h4>
        <div className="steps-tracker">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`step-item ${isStepCompleted(index) ? 'completed' : isStepActive(index) ? 'active' : isStepLocked(index) ? 'locked' : 'pending'}`}
            >
              <div className="step-number">
                {isStepCompleted(index) ? (
                  <i className="fas fa-check"></i>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-label">{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="current-step-details">
        {steps.map((step, index) => (
          isStepActive(index) && (
            <div key={step.id} className="step-card">
              <div className="step-header">
                <h3>Step {index + 1}: {step.title}</h3>
                <span className={`step-status-badge ${isStepCompleted(index) ? 'status-completed' : 'status-active'}`}>
                  {isStepCompleted(index) ? 'COMPLETED' : 'ACTIVE'}
                </span>
              </div>
              
              <p className="step-description">{step.description}</p>
              
              <div className="step-content">
                {/* Step-specific content */}
                {index === 1 && (
                  <div className="step-form">
                    <div className="form-group">
                      <label>Technical Requirements Analysis</label>
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder="Provide detailed analysis of technical specifications..."
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label>Key Technical Challenges</label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        placeholder="Identify potential technical challenges..."
                      ></textarea>
                    </div>
                  </div>
                )}
                
                {index === 2 && (
                  <div className="step-form">
                    <div className="form-group">
                      <label>Cost Estimation</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        placeholder="Enter estimated project cost (in ₹)"
                      />
                    </div>
                    <div className="form-group">
                      <label>Budget Allocation</label>
                      <textarea 
                        className="form-control" 
                        rows="3" 
                        placeholder="Describe budget allocation strategy..."
                      ></textarea>
                    </div>
                  </div>
                )}
                
                {index === 3 && (
                  <div className="step-form">
                    <div className="form-group">
                      <label>Compliance Checklist</label>
                      <div className="checkbox-group">
                        <label className="checkbox-label">
                          <input type="checkbox" /> Legal Requirements
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" /> Environmental Compliance
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" /> Safety Standards
                        </label>
                        <label className="checkbox-label">
                          <input type="checkbox" /> Quality Standards
                        </label>
                      </div>
                    </div>
                  </div>
                )}
                
                {(index === 4 || index === 5 || index === 6 || index === 7) && (
                  <div className="step-form">
                    <div className="form-group">
                      <label>Additional Details</label>
                      <textarea 
                        className="form-control" 
                        rows="4" 
                        placeholder={`Provide details for ${step.title}...`}
                      ></textarea>
                    </div>
                  </div>
                )}
                
                {/* Document upload section for all steps */}
                <div className="document-section">
                  <h5>Supporting Documents</h5>
                  <input 
                    type="file" 
                    multiple 
                    onChange={(e) => handleFileUpload(index, e)}
                    className="form-control"
                  />
                  
                  {uploadingFiles[`${tender.id}-${index}-${Date.now() - 1000}`] && (
                    <div className="upload-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${uploadProgress[`${tender.id}-${index}`] || 0}%` }}
                        ></div>
                      </div>
                      <span>Uploading... {uploadProgress[`${tender.id}-${index}`] || 0}%</span>
                    </div>
                  )}
                  
                  {showDocumentSuccess[`${tender.id}-${index}`] && (
                    <div className="document-success-message bg-success text-white p-2 rounded mt-2">
                      Documents uploaded successfully!
                    </div>
                  )}
                </div>
                
                {/* Step completion button */}
                <div className="step-actions">
                  <button 
                    className="btn btn-assign-engineer" 
                    onClick={() => handleStepSubmit(index)}
                    disabled={isStepCompleted(index)}
                  >
                    {isStepCompleted(index) ? 'Completed' : 'Complete Step'}
                  </button>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default WorkflowSteps;