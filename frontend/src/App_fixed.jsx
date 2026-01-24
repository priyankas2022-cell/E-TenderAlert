import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  // Sample tender data
  const tenderData = [
    {
      id: 1,
      title: "Solar Power Plant Installation - 50MW",
      department: "Ministry of New and Renewable Energy",
      location: "Rajasthan",
      amount: "₹45.2 Crores",
      deadline: "2023-12-15",
      category: "solar power plant",
      status: "accepted",
      source: "https://etender.gov.in",
      engineer: "Rajesh Kumar",
      currentStep: 3,
      documents: {}
    },
    {
      id: 2,
      title: "Street Light Installation - Smart City Project",
      department: "Urban Development Department",
      location: "Maharashtra",
      amount: "₹12.7 Crores",
      deadline: "2023-11-30",
      category: "street light",
      status: "accepted",
      source: "https://mahatenders.gov.in",
      engineer: "Priya Sharma",
      currentStep: 5,
      documents: {}
    },
    {
      id: 3,
      title: "EV Charging Station Infrastructure",
      department: "Ministry of Heavy Industries",
      location: "Delhi",
      amount: "₹8.9 Crores",
      deadline: "2023-12-10",
      category: "ev charger",
      status: "trending",
      source: "https://etender.gov.in",
      documents: {}
    },
    {
      id: 4,
      title: "BESS Implementation for Grid Stability",
      department: "Power Grid Corporation of India",
      location: "Karnataka",
      amount: "₹32.5 Crores",
      deadline: "2024-01-15",
      category: "bess",
      status: "hot",
      source: "https://pgcil.in",
      documents: {}
    },
    {
      id: 5,
      title: "Solar Pumping System for Agriculture",
      department: "Department of Agriculture",
      location: "Uttar Pradesh",
      amount: "₹15.3 Crores",
      deadline: "2023-12-05",
      category: "pump solarization",
      status: "hot",
      source: "https://upetender.gov.in",
      documents: {}
    },
    {
      id: 6,
      title: "Drone Surveillance for Infrastructure Projects",
      department: "Ministry of Civil Aviation",
      location: "Gujarat",
      amount: "₹5.7 Crores",
      deadline: "2023-11-25",
      category: "drone",
      status: "warm",
      source: "https://gujarattenders.gov.in",
      documents: {}
    }
  ];

  // Tender workflow steps with document upload capability
  const tenderSteps = [
    {
      id: 1,
      title: "Assign Bidding Engineer",
      description: "Assign a qualified engineer to manage the bidding process",
      icon: "fas fa-user-tie",
      documents: []
    },
    {
      id: 2,
      title: "Tender Reading & Technical Bid Sheet Preparation",
      description: "Analyze tender requirements and prepare technical documentation",
      icon: "fas fa-file-contract",
      documents: []
    },
    {
      id: 3,
      title: "EMD, Tender Fee, Processing Fee Request",
      description: "Request necessary fees and deposits for participation",
      icon: "fas fa-rupee-sign",
      documents: []
    },
    {
      id: 4,
      title: "Costing Request to Costing Engineers",
      description: "Obtain detailed cost estimates from costing team",
      icon: "fas fa-calculator",
      documents: []
    },
    {
      id: 5,
      title: "Portal Registration",
      description: "Register on the official tender portal for submission",
      icon: "fas fa-laptop",
      documents: []
    },
    {
      id: 6,
      title: "Documentation as per Tender Requirements",
      description: "Prepare all required documents as per tender guidelines",
      icon: "fas fa-file-alt",
      documents: []
    },
    {
      id: 7,
      title: "Tender Fee, Processing Fee & EMD Payment",
      description: "Complete payment of all required fees and deposits",
      icon: "fas fa-credit-card",
      documents: []
    },
    {
      id: 8,
      title: "Bidding in the Portal",
      description: "Submit the final bid through the official portal",
      icon: "fas fa-gavel",
      documents: []
    }
  ];

  // Sample notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      tenderId: 1,
      title: "Action Required",
      message: "Please complete the EMD payment for Solar Power Plant tender",
      type: "warning",
      icon: "fas fa-exclamation-triangle",
      read: false
    },
    {
      id: 2,
      tenderId: 1,
      title: "Deadline Reminder",
      message: "Tender submission deadline is in 3 days",
      type: "info",
      icon: "fas fa-clock",
      read: false
    },
    {
      id: 3,
      tenderId: 2,
      title: "Document Submission",
      message: "Technical documents required for Street Light project",
      type: "info",
      icon: "fas fa-file-alt",
      read: false
    }
  ]);

  const [tenders, setTenders] = useState(tenderData);
  const [filter, setFilter] = useState('all');
  const [botOpen, setBotOpen] = useState(false);
  const [botMessages, setBotMessages] = useState([
    { text: "Hello! I'm your Tender Assistant. What's your name?", isUser: false, id: 1 }
  ]);
  const [botInput, setBotInput] = useState('');
  const [userName, setUserName] = useState('');
  const [askForName, setAskForName] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', rememberMe: false });
  const [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [addLeadForm, setAddLeadForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    tender: '',
    notes: ''
  });
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLoginError, setShowLoginError] = useState(false);
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const [showRegisterError, setShowRegisterError] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    login: false,
    register: false,
    confirm: false
  });
  const [selectedTender, setSelectedTender] = useState(null);

  const botMessagesRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  // Bot responses
  const botResponses = {
    "hello": `Hello ${userName}! How can I assist you with tender management today?`,
    "hi": `Hi there ${userName}! I'm your Tender Assistant. What can I help you with?`,
    "help": `I can help you with: 1) Finding relevant tenders 2) Tracking tender progress 3) Setting up alerts 4) Answering questions about the platform`,
    "tenders": `I can help you find tenders based on your keywords. What type of tender are you looking for?`,
    "solar": `Here are the latest solar tenders: 1) 50MW Solar Plant in Rajasthan 2) Rooftop Solar Installation in Gujarat 3) Solar Pumping System in UP`,
    "progress": `To check tender progress, go to the 'Accepted Tenders' section. You can see detailed status for each project.`,
    "deadline": `You can view upcoming deadlines in the notifications panel. Would you like me to set a reminder for any specific tender?`,
    "notification": `You can configure notifications in Settings. We support email, WhatsApp, and Telegram alerts.`,
    "thanks": `You're welcome ${userName}! Is there anything else I can help you with?`,
    "bye": `Goodbye ${userName}! Feel free to reach out if you need any assistance with your tenders.`
  };

  // Filter tenders by status
  const filterTenders = (status) => {
    if (status === 'all') {
      return tenderData;
    }
    return tenderData.filter(tender => tender.status === status);
  };

  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setTenders(filterTenders(newFilter));
  };

  // Handle accept tender
  const handleAcceptTender = (id) => {
    setTenders(prevTenders =>
      prevTenders.map(tender =>
        tender.id === id
          ? { ...tender, status: 'accepted', engineer: 'Assigned Engineer', currentStep: 0 }
          : tender
      )
    );
    alert(`Tender ${id} accepted! It will now appear in your Accepted Tenders dashboard.`);
  };

  // Handle reject tender
  const handleRejectTender = (id) => {
    setTenders(tenders.filter(tender => tender.id !== id));
  };

  // Speak text using Web Speech API
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
      };

      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle bot message send
  const handleBotSend = () => {
    if (!botInput.trim()) return;

    // Add user message
    const newUserMessage = { text: botInput, isUser: true, id: Date.now() };
    setBotMessages(prev => [...prev, newUserMessage]);

    // Process based on conversation state
    if (askForName) {
      // First message is the user's name
      const name = botInput.trim();
      setUserName(name);
      setAskForName(false);

      // Add personalized greeting
      const greetingText = `Nice to meet you, ${name}! I'm here to help you with tender management. How can I assist you today?`;
      setTimeout(() => {
        const greetingMessage = {
          text: greetingText,
          isUser: false,
          id: Date.now() + 1
        };
        setBotMessages(prev => [...prev, greetingMessage]);
        speakText(greetingText);
      }, 1000);
    } else {
      // Find bot response
      let response = `I'm not sure I understand, ${userName}. Can you please rephrase your question?`;
      for (const [key, value] of Object.entries(botResponses)) {
        if (botInput.toLowerCase().includes(key)) {
          response = value;
          break;
        }
      }

      // Add bot response after a delay
      setTimeout(() => {
        const botResponse = {
          text: response,
          isUser: false,
          id: Date.now() + 1
        };
        setBotMessages(prev => [...prev, botResponse]);
        speakText(response);
      }, 1000);
    }

    setBotInput('');
  };

  // Handle bot input key press
  const handleBotKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleBotSend();
    }
  };

  // Handle contact icons
  const handleWhatsAppClick = () => {
    const phoneNumber = "7381965865";
    const message = "Hello! I'm interested in learning more about e-TenderAlert services.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleTelegramClick = () => {
    const username = "6811428357";
    const url = `https://t.me/${username}`;
    window.open(url, '_blank');
  };

  const handleGmailClick = () => {
    const email = "nayakmiku07@gmail.com";
    const subject = "Inquiry about e-TenderAlert Services";
    const body = "Hello, I would like to know more about your tender management services.";
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, '_blank');
  };

  // Handle login form change
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle register form change
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle add lead form change
  const handleAddLeadChange = (e) => {
    const { name, value } = e.target;
    setAddLeadForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle login form submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    // Hide any previous messages
    setShowLoginSuccess(false);
    setShowLoginError(false);

    const { email, password } = loginForm;

    // Basic validation
    if (!email || !password) {
      setShowLoginError(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setShowLoginError(true);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, accept any non-empty password
      if (password.length > 0) {
        setShowLoginSuccess(true);

        // Reset form
        setLoginForm({ email: '', password: '', rememberMe: false });

        // Close modal after success
        setTimeout(() => {
          setLoginModalOpen(false);
          setShowLoginSuccess(false);
          alert('Welcome back to e-TenderAlert!');
        }, 1500);
      } else {
        setShowLoginError(true);
      }
    }, 1000);
  };

  // Handle register form submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Hide any previous messages
    setShowRegisterSuccess(false);
    setShowRegisterError(false);

    const { firstName, lastName, email, password, confirmPassword, agreeTerms } = registerForm;

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setShowRegisterError(true);
      return;
    }

    if (!agreeTerms) {
      setShowRegisterError(true);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setShowRegisterError(true);
      return;
    }

    // Password validation
    if (password.length < 8) {
      setShowRegisterError(true);
      return;
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      setShowRegisterError(true);
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      setShowRegisterError(true);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setShowRegisterSuccess(true);

      // Reset form
      setRegisterForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false
      });

      // Close modal after success
      setTimeout(() => {
        setRegisterModalOpen(false);
        setShowRegisterSuccess(false);
        alert('Registration successful! Welcome to e-TenderAlert.');
      }, 1500);
    }, 1000);
  };

  // Handle add lead form submit
  const handleAddLeadSubmit = (e) => {
    e.preventDefault();

    // In a real application, you would send this data to a server
    console.log('New lead added:', addLeadForm);

    // Show success message
    alert('Lead added successfully!');

    // Close modal
    setAddLeadModalOpen(false);

    // Reset form
    setAddLeadForm({
      name: '',
      company: '',
      email: '',
      phone: '',
      tender: '',
      notes: ''
    });
  };

  // Handle password visibility toggle
  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Toggle bot window
  const toggleBot = () => {
    setBotOpen(!botOpen);
  };

  // Handle stop speaking
  const handleStopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Render accepted tenders section - REMOVED
  /* const renderAcceptedTenders = () => {
    // Filter only accepted tenders
    const acceptedTenders = tenders.filter(tender => tender.status === 'accepted');

    // Render the list of accepted tenders
    const renderTenderList = () => (
      <div className="tender-grid animate__animated animate__fadeIn">
        {acceptedTenders.length === 0 ? (
          <div className="col-12 text-center text-white">
            <h3>No accepted tenders yet.</h3>
            <p>Go to the Dashboard to find and accept tenders.</p>
          </div>
        ) : (
          acceptedTenders.map(tender => (
            <div
              key={tender.id}
              className="tender-card-new"
              onClick={() => setSelectedTender(tender)}
            >
              <h3 className="tender-name-new">{tender.title}</h3>
              <div className="tender-detail-new">
                <i className="fas fa-building"></i>
                <span>{tender.department}</span>
              </div>
              <div className="tender-detail-new">
                <i className="fas fa-calendar-alt"></i>
                <span>Deadline: {tender.deadline}</span>
              </div>
              <div className="tender-detail-new">
                <i className="fas fa-user-tie"></i>
                <span>Engineer: {tender.engineer || 'Not Assigned'}</span>
              </div>
              <div className={`tender-status-new status-active`}>In Progress</div>
            </div>
          ))
        )}
      </div>
    );

    // Render the progress dashboard for a selected tender
    const renderProgressDashboard = () => {
      if (!selectedTender) return null;

      return (
        <div className="progress-dashboard-new animate__animated animate__fadeIn">
          <div className="progress-header-new">
            <h2 className="tender-title-new">{selectedTender.title}</h2>
            <button className="back-button-new" onClick={() => setSelectedTender(null)}>
              <i className="fas fa-arrow-left"></i>
              Back to Tenders
            </button>
          </div>

          <div className="progress-steps-new">
            {tenderSteps.map((step, index) => {
              // Determine step status based on currentStep index
              // If index < currentStep -> completed
              // If index === currentStep -> current
              // If index > currentStep -> upcoming
              let statusClass = 'upcoming';
              let iconClass = 'upcoming';

              if (index < selectedTender.currentStep) {
                statusClass = 'completed';
                iconClass = 'completed';
              } else if (index === selectedTender.currentStep) {
                statusClass = 'current';
                iconClass = 'current';
              }

              const stepDocuments = selectedTender.documents && selectedTender.documents[step.id] ? selectedTender.documents[step.id] : [];

              return (
                <div key={step.id} className={`progress-step-new ${statusClass}`}>
                  <div className={`step-icon-new ${iconClass}`}>
                    {statusClass === 'completed' ? <i className="fas fa-check"></i> : <i className={step.icon}></i>}
                  </div>
                  <div className="step-content-new">
                    <h3 className="step-title-new">{step.title}</h3>
                    <p className="step-description-new">{step.description}</p>

                    {/* Document Upload Section */}
                    <div className="upload-section-new">
                      {(statusClass === 'current' || statusClass === 'completed') && (
                        <>
                          <div className="uploaded-files-new">
                            {stepDocuments.map(doc => (
                              <div key={doc.id} className="file-item-new">
                                <i className="fas fa-file-alt"></i>
                                <span className="file-name-new">{doc.name}</span>
                                <div className="file-actions-new">
                                  <i className="fas fa-eye file-action-new" title="View"></i>
                                  <i
                                    className="fas fa-times file-action-new"
                                    title="Remove"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleRemoveDocument(selectedTender.id, step.id, doc.id);
                                    }}
                                  ></i>
                                </div>
                              </div>
                            ))}
                          </div>

                          <label className="upload-area-new">
                            <input
                              type="file"
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) => handleDocumentUpload(selectedTender.id, step.id, e)}
                            />
                            <i className="fas fa-cloud-upload-alt"></i>
                            <p className="upload-text-new">Click to upload documents</p>
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div className="accepted-tenders-container">
        <header className="accepted-header">
          <div className="logo-new">
            <i className="fas fa-file-contract"></i>
            <h1>e-Tender Management</h1>
          </div>
        </header>

        <h1 className="page-title-new">
          {selectedTender ? 'Tender Progress' : 'Accepted Tenders'}
        </h1>

        {!selectedTender ? renderTenderList() : renderProgressDashboard()}

        {/* Notifications Panel */}
        <div className="notifications-panel-new">
          <div className="notifications-header-new">
            <h3 className="notifications-title-new">Recent Notifications</h3>
            <button className="mark-all-read-new" onClick={handleMarkAllRead}>Mark All as Read</button>
          </div>
          <div className="notification-list-new">
            {notifications.map(notification => (
              <div key={notification.id} className={`notification-item-new ${notification.read ? '' : 'unread'}`}>
                <div className={`notification-icon-new ${notification.type}`}>
                  <i className={notification.icon}></i>
                </div>
                <div className="notification-content-new">
                  <h4 className="notification-title-new">{notification.title}</h4>
                  <p>{notification.message}</p>
                  <span className="notification-time-new">Just now</span>
                </div>
                <div className="notification-actions-new">
                  <i
                    className="fas fa-times notification-action-new"
                    onClick={() => dismissNotification(notification.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }; */

  // Dismiss notification
  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Mark all notifications as read
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Counter animation effect
  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.counter');
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (!isNaN(target)) {
          const increment = target / 100;
          let current = 0;

          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.innerText = Math.ceil(current);
              setTimeout(updateCounter, 20);
            } else {
              counter.innerText = target;
            }
          };

          updateCounter();
        }
      });
    };

    // Animate counters when component mounts
    animateCounters();
  }, []);

  // Scroll to bottom of bot messages when new messages are added
  useEffect(() => {
    if (botMessagesRef.current) {
      botMessagesRef.current.scrollTop = botMessagesRef.current.scrollHeight;
    }
  }, [botMessages]);

  // Handle document upload for a specific step
  const handleDocumentUpload = (tenderId, stepId, event) => {
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      setTenders(prevTenders =>
        prevTenders.map(tender => {
          if (tender.id === tenderId) {
            const updatedDocuments = { ...tender.documents };
            if (!updatedDocuments[stepId]) {
              updatedDocuments[stepId] = [];
            }
            const newDocuments = files.map(file => ({
              id: Date.now() + Math.random(),
              name: file.name,
              size: file.size,
              type: file.type,
              uploadedAt: new Date().toISOString()
            }));
            updatedDocuments[stepId] = [...updatedDocuments[stepId], ...newDocuments];
            return { ...tender, documents: updatedDocuments };
          }
          return tender;
        })
      );
    }
  };

  // Handle document removal
  const handleRemoveDocument = (tenderId, stepId, documentId) => {
    setTenders(prevTenders =>
      prevTenders.map(tender => {
        if (tender.id === tenderId) {
          const updatedDocuments = { ...tender.documents };
          if (updatedDocuments[stepId]) {
            updatedDocuments[stepId] = updatedDocuments[stepId].filter(doc => doc.id !== documentId);
          }
          return { ...tender, documents: updatedDocuments };
        }
        return tender;
      })
    );
  };

  return (
    <>
      {/* Header */}
      <header>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              <i className="fas fa-bullhorn"></i> e-TenderAlert
            </a>

            <div className="d-flex align-items-center">
              {/* Telecaller Icon in Navbar */}
              <div className="telecaller-nav-icon" onClick={() => document.getElementById('telecaller').scrollIntoView({ behavior: 'smooth' })}>
                <i className="fas fa-headset"></i>
                <span>Telecaller</span>
              </div>

              <div className="notification-bell me-3">
                <i className="fas fa-bell fa-lg text-dark"></i>
                <span className="badge">3</span>
              </div>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active" href="#dashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#accepted">Accepted Tenders</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#telecaller">Telecaller</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#stats">Statistics</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); setLoginModalOpen(true); }}>Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); setRegisterModalOpen(true); }}>Register</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="floating-elements">
          <div className="floating-element" style={{ width: '80px', height: '80px', top: '10%', left: '5%' }}></div>
          <div className="floating-element" style={{ width: '60px', height: '60px', top: '70%', left: '10%' }}></div>
          <div className="floating-element" style={{ width: '100px', height: '100px', top: '20%', left: '80%' }}></div>
          <div className="floating-element" style={{ width: '50px', height: '50px', top: '80%', left: '85%' }}></div>
          <div className="floating-element" style={{ width: '70px', height: '70px', top: '60%', left: '70%' }}></div>
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 hero-content">
              <h1 className="animate__animated animate__fadeInUp">Smart Tender Management Solution</h1>
              <p className="animate__animated animate__fadeInUp animate__delay-1s">Get real-time tender alerts based on your business keywords. Track, manage, and win more contracts with our intelligent platform.</p>
              <button className="btn btn-hero animate__animated animate__fadeInUp animate__delay-2s" onClick={() => setRegisterModalOpen(true)}>Get Started</button>
            </div>
            <div className="col-lg-6 animate__animated animate__fadeInRight animate__delay-1s">
              <div className="text-center">
                <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_ikvz7qhc.json" background="transparent" speed="1" style={{ width: '100%', height: '400px' }} loop autoplay></lottie-player>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="stats">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="stat-card animate__animated animate__fadeInUp">
                <i className="fas fa-file-contract"></i>
                <h3 className="counter" data-target="1247">1,247</h3>
                <p>Active Tenders</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="stat-card animate__animated animate__fadeInUp animate__delay-1s">
                <i className="fas fa-check-circle"></i>
                <h3 className="counter" data-target="342">342</h3>
                <p>Tenders Won</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="stat-card animate__animated animate__fadeInUp animate__delay-2s">
                <i className="fas fa-chart-line"></i>
                <h3 className="counter" data-target="98">98%</h3>
                <p>Success Rate</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="stat-card animate__animated animate__fadeInUp animate__delay-3s">
                <i className="fas fa-clock"></i>
                <h3 className="counter" data-target="24">24</h3>
                <p>Hours Saved/Month</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section id="dashboard" className="dashboard">
        <div className="container">
          <div className="section-title">
            <h2>Tender Dashboard</h2>
            <p>Discover relevant tenders based on your business keywords</p>
          </div>

          {/* Dashboard Stats */}
          <div className="dashboard-stats">
            <div className="stat-item animate__animated animate__fadeInUp">
              <div className="stat-icon">
                <i className="fas fa-file-contract"></i>
              </div>
              <div className="stat-value">1,247</div>
              <div className="stat-label">Active Tenders</div>
            </div>
            <div className="stat-item animate__animated animate__fadeInUp animate__delay-1s">
              <div className="stat-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-value">342</div>
              <div className="stat-label">Tenders Won</div>
            </div>
            <div className="stat-item animate__animated animate__fadeInUp animate__delay-2s">
              <div className="stat-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-value">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
            <div className="stat-item animate__animated animate__fadeInUp animate__delay-3s">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-value">24</div>
              <div className="stat-label">Hours Saved/Month</div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <div className="search-container animate__animated animate__fadeInUp">
            <div className="row">
              <div className="col-md-8">
                <div className="input-group">
                  <input type="text" className="form-control search-input" placeholder="Search tenders by keyword, department, or location..." />
                  <button className="btn search-btn" type="button"><i className="fas fa-search"></i> Search</button>
                </div>
              </div>
              <div className="col-md-4">
                <div className="filter-buttons">
                  <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>All</button>
                  <button className={`filter-btn ${filter === 'trending' ? 'active' : ''}`} onClick={() => handleFilterChange('trending')}>Trending</button>
                  <button className={`filter-btn ${filter === 'hot' ? 'active' : ''}`} onClick={() => handleFilterChange('hot')}>Hot</button>
                  <button className={`filter-btn ${filter === 'warm' ? 'active' : ''}`} onClick={() => handleFilterChange('warm')}>Warm</button>
                  <button className={`filter-btn ${filter === 'accepted' ? 'active' : ''}`} onClick={() => handleFilterChange('accepted')}>Accepted</button>
                </div>
              </div>
            </div>
          </div>

          {/* Tender Cards */}
          <div className="row" id="tender-container">
            {tenders.map(tender => (
              <div key={tender.id} className={`col-lg-6 mb-4 tender-card ${tender.status} animate__animated animate__fadeInUp`}>
                <div className="tender-header">
                  <div>
                    <div className="tender-title">{tender.title}</div>
                    <div className="tender-department">{tender.department}</div>
                  </div>
                  <span className={`tender-status status-${tender.status}`}>{tender.status}</span>
                </div>
                <div className="tender-body">
                  <div className="tender-details">
                    <div className="tender-detail">
                      <i className="fas fa-map-marker-alt"></i> {tender.location}
                    </div>
                    <div className="tender-detail">
                      <i className="fas fa-rupee-sign"></i> {tender.amount}
                    </div>
                    <div className="tender-detail">
                      <i className="fas fa-calendar-alt"></i> Deadline: {tender.deadline}
                    </div>
                    <div className="tender-detail">
                      <i className="fas fa-tag"></i> {tender.category}
                    </div>
                  </div>
                  <div className="tender-actions">
                    <a href={tender.source} target="_blank" className="btn btn-outline-primary">
                      <i className="fas fa-external-link-alt me-2"></i> Source
                    </a>
                    <div className="d-flex">
                      <button className="btn btn-accept me-2" onClick={() => handleAcceptTender(tender.id)}>
                        <i className="fas fa-check me-2"></i> Accept
                      </button>
                      <button className="btn btn-reject" onClick={() => handleRejectTender(tender.id)}>
                        <i className="fas fa-times me-2"></i> Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Telecaller Dashboard */}
      <section id="telecaller" className="dashboard">
        <div className="container">
          <div className="section-title">
            <h2>Telecaller Dashboard</h2>
            <p>Manage leads and follow-ups for tender opportunities</p>
          </div>

          <div className="telecaller-dashboard animate__animated animate__fadeInUp">
            <div className="telecaller-header">
              <div className="telecaller-title">
                <i className="fas fa-headset"></i> Lead Management
              </div>
              <button className="btn btn-primary" onClick={() => setAddLeadModalOpen(true)}>
                <i className="fas fa-plus me-2"></i> Add New Lead
              </button>
            </div>

            <div className="telecaller-stats">
              <div className="telecaller-stat">
                <i className="fas fa-user-friends"></i>
                <h4 className="counter" data-target="47">47</h4>
                <p>Total Leads</p>
              </div>
              <div className="telecaller-stat">
                <i className="fas fa-phone-alt"></i>
                <h4 className="counter" data-target="23">23</h4>
                <p>Calls Today</p>
              </div>
              <div className="telecaller-stat">
                <i className="fas fa-calendar-check"></i>
                <h4 className="counter" data-target="12">12</h4>
                <p>Follow-ups</p>
              </div>
              <div className="telecaller-stat">
                <i className="fas fa-chart-pie"></i>
                <h4 className="counter" data-target="68">68%</h4>
                <p>Success Rate %</p>
              </div>
            </div>

            <h5 className="mt-4 mb-3">Recent Leads</h5>
            <div className="telecaller-leads">
              <div className="lead-item">
                <div className="lead-info">
                  <h6>Rajesh Kumar - Solar Solutions Inc.</h6>
                  <p>Interested in 50MW solar plant tender | Last contact: 2 days ago</p>
                </div>
                <div className="lead-actions">
                  <button className="btn btn-call">
                    <i className="fas fa-phone"></i>
                  </button>
                  <button className="btn btn-remind">
                    <i className="fas fa-bell"></i>
                  </button>
                </div>
              </div>
              <div className="lead-item">
                <div className="lead-info">
                  <h6>Priya Sharma - Green Energy Corp</h6>
                  <p>Following up on street light project | Last contact: 1 day ago</p>
                </div>
                <div className="lead-actions">
                  <button className="btn btn-call">
                    <i className="fas fa-phone"></i>
                  </button>
                  <button className="btn btn-remind">
                    <i className="fas fa-bell"></i>
                  </button>
                </div>
              </div>
              <div className="lead-item">
                <div className="lead-info">
                  <h6>Vikram Singh - EV Innovations Ltd</h6>
                  <p>Discussing EV charging station requirements | Last contact: 3 hours ago</p>
                </div>
                <div className="lead-actions">
                  <button className="btn btn-call">
                    <i className="fas fa-phone"></i>
                  </button>
                  <button className="btn btn-remind">
                    <i className="fas fa-bell"></i>
                  </button>
                </div>
              </div>
              <div className="lead-item">
                <div className="lead-info">
                  <h6>Anita Desai - Power Grid Solutions</h6>
                  <p>BESS implementation query | Last contact: 1 week ago</p>
                </div>
                <div className="lead-actions">
                  <button className="btn btn-call">
                    <i className="fas fa-phone"></i>
                  </button>
                  <button className="btn btn-remind">
                    <i className="fas fa-bell"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accepted Tenders Section */}
      {/* Accepted Tenders Section - REMOVED */}
      {/* <section id="accepted" className="dashboard" style={{ padding: 0, background: 'transparent' }}>
        {renderAcceptedTenders()}
      </section> */

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 footer-links mb-4">
              <h5>About e-TenderAlert</h5>
              <p>A smart tender management platform that helps businesses discover, track, and manage tenders efficiently.</p>
              <div className="social-links mt-3">
                <a href="#"><i className="fab fa-facebook-f"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 footer-links mb-4">
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#dashboard"><i className="fas fa-chevron-right"></i> Dashboard</a></li>
                <li><a href="#accepted"><i className="fas fa-chevron-right"></i> Accepted Tenders</a></li>
                <li><a href="#telecaller"><i className="fas fa-chevron-right"></i> Telecaller</a></li>
                <li><a href="#"><i className="fas fa-chevron-right"></i> Pricing</a></li>
                <li><a href="#"><i className="fas fa-chevron-right"></i> Contact Us</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links mb-4">
              <h5>Our Services</h5>
              <ul>
                <li><a href="#"><i className="fas fa-chevron-right"></i> Tender Discovery</a></li>
                <li><a href="#"><i className="fas fa-chevron-right"></i> Tender Tracking</a></li>
                <li><a href="#"><i className="fas fa-chevron-right"></i> Progress Monitoring</a></li>
                <li><a href="#"><i className="fas fa-chevron-right"></i> Automated Notifications</a></li>
                <li><a href="#"><i className="fas fa-chevron-right"></i> Analytics & Reports</a></li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links mb-4">
              <h5>Contact Info</h5>
              <ul>
                <li><a href="#"><i className="fas fa-map-marker-alt"></i> Mumbai, India</a></li>
                <li><a href="#"><i className="fas fa-phone"></i> +91 7381965865</a></li>
                <li><a href="#"><i className="fas fa-envelope"></i> nayakmiku07@gmail.com</a></li>
                <li><a href="#"><i className="fab fa-whatsapp"></i> +91 7381965865</a></li>
                <li><a href="#"><i className="fab fa-telegram"></i> +91 6811428357</a></li>
              </ul>
            </div>
          </div>
          <div className="copyright">
            <p>&copy; 2023 e-TenderAlert. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Icons */}
      <div className="contact-icons">
        <div className="contact-icon whatsapp-icon" onClick={handleWhatsAppClick}>
          <i className="fab fa-whatsapp"></i>
          <div className="contact-tooltip">Chat on WhatsApp</div>
        </div>
        <div className="contact-icon telegram-icon" onClick={handleTelegramClick}>
          <i className="fab fa-telegram"></i>
          <div className="contact-tooltip">Message on Telegram</div>
        </div>
        <div className="contact-icon gmail-icon" onClick={handleGmailClick}>
          <i className="fas fa-envelope"></i>
          <div className="contact-tooltip">Send an Email</div>
        </div>
      </div>

      {/* AI Bot Interface */}
      <div className="bot-container">
        <div className="bot-button" onClick={toggleBot}>
          <i className={`fas ${isSpeaking ? 'fa-volume-up' : 'fa-female'}`}></i>
        </div>
        {botOpen && (
          <div className="bot-window">
            <div className="bot-header">
              <div className="bot-title">
                <i className="fas fa-female"></i> Tender Assistant
              </div>
              <button className="bot-close" onClick={() => setBotOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="bot-messages" ref={botMessagesRef}>
              {botMessages.map((message) => (
                <div key={message.id} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <div className="bot-input">
              <input
                type="text"
                value={botInput}
                onChange={(e) => setBotInput(e.target.value)}
                onKeyPress={handleBotKeyPress}
                placeholder={askForName ? "Please enter your name..." : "Type your message..."}
              />
              <button onClick={handleBotSend}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            {isSpeaking && (
              <div className="bot-speaking-indicator">
                <button className="stop-speaking-btn" onClick={handleStopSpeaking}>
                  <i className="fas fa-stop"></i> Stop Speaking
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Login Modal */}
      {loginModalOpen && (
        <div className="modal fade show auth-modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="floating-shapes">
                <div className="floating-shape" style={{ width: '100px', height: '100px', top: '10%', left: '5%' }}></div>
                <div className="floating-shape" style={{ width: '60px', height: '60px', top: '70%', left: '10%' }}></div>
                <div className="floating-shape" style={{ width: '80px', height: '80px', top: '20%', left: '80%' }}></div>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">
                  <i className="fas fa-sign-in-alt"></i> Login to Your Account
                </h5>
                <button type="button" className="btn-close-custom" onClick={() => setLoginModalOpen(false)} aria-label="Close">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-icon-header text-center">
                <i className="fas fa-user-lock fa-3x"></i>
              </div>
              <div className="modal-body">
                {showLoginSuccess && (
                  <div className="alert-message alert-success" style={{ display: 'block' }}>
                    <i className="fas fa-check-circle me-2"></i> Login successful! Redirecting...
                  </div>
                )}
                {showLoginError && (
                  <div className="alert-message alert-error" style={{ display: 'block' }}>
                    <i className="fas fa-exclamation-circle me-2"></i> Invalid email or password. Please try again.
                  </div>
                )}
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-4">
                    <label htmlFor="loginEmail" className="form-label">
                      <i className="fas fa-envelope"></i> Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="loginPassword" className="form-label">
                      <i className="fas fa-lock"></i> Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={passwordVisibility.login ? "text" : "password"}
                        className="form-control"
                        id="loginPassword"
                        name="password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility('login')}
                      >
                        <i className={`fas ${passwordVisibility.login ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="mb-4 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={loginForm.rememberMe}
                        onChange={handleLoginChange}
                      />
                      <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <a href="#" className="text-decoration-none" style={{ color: 'var(--secondary)' }}>Forgot Password?</a>
                  </div>
                  <button type="submit" className="btn btn-auth">
                    <i className="fas fa-sign-in-alt me-2"></i> Login
                  </button>

                  <div className="auth-divider">
                    <span>Or continue with</span>
                  </div>

                  <button type="button" className="btn btn-google">
                    <i className="fab fa-google"></i> Sign in with Google
                  </button>
                </form>
                <div className="auth-switch">
                  Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setLoginModalOpen(false); setRegisterModalOpen(true); }}>Register here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {registerModalOpen && (
        <div className="modal fade show auth-modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="floating-shapes">
                <div className="floating-shape" style={{ width: '80px', height: '80px', top: '15%', left: '8%' }}></div>
                <div className="floating-shape" style={{ width: '100px', height: '100px', top: '65%', left: '12%' }}></div>
                <div className="floating-shape" style={{ width: '70px', height: '70px', top: '25%', left: '85%' }}></div>
              </div>
              <div className="modal-header">
                <h5 className="modal-title" id="registerModalLabel">
                  <i className="fas fa-user-plus"></i> Create New Account
                </h5>
                <button type="button" className="btn-close-custom" onClick={() => setRegisterModalOpen(false)} aria-label="Close">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-icon-header text-center">
                <i className="fas fa-user-plus fa-3x"></i>
              </div>
              <div className="modal-body">
                {showRegisterSuccess && (
                  <div className="alert-message alert-success" style={{ display: 'block' }}>
                    <i className="fas fa-check-circle me-2"></i> Registration successful! You can now login.
                  </div>
                )}
                {showRegisterError && (
                  <div className="alert-message alert-error" style={{ display: 'block' }}>
                    <i className="fas fa-exclamation-circle me-2"></i> Please fix the errors below and try again.
                  </div>
                )}
                <form onSubmit={handleRegisterSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <label htmlFor="firstName" className="form-label">
                        <i className="fas fa-user"></i> First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={registerForm.firstName}
                        onChange={handleRegisterChange}
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="lastName" className="form-label">
                        <i className="fas fa-user"></i> Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={registerForm.lastName}
                        onChange={handleRegisterChange}
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="registerEmail" className="form-label">
                      <i className="fas fa-envelope"></i> Email Address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="registerEmail"
                      name="email"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="registerPassword" className="form-label">
                      <i className="fas fa-lock"></i> Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={passwordVisibility.register ? "text" : "password"}
                        className="form-control"
                        id="registerPassword"
                        name="password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        placeholder="Create a password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility('register')}
                      >
                        <i className={`fas ${passwordVisibility.register ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                    <div className="form-text" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                      Password must be at least 8 characters with uppercase, lowercase, and numbers.
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="form-label">
                      <i className="fas fa-lock"></i> Confirm Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={passwordVisibility.confirm ? "text" : "password"}
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        placeholder="Confirm your password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        <i className={`fas ${passwordVisibility.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                  <div className="mb-4 form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={registerForm.agreeTerms}
                      onChange={handleRegisterChange}
                      required
                    />
                    <label className="form-check-label" htmlFor="agreeTerms">I agree to the <a href="#" style={{ color: 'var(--secondary)' }}>Terms and Conditions</a></label>
                  </div>
                  <button type="submit" className="btn btn-auth">
                    <i className="fas fa-user-plus me-2"></i> Create Account
                  </button>

                  <div className="auth-divider">
                    <span>Or sign up with</span>
                  </div>

                  <button type="button" className="btn btn-google">
                    <i className="fab fa-google"></i> Sign up with Google
                  </button>
                </form>
                <div className="auth-switch">
                  Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setRegisterModalOpen(false); setLoginModalOpen(true); }}>Login here</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {addLeadModalOpen && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} id="addLeadModal" tabIndex="-1" aria-labelledby="addLeadModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addLeadModalLabel">Add New Lead</h5>
                <button type="button" className="btn-close" onClick={() => setAddLeadModalOpen(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddLeadSubmit}>
                  <div className="mb-3">
                    <label htmlFor="leadName" className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="leadName"
                      name="name"
                      value={addLeadForm.name}
                      onChange={handleAddLeadChange}
                      placeholder="Enter lead's full name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="leadCompany" className="form-label">Company</label>
                    <input
                      type="text"
                      className="form-control"
                      id="leadCompany"
                      name="company"
                      value={addLeadForm.company}
                      onChange={handleAddLeadChange}
                      placeholder="Enter company name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="leadEmail" className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="leadEmail"
                      name="email"
                      value={addLeadForm.email}
                      onChange={handleAddLeadChange}
                      placeholder="Enter email address"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="leadPhone" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="leadPhone"
                      name="phone"
                      value={addLeadForm.phone}
                      onChange={handleAddLeadChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="leadTender" className="form-label">Interested Tender</label>
                    <select
                      className="form-control"
                      id="leadTender"
                      name="tender"
                      value={addLeadForm.tender}
                      onChange={handleAddLeadChange}
                      required
                    >
                      <option value="">Select a tender</option>
                      <option value="Solar Power Plant">Solar Power Plant</option>
                      <option value="Street Light Project">Street Light Project</option>
                      <option value="EV Charging Stations">EV Charging Stations</option>
                      <option value="BESS Implementation">BESS Implementation</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="leadNotes" className="form-label">Notes</label>
                    <textarea
                      className="form-control"
                      id="leadNotes"
                      name="notes"
                      value={addLeadForm.notes}
                      onChange={handleAddLeadChange}
                      rows="3"
                      placeholder="Add any additional notes"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-modal">Add Lead</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;