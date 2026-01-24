import React, { useState, useEffect } from 'react';
import WorkflowSteps from './WorkflowSteps';

const AcceptedTenders = ({
  tenders = [],
  onSelectTender,
  selectedTender,
  onBack,
  tenderSteps = [],
  onUploadDocument,
  onRemoveDocument,
  notifications = [],
  onDismissNotification,
  onMarkAllRead,
  onUpdateTenderEngineer
}) => {
  // Local state for selected tender as fallback
  const [localSelectedTender, setLocalSelectedTender] = useState(null);
  
  // Use parent prop if provided and not null, otherwise use local state
  const effectiveSelectedTender = selectedTender != null ? selectedTender : localSelectedTender;

  // ✅ Safe accepted tenders filter
  const acceptedTenders = tenders.filter(
    t => t.status?.toLowerCase() === 'accepted'
  );

  const [engineerData, setEngineerData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    mobile: '',
    telegram: ''
  });

  // State for Assign Engineer Modal
  const [showAssignEngineerModal, setShowAssignEngineerModal] = useState(false);
  const [selectedTenderForAssignment, setSelectedTenderForAssignment] = useState(null);
  
  // Form data for Step 1
  const [step1FormData, setStep1FormData] = useState({
    tenderId: '',
    department: '',
    projectType: '',
    deadline: '',
    estimatedValue: '',
    assignedEngineer: ''
  });

  // Workflow state
  const [currentWorkflowStep, setCurrentWorkflowStep] = useState(0); // 0 means not started, 1-8 are the steps
  const [workflowData, setWorkflowData] = useState({});
  
  // Reset Step When Tender Changes
  useEffect(() => {
    if (effectiveSelectedTender) {
      setCurrentWorkflowStep(1);
    }
  }, [effectiveSelectedTender]);
  
  // Define the 8 workflow steps
  const workflowSteps = [
    {
      id: 1,
      title: "Assign Bidding Engineer",
      description: "Assign a qualified engineer to manage the bidding process",
      icon: "engineer",
      color: "#3498db",
      required: true
    },
    {
      id: 2,
      title: "Technical Specifications Review",
      description: "Review and analyze the technical requirements of the tender",
      icon: "specs",
      color: "#2ecc71",
      required: true
    },
    {
      id: 3,
      title: "Financial Analysis",
      description: "Analyze cost estimates and financial aspects of the project",
      icon: "finance",
      color: "#f39c12",
      required: true
    },
    {
      id: 4,
      title: "Compliance Check",
      description: "Verify all legal and regulatory compliance requirements",
      icon: "compliance",
      color: "#e74c3c",
      required: true
    },
    {
      id: 5,
      title: "Documentation Preparation",
      description: "Prepare all necessary documents for the bidding process",
      icon: "docs",
      color: "#9b59b6",
      required: true
    },
    {
      id: 6,
      title: "Bid Submission",
      description: "Submit the prepared bid documents before deadline",
      icon: "submit",
      color: "#1abc9c",
      required: true
    },
    {
      id: 7,
      title: "Follow-up & Clarifications",
      description: "Address any queries from the tender authority",
      icon: "followup",
      color: "#34495e",
      required: true
    },
    {
      id: 8,
      title: "Final Review & Approval",
      description: "Final review and approval of the submitted bid",
      icon: "approval",
      color: "#e67e22",
      required: true
    }
  ];

  const [showDocumentSuccess, setShowDocumentSuccess] = useState({});
  const [submittedSteps, setSubmittedSteps] = useState({});
  const [uploadingFiles, setUploadingFiles] = useState({});
  const [uploadProgress, setUploadProgress] = useState({});

  /* ---------------- COUNTER ANIMATION ---------------- */
  useEffect(() => {
    let animated = false;

    if (animated) return;
    animated = true;

    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = Number(counter.dataset.target || 0);
      let start = 0;
      const duration = 1200;
      const startTime = performance.now();

      const animate = time => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
        counter.innerText = eased;
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    });

    return () => (animated = false);
  }, [acceptedTenders.length]);

  /* ---------------- HELPERS ---------------- */
  const countCompletedSteps = tender =>
    tenderSteps.reduce(
      (acc, step) =>
        tender.documents?.[step.id]?.length ? acc + 1 : acc,
      0
    );

  const getNextAvailableStep = tender => {
    for (let i = 0; i < tenderSteps.length; i++) {
      if (!tender.documents?.[tenderSteps[i].id]?.length) return i;
    }
    return tenderSteps.length - 1;
  };

  const handleEngineerInputChange = e => {
    const key = e.target.id.replace('engineer', '').toLowerCase();
    setEngineerData(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleAssignEngineer = e => {
    e.preventDefault();

    onUpdateTenderEngineer?.(selectedTender.id, engineerData);

    setSubmittedSteps(prev => ({ ...prev, [`${selectedTender.id}-0`]: true }));
    setShowDocumentSuccess(prev => ({ ...prev, [`${selectedTender.id}-0`]: true }));

    setTimeout(() => {
      setShowDocumentSuccess(prev => ({ ...prev, [`${selectedTender.id}-0`]: false }));
    }, 3000);

    setEngineerData({
      name: '',
      email: '',
      whatsapp: '',
      mobile: '',
      telegram: ''
    });
  };

  const handleStepComplete = (stepId) => {
    setSubmittedSteps(prev => ({ ...prev, [`${selectedTender.id}-${stepId}`]: true }));
    setShowDocumentSuccess(prev => ({ ...prev, [`${selectedTender.id}-${stepId}`]: true }));

    setTimeout(() => {
      setShowDocumentSuccess(prev => ({ ...prev, [`${selectedTender.id}-${stepId}`]: false }));
    }, 3000);
  };

  // Handler for opening Assign Engineer modal
  const handleOpenAssignEngineerModal = (tender) => {
    setSelectedTenderForAssignment(tender);
    setStep1FormData({
      tenderId: tender.id,
      department: tender.department || '',
      projectType: '',
      deadline: '',
      estimatedValue: tender.amount || '',
      assignedEngineer: ''
    });
    setShowAssignEngineerModal(true);
  };

  // Handler for closing Assign Engineer modal
  const handleCloseAssignEngineerModal = () => {
    setShowAssignEngineerModal(false);
    setSelectedTenderForAssignment(null);
    setStep1FormData({
      tenderId: '',
      department: '',
      projectType: '',
      deadline: '',
      estimatedValue: '',
      assignedEngineer: ''
    });
  };

  // Handler for Step 1 form changes
  const handleStep1FormChange = (e) => {
    const { name, value } = e.target;
    setStep1FormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler for submitting Step 1 form
  const handleSubmitStep1 = () => {
    if (!step1FormData.department || !step1FormData.projectType || 
        !step1FormData.deadline || !step1FormData.estimatedValue || 
        !step1FormData.assignedEngineer) {
      alert('Please fill in all required fields');
      return;
    }

    setWorkflowData(prev => ({
      ...prev,
      [effectiveSelectedTender.id]: {
        ...(prev[effectiveSelectedTender.id] || {}),
        1: {
          ...step1FormData,
          assignedOn: new Date().toISOString()
        }
      }
    }));

    onUpdateTenderEngineer?.(effectiveSelectedTender.id, {
      name: step1FormData.assignedEngineer
    });

    setCurrentWorkflowStep(2); // Move to Step-2
  };

  const handleDocumentSubmit = (tid, sid) => {
    setSubmittedSteps(prev => ({ ...prev, [`${tid}-${sid}`]: true }));
    setShowDocumentSuccess(prev => ({ ...prev, [`${tid}-${sid}`]: true }));

    setTimeout(() => {
      setShowDocumentSuccess(prev => ({ ...prev, [`${tid}-${sid}`]: false }));
    }, 3000);
  };

  /* ---------------- TENDER LIST ---------------- */
  const renderTenderList = () => (
    <div className="tender-grid animate__animated animate__fadeIn">

      {acceptedTenders.length === 0 ? (
        <div className="no-tenders-card text-center">
          <i className="fas fa-file-contract"></i>
          <h3>No accepted tenders yet</h3>
          <p>Go to Dashboard to accept tenders.</p>
        </div>
      ) : (
        <>
          {/* PROFESSIONAL ENTERPRISE DATA TABLE */}
          <div className="enterprise-tenders-table-container">
            <div className="table-wrapper">
              <table className="enterprise-tenders-table">
                <thead>
                  <tr>
                    <th>Tender Title</th>
                    <th>Category</th>
                    <th>Awarded Date</th>
                    <th>Status</th>
                    <th>Contract Value</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {acceptedTenders.map(t => (
                    <tr key={t.id} className="table-row">
                      <td className="tender-title-cell" onClick={() => onSelectTender(t)}>
                        {t.title}
                      </td>
                      <td className="category-cell">{t.category || t.department || '—'}</td>
                      <td className="awarded-date-cell">
                        {t.awardedDate ? 
                          new Date(t.awardedDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          }) : 
                          '—'
                        }
                      </td>
                      <td className="status-cell">
                        <span className="status-badge approved-badge">
                          Approved
                        </span>
                      </td>
                      <td className="contract-value-cell">
                        {t.contractValue ? 
                          new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                          }).format(t.contractValue) : 
                          '—'
                        }
                      </td>
                      <td className="actions-cell">
                        <button 
                          className="btn btn-assign-engineer" 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Set the selected tender first
                            onSelectTender(t);
                            // Also set local state as fallback
                            setLocalSelectedTender(t);
                            // Pre-populate the form with tender data
                            setStep1FormData({
                              tenderId: t.id,
                              department: t.department || '',
                              projectType: '',
                              deadline: '',
                              estimatedValue: t.amount || '',
                              assignedEngineer: ''
                            });
                            // Directly set the workflow step to 1
                            setCurrentWorkflowStep(1);
                          }}
                        >
                          <i className="fas fa-user-plus"></i> Assign Engineer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PROFESSIONAL PAGINATION */}
            <div className="pagination-controls">
              <button className="pagination-btn pagination-prev" disabled>
                <span>&laquo; Previous</span>
              </button>
              
              <div className="pagination-pages">
                <button className="pagination-page active">1</button>
                <button className="pagination-page">2</button>
                <button className="pagination-page">3</button>
                <span className="pagination-ellipsis">...</span>
                <button className="pagination-page">10</button>
              </div>
              
              <button className="pagination-btn pagination-next">
                <span>Next &raquo;</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  /* ---------------- PROGRESS DASHBOARD ---------------- */
  const renderProgressDashboard = () => {
    if (!effectiveSelectedTender) return null;

    const isEngineerAssigned = !!effectiveSelectedTender.engineer?.name;
    
    // Calculate progress
    const totalSteps = workflowSteps.length;
    const completedSteps = Object.keys(workflowData[effectiveSelectedTender.id] || {})
      .filter(k => !isNaN(k)).length;

    return (
      <div className="progress-dashboard">
        <button 
          onClick={() => {
            // Call parent onBack if provided
            if (onBack) onBack();
            // Clear local state as well
            setLocalSelectedTender(null);
          }} 
          className="btn-back">
          ← Back
        </button>

        <h2>{effectiveSelectedTender.title}</h2>
        <p>{completedSteps} / {totalSteps} steps completed</p>

        {/* Workflow Steps Overview */}
        <div className="workflow-steps-overview">
          <div className="steps-tracker">
            {workflowSteps.map((step, index) => {
              const isCompleted = workflowData[effectiveSelectedTender.id]?.[step.id] !== undefined;
              const isActive = currentWorkflowStep === step.id;
              const isLocked = currentWorkflowStep < step.id;
              
              return (
                <div 
                  key={step.id} 
                  className={`step-item ${isCompleted ? 'completed' : isActive ? 'active' : isLocked ? 'locked' : 'pending'}`}
                  style={{ borderLeftColor: step.color }}
                >
                  <div className="step-header">
                    <div className="step-indicator">
                      <div className="step-number" style={{ backgroundColor: step.color }}>
                        {isCompleted ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          step.id
                        )}
                      </div>
                      <div className="step-info">
                        <h4 className="step-title">{step.title}</h4>
                        <p className="step-description">{step.description}</p>
                      </div>
                    </div>
                    <div className="step-status">
                      {isCompleted ? (
                        <span className="status-badge completed-badge">Completed</span>
                      ) : isActive ? (
                        <span className="status-badge active-badge">In Progress</span>
                      ) : isLocked ? (
                        <span className="status-badge locked-badge">Locked</span>
                      ) : (
                        <span className="status-badge pending-badge">Pending</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Content */}
        {currentWorkflowStep > 0 && (
          <div className="current-step-content">
            {renderCurrentStepContent()}
          </div>
        )}
      </div>
    );
  };

  // Render the current step content
  const renderCurrentStepContent = () => {
    const step = workflowSteps.find(s => s.id === currentWorkflowStep);
    
    if (!step) return null;
    
    switch(currentWorkflowStep) {
      case 1:
        // Step 1 is already handled by the modal
        return (
          <div className="step-card" style={{ borderLeftColor: step.color }}>
            <div className="step-header">
              <div className="step-info">
                <h3><span className="step-id" style={{ backgroundColor: step.color }}>1</span> {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-meta">
                <span className="step-status-badge status-active">ACTIVE</span>
              </div>
            </div>
            <div className="step-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter engineer name"
                    value={step1FormData.assignedEngineer || ''}
                    onChange={(e) => setStep1FormData(prev => ({...prev, assignedEngineer: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label>Email ID *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter email address"
                    value={step1FormData.email || ''}
                    onChange={(e) => setStep1FormData(prev => ({...prev, email: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    placeholder="Enter phone number"
                    value={step1FormData.phone || ''}
                    onChange={(e) => setStep1FormData(prev => ({...prev, phone: e.target.value}))}
                  />
                </div>
                <div className="form-group">
                  <label>Telegram ID</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter Telegram ID"
                    value={step1FormData.telegram || ''}
                    onChange={(e) => setStep1FormData(prev => ({...prev, telegram: e.target.value}))}
                  />
                </div>
                <div className="form-group full-width">
                  <label>Department *</label>
                  <select 
                    className="form-control" 
                    value={step1FormData.department || ''}
                    onChange={(e) => setStep1FormData(prev => ({...prev, department: e.target.value}))}
                  >
                    <option value="">Select Department</option>
                    <option value="Solar Energy & PV Systems">Solar Energy & PV Systems</option>
                    <option value="Energy Storage & BESS">Energy Storage & BESS</option>
                    <option value="Electric Mobility & EV Infrastructure">Electric Mobility & EV Infrastructure</option>
                    <option value="Green Hydrogen & Electrolysis">Green Hydrogen & Electrolysis</option>
                    <option value="Green Ammonia & Chemical Energy">Green Ammonia & Chemical Energy</option>
                    <option value="Hydropower & Water Energy Systems">Hydropower & Water Energy Systems</option>
                    <option value="Water & Wastewater Infrastructure">Water & Wastewater Infrastructure</option>
                    <option value="Hybrid Renewable Projects">Hybrid Renewable Projects</option>
                    <option value="Power Transmission & Grid Systems">Power Transmission & Grid Systems</option>
                  </select>
                </div>
              </div>
              <div className="step-actions">
                <button 
                  className="btn btn-assign-engineer" 
                  onClick={handleSubmitStep1}
                  style={{ backgroundColor: step.color }}
                >
                  Complete Step 1
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-card" style={{ borderLeftColor: step.color }}>
            <div className="step-header">
              <div className="step-info">
                <h3><span className="step-id" style={{ backgroundColor: step.color }}>2</span> {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-meta">
                <span className="step-status-badge status-active">ACTIVE</span>
              </div>
            </div>
            <div className="step-content">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Technical Specifications Analysis</label>
                  <textarea 
                    className="form-control" 
                    rows="6" 
                    placeholder="Provide detailed analysis of technical specifications..."
                  ></textarea>
                </div>
                <div className="form-group full-width">
                  <label>Key Technical Challenges</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="Identify potential technical challenges..."
                  ></textarea>
                </div>
              </div>
              <div className="step-actions">
                <button 
                  className="btn btn-assign-engineer" 
                  onClick={() => setCurrentWorkflowStep(3)}
                  style={{ backgroundColor: step.color }}
                >
                  Complete Step 2
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-card" style={{ borderLeftColor: step.color }}>
            <div className="step-header">
              <div className="step-info">
                <h3><span className="step-id" style={{ backgroundColor: step.color }}>3</span> {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-meta">
                <span className="step-status-badge status-active">ACTIVE</span>
              </div>
            </div>
            <div className="step-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Cost Estimation</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="Enter estimated project cost (in ₹)"
                  />
                </div>
                <div className="form-group full-width">
                  <label>Budget Allocation</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="Describe budget allocation strategy..."
                  ></textarea>
                </div>
              </div>
              <div className="step-actions">
                <button 
                  className="btn btn-assign-engineer" 
                  onClick={() => setCurrentWorkflowStep(4)}
                  style={{ backgroundColor: step.color }}
                >
                  Complete Step 3
                </button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-card" style={{ borderLeftColor: step.color }}>
            <div className="step-header">
              <div className="step-info">
                <h3><span className="step-id" style={{ backgroundColor: step.color }}>4</span> {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-meta">
                <span className="step-status-badge status-active">ACTIVE</span>
              </div>
            </div>
            <div className="step-content">
              <div className="form-grid">
                <div className="form-group full-width">
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
              <div className="step-actions">
                <button 
                  className="btn btn-assign-engineer" 
                  onClick={() => setCurrentWorkflowStep(5)}
                  style={{ backgroundColor: step.color }}
                >
                  Complete Step 4
                </button>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-card" style={{ borderLeftColor: step.color }}>
            <div className="step-header">
              <div className="step-info">
                <h3><span className="step-id" style={{ backgroundColor: step.color }}>5</span> {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-meta">
                <span className="step-status-badge status-active">ACTIVE</span>
              </div>
            </div>
            <div className="step-content">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Documentation Requirements</label>
                  <textarea 
                    className="form-control" 
                    rows="6" 
                    placeholder="List all required documentation for the bidding process..."
                  ></textarea>
                </div>
                <div className="form-group full-width">
                  <label>Submission Guidelines</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="Outline submission requirements and format..."
                  ></textarea>
                </div>
              </div>
              <div className="step-actions">
                <button 
                  className="btn btn-assign-engineer" 
                  onClick={() => setCurrentWorkflowStep(6)}
                  style={{ backgroundColor: step.color }}
                >
                  Complete Step 5
                </button>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step-card" style={{ borderLeftColor: step.color }}>
            <div className="step-header">
              <div className="step-info">
                <h3><span className="step-id" style={{ backgroundColor: step.color }}>6</span> {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-meta">
                <span className="step-status-badge status-active">ACTIVE</span>
              </div>
            </div>
            <div className="step-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Submission Deadline</label>
                  <input type="datetime-local" className="form-control" />
                </div>
                <div className="form-group">
                  <label>Submission Method</label>
                  <select className="form-control">
                    <option value="">Select method</option>
                    <option value="online">Online Portal</option>
                    <option value="physical">Physical Submission</option>
                    <option value="hybrid">Hybrid (Online + Physical)</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Documents to Submit</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="List all documents to be submitted with the bid..."
                  ></textarea>
                </div>
              </div>
              <div className="step-actions">
                <button 
                  className="btn btn-assign-engineer" 
                  onClick={() => setCurrentWorkflowStep(7)}
                  style={{ backgroundColor: step.color }}
                >
                  Complete Step 6
                </button>
              </div>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="step-card" style={{ borderLeftColor: step.color }}>
            <div className="step-header">
              <div className="step-info">
                <h3><span className="step-id" style={{ backgroundColor: step.color }}>7</span> {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-meta">
                <span className="step-status-badge status-active">ACTIVE</span>
              </div>
            </div>
            <div className="step-content">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Follow-up Actions</label>
                  <textarea 
                    className="form-control" 
                    rows="5" 
                    placeholder="Outline planned follow-up actions and timeline..."
                  ></textarea>
                </div>
                <div className="form-group full-width">
                  <label>Clarification Handling</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="Describe approach to handle clarifications from tender authority..."
                  ></textarea>
                </div>
              </div>
              <div className="step-actions">
                <button 
                  className="btn btn-assign-engineer" 
                  onClick={() => setCurrentWorkflowStep(8)}
                  style={{ backgroundColor: step.color }}
                >
                  Complete Step 7
                </button>
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="step-card" style={{ borderLeftColor: step.color }}>
            <div className="step-header">
              <div className="step-info">
                <h3><span className="step-id" style={{ backgroundColor: step.color }}>8</span> {step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-meta">
                <span className="step-status-badge status-active">ACTIVE</span>
              </div>
            </div>
            <div className="step-content">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Final Review Checklist</label>
                  <div className="checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" /> All documents reviewed
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> Compliance verified
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> Cost analysis confirmed
                    </label>
                    <label className="checkbox-label">
                      <input type="checkbox" /> Timeline adhered
                    </label>
                  </div>
                </div>
                <div className="form-group full-width">
                  <label>Approval Confirmation</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="Confirm final approval and readiness for submission..."
                  ></textarea>
                </div>
              </div>
              <div className="step-actions">
                <button 
                  className="btn btn-assign-engineer" 
                  onClick={() => {
                    alert('Workflow completed successfully!');
                    // Reset workflow for this tender
                    setCurrentWorkflowStep(0);
                  }}
                  style={{ backgroundColor: step.color }}
                >
                  Complete Final Step
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="step-card">
            <div className="step-header">
              <h3>{step.title}</h3>
              <span className="step-status-badge status-active">ACTIVE</span>
            </div>
            <p className="step-description">{step.description}</p>
            <div className="step-content">
              <p>Step content will be displayed here.</p>
            </div>
          </div>
        );
    }
  };

  /* ---------------- MAIN RENDER ---------------- */
  return (
    <div className="accepted-tenders-container-enhanced">
      <div className="page-header">
        <h1>{effectiveSelectedTender ? 'Tender Progress' : 'Accepted Tenders'}</h1>
        <p>
          {effectiveSelectedTender
            ? 'Track tender progress'
            : 'Manage all accepted tenders'}
        </p>
      </div>

      {!effectiveSelectedTender ? renderTenderList() : renderProgressDashboard()}

      {/* NOTIFICATIONS */}
      <div className="notifications-panel">
        <h3>Notifications</h3>
        <button onClick={onMarkAllRead}>Mark all read</button>

        {notifications.map(n => (
          <div key={n.id} className={`notification ${n.read ? '' : 'unread'}`}>
            <strong>{n.title}</strong>
            <p>{n.message}</p>
            <button onClick={() => onDismissNotification(n.id)}>✕</button>
          </div>
        ))}
      </div>


    </div>
  );
};

export default AcceptedTenders;
