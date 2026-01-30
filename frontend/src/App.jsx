import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './enhanced-workflow.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import TelecallerDashboard from './components/TelecallerDashboard';
import Footer from './components/Footer';
import ContactIcons from './components/ContactIcons';
import TenderAssistant from './components/TenderAssistant';
import PageHeader from './components/PageHeader';
import AcceptedTendersTable from './components/AcceptedTendersTable';


function App() {
  // Sample tender data
  const tenderData = [
    {
      id: 1,
      title: "Solar Power Plant Installation - 50MW",
      department: "Ministry of New and Renewable Energy",
      location: "Odisha",
      amount: "₹45.2 Crores",
      deadline: "2023-12-15",
      category: "solar power plant",
      status: "pending",
      source: "https://tendersodisha.gov.in/nicgep/app",
      engineer: null,
      currentStep: 0,
      documents: {},
      stepData: {}
    },
    {
      id: 2,
      title: "Street Light Installation - Smart City Project",
      department: "Urban Development Department",
      location: "Maharashtra",
      amount: "₹12.7 Crores",
      deadline: "2023-11-30",
      category: "street light",
      status: "pending",
      source: "https://mahatenders.gov.in",
      engineer: null,
      currentStep: 0,
      documents: {},
      stepData: {}
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
      source: "https://govtprocurement.delhi.gov.in/nicgep/app",
      currentStep: 0,
      documents: {},
      stepData: {}
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
      source: "https://eproc.karnataka.gov.in/eprocportal/pages/index.jsp",
      currentStep: 0,
      documents: {},
      stepData: {}
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
      source: "https://etender.up.nic.in/nicgep/app",
      currentStep: 0,
      documents: {},
      stepData: {}
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
      source: "https://gil.gujarat.gov.in/eprocurement",
      currentStep: 0,
      documents: {},
      stepData: {}
    }
  ];

  // Enhanced Tender workflow steps with responsive design and engineer assignment
  const tenderSteps = [
    {
      id: 1,
      title: "Assign Bidding Engineer",
      description: "Assign a qualified engineer to manage the bidding process",
      icon: "fas fa-user-tie",
      requiresEngineer: true,
      documents: [],
      fields: [
        { name: 'engineerName', label: 'Engineer Name', type: 'text', required: true },
        { name: 'engineerEmail', label: 'Email Address', type: 'email', required: true },
        { name: 'engineerPhone', label: 'Phone Number', type: 'tel', required: true },
        { name: 'engineerTelegram', label: 'Telegram ID', type: 'text', required: false },
        { name: 'engineerSpecialization', label: 'Specialization', type: 'select', options: ['Solar', 'Construction', 'Electrical', 'Civil', 'Mechanical', 'IT', 'Telecom', 'HVAC', 'Plumbing', 'Architecture', 'Environmental', 'Chemical', 'Structural', 'Transportation', 'Water'] },
        { name: 'engineerExperience', label: 'Years of Experience', type: 'number', min: 1, max: 30 }
      ]
    },
    {
      id: 2,
      title: "Tender Reading & Technical Bid Sheet Preparation",
      description: "Analyze tender requirements and prepare technical documentation",
      icon: "fas fa-file-contract",
      requiresEngineer: false,
      documents: [],
      fields: [
        { name: 'technicalAnalysis', label: 'Technical Analysis Summary', type: 'textarea', required: true },
        { name: 'bidSheetPrepared', label: 'Bid Sheet Prepared', type: 'checkbox' },
        { name: 'complianceCheck', label: 'Compliance Checklist', type: 'checkbox' }
      ]
    },
    {
      id: 3,
      title: "EMD, Tender Fee, Processing Fee Request",
      description: "Request necessary fees and deposits for participation",
      icon: "fas fa-rupee-sign",
      requiresEngineer: false,
      documents: [],
      fields: [
        { name: 'emdAmount', label: 'EMD Amount (₹)', type: 'number', required: true },
        { name: 'tenderFee', label: 'Tender Fee (₹)', type: 'number', required: true },
        { name: 'processingFee', label: 'Processing Fee (₹)', type: 'number', required: true },
        { name: 'paymentMethod', label: 'Payment Method', type: 'select', options: ['Online', 'Bank Transfer', 'Demand Draft'] },
        { name: 'requestDate', label: 'Request Date', type: 'date', required: true }
      ]
    },
    {
      id: 4,
      title: "Costing Request to Costing Engineers",
      description: "Obtain detailed cost estimates from costing team",
      icon: "fas fa-calculator",
      requiresEngineer: false,
      documents: [],
      fields: [
        { name: 'costEstimate', label: 'Cost Estimate (₹)', type: 'number', required: true },
        { name: 'materialsList', label: 'Materials List', type: 'textarea' },
        { name: 'laborCost', label: 'Labor Cost (₹)', type: 'number' },
        { name: 'overheadCost', label: 'Overhead Cost (₹)', type: 'number' },
        { name: 'totalCost', label: 'Total Estimated Cost (₹)', type: 'number', readonly: true }
      ]
    },
    {
      id: 5,
      title: "Portal Registration",
      description: "Register on the official tender portal for submission",
      icon: "fas fa-laptop",
      requiresEngineer: false,
      documents: [],
      fields: [
        { name: 'portalUrl', label: 'Portal URL', type: 'url', required: true },
        { name: 'registrationId', label: 'Registration ID', type: 'text', required: true },
        { name: 'username', label: 'Username', type: 'text', required: true },
        { name: 'password', label: 'Password', type: 'password', required: true },
        { name: 'registrationDate', label: 'Registration Date', type: 'date', required: true }
      ]
    },
    {
      id: 6,
      title: "Documentation as per Tender Requirements",
      description: "Prepare all required documents as per tender guidelines",
      icon: "fas fa-file-alt",
      requiresEngineer: false,
      documents: [],
      fields: [
        { name: 'technicalDocs', label: 'Technical Documents', type: 'file', multiple: true },
        { name: 'financialDocs', label: 'Financial Documents', type: 'file', multiple: true },
        { name: 'legalDocs', label: 'Legal Documents', type: 'file', multiple: true },
        { name: 'qualityDocs', label: 'Quality Documents', type: 'file', multiple: true },
        { name: 'documentChecklist', label: 'Document Checklist Completed', type: 'checkbox' }
      ]
    },
    {
      id: 7,
      title: "Tender Fee, Processing Fee & EMD Payment",
      description: "Complete payment of all required fees and deposits",
      icon: "fas fa-credit-card",
      requiresEngineer: false,
      documents: [],
      fields: [
        { name: 'paymentReceipt', label: 'Payment Receipt', type: 'file', required: true },
        { name: 'transactionId', label: 'Transaction ID', type: 'text', required: true },
        { name: 'paymentDate', label: 'Payment Date', type: 'date', required: true },
        { name: 'bankName', label: 'Bank Name', type: 'text' },
        { name: 'paymentStatus', label: 'Payment Status', type: 'select', options: ['Pending', 'Completed', 'Failed'], required: true }
      ]
    },
    {
      id: 8,
      title: "Bidding in the Portal",
      description: "Submit the final bid through the official portal",
      icon: "fas fa-gavel",
      requiresEngineer: false,
      documents: [],
      fields: [
        { name: 'bidAmount', label: 'Final Bid Amount (₹)', type: 'number', required: true },
        { name: 'bidSubmissionDate', label: 'Bid Submission Date', type: 'datetime-local', required: true },
        { name: 'confirmationScreenshot', label: 'Confirmation Screenshot', type: 'file', required: true },
        { name: 'bidReferenceNumber', label: 'Bid Reference Number', type: 'text', required: true },
        { name: 'submissionRemarks', label: 'Submission Remarks', type: 'textarea' }
      ]
    }
  ];

  // Mock engineers for assignment
  const mockEngineers = [
    { id: 1, name: "Rajesh Kumar", specialization: "Solar Projects", rating: 4.8 },
    { id: 2, name: "Priya Sharma", specialization: "Infrastructure", rating: 4.9 },
    { id: 3, name: "Vikram Singh", specialization: "Energy Systems", rating: 4.7 },
    { id: 4, name: "Anita Desai", specialization: "Renewable Energy", rating: 4.6 }
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

  // Load tenders from localStorage or initialize with default data
  const [tenders, setTenders] = useState(() => {
    // Load accepted tenders from localStorage
    const savedAcceptedTenders = localStorage.getItem('acceptedTenders');
    const acceptedIds = savedAcceptedTenders ? new Set(JSON.parse(savedAcceptedTenders)) : new Set();
    
    // Update the initial tender data with accepted status if needed
    return tenderData.map(tender => {
      if (acceptedIds.has(tender.id)) {
        return {
          ...tender,
          status: 'accepted',
          originalStatus: tender.status, // Preserve original status
          acceptanceDate: new Date().toISOString().split('T')[0] // Could store the actual date if saved separately
        };
      }
      return {
        ...tender,
        originalStatus: tender.status // Store original status
      };
    });
  });
  
  const [filter, setFilter] = useState('all');
  
  // Pagination state for accepted tenders
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  // Removed workflow modal state
  const [botOpen, setBotOpen] = useState(false);
  const [botMessages, setBotMessages] = useState([
    { text: "Hello! I'm your Tender Assistant. I specialize in helping you find, track, and manage tenders efficiently. What's your name?", isUser: false, id: 1 }
  ]);
  const [botInput, setBotInput] = useState('');
  const [userName, setUserName] = useState('');
  const [askForName, setAskForName] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);


  const [addLeadModalOpen, setAddLeadModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', rememberMe: false });
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
  const [passwordVisibility, setPasswordVisibility] = useState({
    login: false,
  });


  const speechSynthesisRef = useRef(null);

  // Bot responses
  const botResponses = {
    "hello": `Hello ${userName}! I'm your Tender Assistant. I can help you find relevant tenders, track your submissions, and manage deadlines. How can I assist you today?`,
    "hi": `Hi there ${userName}! I'm your Tender Assistant. I specialize in helping you navigate the tender process efficiently. What would you like to know?`,
    "help": `I can help you with several aspects of tender management:
    
1. 🔍 **Find Tenders** - Search for tenders based on keywords, location, or category
2. 📊 **Track Progress** - Monitor the status of your submitted tenders
3. ⏰ **Upcoming Deadlines** - Get reminders for important submission dates
4. 👤 **Profile Management** - Update your company information and preferences
5. ⚙️ **Settings** - Configure notifications and communication preferences

Which area would you like assistance with?`,
    "tenders": `I can help you find tenders based on your specific needs. Please provide details such as:
- Industry sector (solar, construction, IT, etc.)
- Location preference
- Tender value range
- Submission deadlines

What type of tender are you looking for?`,
    "solar": `Here are the latest solar tenders in your area:
    
1. 🌞 **50MW Solar Plant Installation** - Rajasthan
   - Deadline: 15 Dec 2023
   - Estimated Value: ₹45.2 Crores
   - [View Details](#)

2. 🌞 **Rooftop Solar Installation** - Gujarat
   - Deadline: 30 Nov 2023
   - Estimated Value: ₹12.7 Crores
   - [View Details](#)

3. 🌞 **Solar Pumping System** - Uttar Pradesh
   - Deadline: 5 Dec 2023
   - Estimated Value: ₹15.3 Crores
   - [View Details](#)

Would you like more information about any of these tenders?`,
    "progress": `To check tender progress, go to the 'Accepted Tenders' section in your dashboard. You can see detailed status for each project including:
- Current step in the process
- Documents submitted
- Pending requirements
- Next deadlines

Would you like me to navigate you there?`,
    "deadline": `You can view upcoming deadlines in the notifications panel. I can also set personalized reminders for specific tenders. Would you like me to show you your upcoming deadlines?`,
    "notification": `You can configure notifications in Settings. We support:
- Email alerts
- WhatsApp notifications
- Telegram messages
- SMS alerts

Which communication method do you prefer?`,
    "thanks": `You're welcome ${userName}! I'm always here to help with your tender management needs. Is there anything else I can assist you with today?`,
    "bye": `Goodbye ${userName}! Feel free to reach out anytime if you need assistance with your tenders. Have a great day!`,
    "profile": `You can manage your profile by clicking on your name in the top right corner. From there, you can:
- Update company information
- Change contact details
- Set preferences
- View activity history

Would you like me to take you to your profile page?`,
    "settings": `In settings, you can customize your experience:
- Notification preferences
- Communication channels
- Language settings
- Privacy options

Would you like me to guide you through the settings?`
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
  };

  // Function to handle accepting a tender - initialize with step 1 unlocked
  const handleAcceptTender = (id) => {
    setTenders(prevTenders =>
      prevTenders.map(tender =>
        tender.id === id
          ? { 
              ...tender, 
              status: 'accepted', 
              engineer: null, 
              currentStep: 1, // Start with step 1 unlocked by default
              acceptanceDate: new Date().toISOString().split('T')[0],
              documents: tender.documents || {},
              stepData: {} // Initialize step data storage
            }
          : tender
      )
    );
    
    // Update localStorage to persist the accepted tender
    const savedAcceptedTenders = localStorage.getItem('acceptedTenders');
    let acceptedIds = savedAcceptedTenders ? new Set(JSON.parse(savedAcceptedTenders)) : new Set();
    acceptedIds.add(id);
    localStorage.setItem('acceptedTenders', JSON.stringify([...acceptedIds]));
    
    console.log(`Tender ${id} accepted! It will now appear in your Accepted Tenders dashboard.`);
  };

  // Handle reject tender
  const handleRejectTender = (id) => {
    setTenders(tenders.filter(tender => tender.id !== id));
  };

  // Function to check if a tender is completed (all 8 steps)
  const isTenderCompleted = (tender) => {
    if (!tender.stepData) return false;
    
    // Check if all 8 steps have been completed
    for (let i = 1; i <= 8; i++) {
      if (!tender.stepData[i] || !tender.stepData[i].completed) {
        return false;
      }
    }
    
    return true;
  };

  // Function to get tender progress
  const getTenderProgress = (tender) => {
    const totalSteps = 8;
    let completedSteps = 0;
    
    if (tender.stepData) {
      for (let i = 1; i <= totalSteps; i++) {
        if (tender.stepData[i] && tender.stepData[i].completed) {
          completedSteps++;
        }
      }
    }
    
    return {
      completedSteps,
      totalSteps,
      progressPercentage: totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0
    };
  };

  // Function to get current step name and status
  const getCurrentStepInfo = (tender) => {
    const currentStep = tender.currentStep || 0;
    if (currentStep === 0) {
      return { name: 'Not Started', status: 'pending' };
    }
    
    if (isTenderCompleted(tender)) {
      return { name: 'Completed', status: 'completed' };
    }
    
    if (currentStep > tenderSteps.length) {
      return { name: 'Completed', status: 'completed' };
    }
    
    const step = tenderSteps[currentStep - 1];
    return { name: step.title, status: 'in_progress' };
  };

  // Function to handle workflow (removed modal functionality)
  const handleWorkflow = (tender) => {
    // Placeholder for future workflow implementation
    console.log('Workflow functionality removed for tender:', tender.id);
  };

    // Removed engineer assignment functionality

  // Removed engineer unassignment functionality

  // Removed workflow step navigation functionality

  // Function to mark any step as completed
  const handleCompleteStep = (tenderId, stepId, stepData = {}) => {
    setTenders(prevTenders =>
      prevTenders.map(tender => {
        if (tender.id === tenderId) {
          // Update step data with completion info
          const updatedStepData = {
            ...tender.stepData,
            [stepId]: {
              ...stepData,
              completed: true,
              completedAt: new Date().toISOString()
            }
          };
          
          // Calculate next step only if current step is being completed
          const nextStep = Math.min(stepId + 1, tenderSteps.length);
          
          return {
            ...tender,
            currentStep: nextStep,
            stepData: updatedStepData
          };
        }
        return tender;
      })
    );
    
    // Update selectedTender state if this tender is currently selected
    if (selectedTender && selectedTender.id === tenderId) {
      setSelectedTender(prev => {
        const updatedStepData = {
          ...prev.stepData,
          [stepId]: {
            ...stepData,
            completed: true,
            completedAt: new Date().toISOString()
          }
        };
        
        const nextStep = Math.min(stepId + 1, tenderSteps.length);
        
        return {
          ...prev,
          currentStep: nextStep,
          stepData: updatedStepData
        };
      });
    }
  };

  // Function to remove completed tenders (but keep them visible with 'Bid Applied Successfully' status)
  const removeCompletedTenders = () => {
    // Don't remove completed tenders - they should remain visible with special status
    // This function is kept for potential future use but currently does nothing
    return;
  };

  // Pagination functions for accepted tenders
  const getAcceptedTenders = () => {
    return tenders.filter(tender => tender.status === 'accepted');
  };

  const getCurrentPageTenders = () => {
    const acceptedTenders = getAcceptedTenders();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return acceptedTenders.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    const acceptedTenders = getAcceptedTenders();
    return Math.ceil(acceptedTenders.length / itemsPerPage);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = getTotalPages();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const totalPages = getTotalPages();
    const pages = [];
    
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page, and last page with ellipsis
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push('ellipsis-start');
      }
      
      // Add pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }
      
      if (currentPage < totalPages - 2) {
        pages.push('ellipsis-end');
      }
      
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const renderPageNumbers = () => {
    const pages = getPageNumbers();
    
    return pages.map((page, index) => {
      if (page === 'ellipsis-start' || page === 'ellipsis-end') {
        return (
          <span key={`ellipsis-${index}`} className="pagination-ellipsis">
            ...
          </span>
        );
      }
      
      return (
        <button
          key={page}
          className={`pagination-page ${currentPage === page ? 'active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    });
  };

  // Responsive items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(3);
      } else if (window.innerWidth < 992) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(5);
      }
    };

    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      const greetingText = `Nice to meet you, ${name}! I'm your Tender Assistant, here to help you with tender management. How can I assist you today?`;
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
      // Show typing indicator
      setIsTyping(true);

      // Find bot response
      let response = `I'm not sure I understand, ${userName}. Can you please rephrase your question or select an option from the quick actions?`;

      // Check for specific commands
      const input = botInput.toLowerCase().trim();

      if (input.includes("find") && input.includes("tender")) {
        response = botResponses.tenders;
      } else if (input.includes("track") || input.includes("progress")) {
        response = botResponses.progress;
      } else if (input.includes("deadline") || input.includes("due")) {
        response = botResponses.deadline;
      } else if (input.includes("profile")) {
        response = botResponses.profile;
      } else if (input.includes("setting")) {
        response = botResponses.settings;
      } else if (input.includes("help")) {
        response = botResponses.help;
      } else if (input.includes("solar")) {
        response = botResponses.solar;
      } else if (input.includes("thank")) {
        response = botResponses.thanks;
      } else if (input.includes("bye") || input.includes("goodbye")) {
        response = botResponses.bye;
      } else {
        // Check for partial matches
        for (const [key, value] of Object.entries(botResponses)) {
          if (input.includes(key)) {
            response = value;
            break;
          }
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
        setIsTyping(false);
        speakText(response);
      }, 2000);
    }

    setBotInput('');
  };

  // Handle bot input key press
  const handleBotKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
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

        // Show success message
        setTimeout(() => {
          setShowLoginSuccess(false);
          alert('Welcome back to e-TenderAlert!');
        }, 1500);
      } else {
        setShowLoginError(true);
      }
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
      
      // Update selectedTender state if this tender is currently selected
      if (selectedTender && selectedTender.id === tenderId) {
        const updatedDocuments = { ...selectedTender.documents };
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
        
        setSelectedTender(prev => ({
          ...prev,
          documents: updatedDocuments
        }));
      }
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
    
    // Update selectedTender state if this tender is currently selected
    if (selectedTender && selectedTender.id === tenderId) {
      const updatedDocuments = { ...selectedTender.documents };
      if (updatedDocuments[stepId]) {
        updatedDocuments[stepId] = updatedDocuments[stepId].filter(doc => doc.id !== documentId);
      }
      
      setSelectedTender(prev => ({
        ...prev,
        documents: updatedDocuments
      }));
    }
  };

  // Dismiss notification
  const dismissNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Mark all notifications as read
  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  // Check for completed tenders and remove them periodically
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     removeCompletedTenders();
  //   }, 5000); // Check every 5 seconds
  //
  //   return () => clearInterval(interval);
  // }, [tenders]);

  return (
    <>
      <Header />
      <Hero />
      <Dashboard
        tenders={tenders}
        handleFilterChange={handleFilterChange}
        filter={filter}
        handleAcceptTender={handleAcceptTender}
        handleRejectTender={handleRejectTender}
        isTenderCompleted={isTenderCompleted}
      />
      <section id="telecaller" className="telecaller-dashboard-used">
        <TelecallerDashboard />
      </section>

      {/* Accepted Tenders Section */}
      <section id="accepted-tenders" className="dashboard" style={{ padding: 0, background: '#F8F9FA' }}>
        <PageHeader 
          title="Accepted Tenders" 
          subtitle="Here are the tenders you have successfully secured."
        />
        
        {/* Accepted Tenders Content */}
        <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            background: '#FFFFFF',
            borderRadius: '8px',
            padding: '30px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            marginBottom: '2rem'
          }}>
            <h2 style={{ 
              color: '#1F3A5F',
              marginBottom: '20px',
              fontSize: '28px'
            }}>
              Successfully Secured Tenders
            </h2>
            <p style={{ 
              color: '#5A6B7B',
              lineHeight: '1.6',
              fontSize: '16px',
              marginBottom: '30px'
            }}>
              Manage and track all your successfully secured tenders in one centralized location. 
              Monitor progress, deadlines, and documentation requirements for each awarded project.
            </p>
            
            {/* Professional Enterprise Data Table */}
            <div className="enterprise-tenders-table-container">
              <div className="table-wrapper">
                <table className="enterprise-tenders-table">
                  <thead>
                    <tr>
                      <th>Tender Title</th>
                      <th>Category</th>
                      <th>Awarded Date</th>
                      <th>Status</th>
                      <th>Progress</th>
                      <th>Contract Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Display paginated accepted tenders */}
                    {getCurrentPageTenders().map(tender => (
                      <tr key={tender.id} className="table-row">
                        <td className="tender-title-cell">
                                                  <a href={tender.source} target="_blank" rel="noopener noreferrer" className="tender-title-link">
                                                    {tender.title}
                                                  </a>
                                                </td>
                        <td className="category-cell">{tender.category || tender.department || '—'}</td>
                        <td className="awarded-date-cell">
                          {tender.acceptanceDate ? 
                            new Date(tender.acceptanceDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : 
                            (tender.deadline ? 
                              new Date(tender.deadline).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              }) : 
                              '—')
                          }
                        </td>
                        <td className="status-cell">
                          {isTenderCompleted(tender) ? (
                            <span className="status-badge completed-badge">
                              Completed
                            </span>
                          ) : (
                            <span className="status-badge approved-badge">
                              Approved
                            </span>
                          )}
                        </td>
                        <td className="progress-cell">
                          {(() => {
                            const progress = getTenderProgress(tender);
                            const stepInfo = getCurrentStepInfo(tender);
                            const isCompleted = isTenderCompleted(tender);
                            const percentage = progress.progressPercentage;
                            
                            return (
                              <div className="progress-display-responsive">
                                {/* Progress Bar Visualization */}
                                <div className="progress-bar-container">
                                  <div className="progress-bar-track">
                                    <div 
                                      className="progress-bar-fill"
                                      style={{ width: `${percentage}%` }}
                                    ></div>
                                  </div>
                                  <div className="progress-percentage">{percentage}%</div>
                                </div>
                                
                                {/* Steps Summary */}
                                <div className="steps-summary">
                                  <div className="steps-count">
                                    <strong>{progress.completedSteps}</strong>/{progress.totalSteps} steps
                                  </div>
                                  <div className="steps-completed">
                                    {progress.completedSteps} completed
                                  </div>
                                </div>
                                
                                {/* Current Status */}
                                <div className="current-step-info">
                                  <div className="step-name">{stepInfo.name}</div>
                                  <div className={`step-status-badge status-${stepInfo.status}`}>
                                    {stepInfo.status.replace('_', ' ').toUpperCase()}
                                  </div>
                                </div>
                                
                                {/* Engineer Assignment Status */}
                                <div className="engineer-status">
                                  {tender.engineer ? (
                                    <div className="assigned-engineer">
                                      <i className="fas fa-user-check"></i>
                                      <span>{tender.engineer}</span>
                                    </div>
                                  ) : (
                                    <div className="no-engineer">
                                      <i className="fas fa-user-plus"></i>
                                      <span>Assign Engineer</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                        </td>
                        <td className="contract-value-cell">
                          {tender.amount || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Responsive Professional Pagination */}
              <div className="pagination-controls">
                <button 
                  className="pagination-btn pagination-prev"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <span>&laquo; Previous</span>
                </button>
                
                <div className="pagination-pages">
                  {renderPageNumbers()}
                </div>
                
                <button 
                  className="pagination-btn pagination-next"
                  onClick={handleNextPage}
                  disabled={currentPage === getTotalPages()}
                >
                  <span>Next &raquo;</span>
                </button>
              </div>
              
              {/* Items per page info */}
              <div className="pagination-info">
                <span>
                  Showing {Math.min(getCurrentPageTenders().length, itemsPerPage)} of {getAcceptedTenders().length} accepted tenders
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
      <ContactIcons
        handleWhatsAppClick={handleWhatsAppClick}
        handleTelegramClick={handleTelegramClick}
        handleGmailClick={handleGmailClick}
      />
      <TenderAssistant
        botOpen={botOpen}
        toggleBot={toggleBot}
        botMessages={botMessages}
        botInput={botInput}
        setBotInput={setBotInput}
        handleBotSend={handleBotSend}
        handleBotKeyPress={handleBotKeyPress}
        askForName={askForName}
        isSpeaking={isSpeaking}
        isTyping={isTyping}
        handleStopSpeaking={handleStopSpeaking}
        userName={userName}
      />



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

      {/* Enhanced Workflow Modal with Responsive Design */}
      {/* Workflow modal functionality completely removed from accepted tenders */}
    </>
  );
}

export default App;