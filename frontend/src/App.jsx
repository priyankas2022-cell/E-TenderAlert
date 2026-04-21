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
import { NotificationProvider } from './context/NotificationContext';
import apiClient from './api/client';
import { FALLBACK_TENDERS } from './utils/fallbackData';



function App() {


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

  // Load tenders from API only
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real tender data from API through our backend
  const fetchTenderData = async (retryCount = 0) => {
    const maxRetries = 3;

    try {
      setLoading(true);
      setError(null);

      // Use our apiClient to fetch tenders
      const data = await apiClient.getTenders();
      console.log('API Response:', data);

      // Handle different response formats (standard REST or paginated)
      let tenderArray = [];
      if (Array.isArray(data)) {
        tenderArray = data;
      } else if (data.results && Array.isArray(data.results)) {
        tenderArray = data.results;
      } else {
        console.warn('Unexpected API response format:', data);
        tenderArray = [];
      }

      // Handle empty tender data gracefully
      if (tenderArray.length === 0) {
        console.log('No tenders available from API - showing empty state');
        setTenders([]);
        setLoading(false);
        return;
      }

      // Transform API data to match our frontend structure
      const transformedTenders = tenderArray.map((tender) => ({
        id: tender.id,
        external_id: tender.external_id,
        tender_id: tender.tender_id || tender.id,
        title: tender.title || 'Untitled Tender',
        department: tender.department || 'N/A',
        location: tender.location || 'India',
        amount: tender.estimated_value ? `₹${(tender.estimated_value / 10000000).toFixed(2)} Crores` : (tender.amount || '₹0'),
        deadline: tender.bid_deadline || tender.deadline || '2025-12-31',
        category: (tender.category || 'general').toLowerCase(),
        status: tender.status?.toLowerCase() || 'pending',
        source: tender.source_url || tender.source || '#',
        engineer: tender.assigned_engineer_name || null,
        currentStep: tender.current_step || 0,
        assignment_id: tender.workflow_id || null,
        documents: {},

        stepData: tender.step_data || {},
        completedSteps: tender.workflow_completed_steps || 0,
        totalSteps: tender.workflow_total_steps || 8,
        originalStatus: tender.status?.toLowerCase() || 'pending',
        is_deadline_approaching: tender.is_deadline_approaching,
        days_until_deadline: tender.days_until_deadline,
        temperature: tender.temperature || 'PENDING'
      }));

      // Load accepted tenders from localStorage as supplementary
      const savedAcceptedTenders = localStorage.getItem('acceptedTenders');
      const acceptedIds = savedAcceptedTenders ? new Set(JSON.parse(savedAcceptedTenders)) : new Set();

      // Final merge: Status 'accepted' from backend or local storage
      const finalTenders = transformedTenders.map(tender => {
        if (tender.status === 'accepted' || acceptedIds.has(tender.id)) {
          return {
            ...tender,
            status: 'accepted',
            acceptanceDate: tender.acceptanceDate || new Date().toISOString().split('T')[0]
          };
        }
        return tender;
      });

      console.log('Transformed tenders:', finalTenders);
      setTenders(finalTenders);
      setError(null);
    } catch (err) {
      console.error('Error fetching tender data (attempt ' + (retryCount + 1) + '):', err);

      if (err.status === 401) {
        setError('Please login to access real-time tender data.');
        setTenders(FALLBACK_TENDERS);
        return;
      }

      if (retryCount < maxRetries) {
        setTimeout(() => {
          fetchTenderData(retryCount + 1);
        }, 2 ** retryCount * 1000);
        return;
      }

      console.warn('Backend connection failed. Using fallback placeholder tenders.');
      setError(`Failed to fetch real-time data: ${err.message || 'Server unreachable'}`);
      setTenders(FALLBACK_TENDERS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenderData();
  }, []);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token && window.location.pathname === '/') {
      console.log('User not logged in, using fallback data mode');
    }
  }, []);

  // Fetch engineers
  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const data = await apiClient.getEngineers();
        setEngineers(data);
      } catch (err) {
        console.error('Failed to fetch engineers:', err);
      }
    };
    fetchEngineers();
  }, []);


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
  const [assignEngineerModalOpen, setAssignEngineerModalOpen] = useState(false);
  const [engineers, setEngineers] = useState([]);
  const [workflowLoading, setWorkflowLoading] = useState(false);
  const [selectedTenderForAssignment, setSelectedTenderForAssignment] = useState(null);

  const [assignEngineerForm, setAssignEngineerForm] = useState({
    engineerName: '',
    engineerEmail: '',
    engineerPhone: '',
    engineerSpecialization: '',
    engineerExperience: '',
    assignmentNotes: ''
  });
  const [currentStep, setCurrentStep] = useState(1); // Track current step (1 or 2)
  const [step2Form, setStep2Form] = useState({
    tenderDocument: null,
    technicalBidSheet: null,
    keyObservations: '',
    complianceNotes: ''
  });
  const [step3Form, setStep3Form] = useState({
    emdAmount: '',
    tenderFee: '',
    processingFee: '',
    paymentMode: '',
    requestedBy: '',
    remarks: ''
  });
  const [step4Form, setStep4Form] = useState({
    costingEngineer: '',
    deadlineDate: '',
    costScopeDescription: '',
    referenceFiles: []
  });
  const [step5Form, setStep5Form] = useState({
    portalName: '',
    portalUrl: '',
    loginId: '',
    registrationStatus: '',
    credentialsNotes: ''
  });
  const [step6Form, setStep6Form] = useState({
    requiredDocuments: [],
    checklist: {
      aadhaar: false,
      pan: false,
      gst: false,
      certificates: false
    },
    documentationStatus: ''
  });
  const [step7Form, setStep7Form] = useState({
    paymentReferenceNo: '',
    paymentDate: '',
    amountPaid: '',
    proofUpload: null,
    paymentStatus: ''
  });
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


  // Handle filter change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // Function to handle accepting a tender - initialize with step 1 unlocked
  const handleAcceptTender = async (id) => {
    try {
      // Try to call backend to update status (may fail in demo mode)
      await apiClient.updateTender(id, { status: 'ACCEPTED' });
    } catch (err) {
      // API call failed - this is expected in demo/offline mode
      console.log('API call failed, using local demo mode for tender acceptance');
    }

    // Always update local state (works in both API and demo modes)
    setTenders(prevTenders =>
      prevTenders.map(tender =>
        tender.id === id
          ? {
            ...tender,
            status: 'accepted',
            engineer: null,
            currentStep: 1,
            acceptanceDate: new Date().toISOString().split('T')[0],
            documents: tender.documents || {},
            stepData: {}
          }
          : tender
      )
    );

    // Update localStorage for persistence
    const savedAcceptedTenders = localStorage.getItem('acceptedTenders');
    let acceptedIds = savedAcceptedTenders ? new Set(JSON.parse(savedAcceptedTenders)) : new Set();
    acceptedIds.add(id);
    localStorage.setItem('acceptedTenders', JSON.stringify([...acceptedIds]));

    console.log(`Tender ${id} accepted! It will now appear in your Accepted Tenders dashboard.`);
  };

  // Handle reject tender
  const handleRejectTender = async (id) => {
    try {
      // Try to call backend to update status (may fail in demo mode)
      await apiClient.updateTender(id, { status: 'REJECTED' });
    } catch (err) {
      // API call failed - this is expected in demo/offline mode
      console.log('API call failed, using local demo mode for tender rejection');
    }

    // Always update local state (works in both API and demo modes)
    setTenders(prevTenders =>
      prevTenders.map(tender =>
        tender.id === id
          ? { ...tender, status: 'rejected' }
          : tender
      )
    );

    console.log(`Tender ${id} rejected.`);
  };


  // Function to check if a tender is completed (all 8 steps)
  const isTenderCompleted = (tender) => {
    // Check if workflow is marked as completed
    if (tender.workflowCompleted === true) {
      return true;
    }

    if (!tender.stepData) return false;

    // Check if all 8 steps have been completed
    for (let i = 1; i <= 8; i++) {
      if (!tender.stepData[i] || !tender.stepData[i].completed) {
        return false;
      }
    }

    return true;
  };

  const getTenderProgress = (tender) => {
    // Use pre-calculated progress if available (from backend transformation)
    if (tender.completedSteps !== undefined && tender.totalSteps !== undefined) {
      return {
        completedSteps: tender.completedSteps,
        totalSteps: tender.totalSteps,
        progressPercentage: tender.totalSteps > 0 ? Math.round((tender.completedSteps / tender.totalSteps) * 100) : 0
      };
    }

    const totalSteps = 8;
    let completedSteps = 0;

    if (tender.stepData) {
      for (let i = 1; i <= totalSteps; i++) {
        if (tender.stepData[i] && (tender.stepData[i].completed || tender.stepData[i].data)) {
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


  // Function to get dynamic step label for accepted tenders table
  const getDynamicStepLabel = (tender) => {
    // If workflow is completed, show Completed
    if (tender.workflowCompleted || isTenderCompleted(tender)) {
      return 'Workflow Completed';
    }

    // If no assignment exists yet
    if (!tender.assignment_id && !tender.engineer) {
      return 'Assign Engineer';
    }

    // Get current step
    const stepNo = tender.currentStep || 1;

    if (stepNo === 1) {
      return tender.assignment_id ? 'Assign Engineer (Edit)' : 'Assign Engineer';
    }

    return `Step ${stepNo} (In Progress)`;
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
    return tenders.filter(tender =>
      tender.status?.toLowerCase() === 'accepted' ||
      tender.status?.toLowerCase() === 'submitted' ||
      tender.workflowCompleted === true
    );
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

  // Handle assign engineer modal open
  const handleOpenAssignEngineerModal = async (tender) => {
    setSelectedTenderForAssignment(tender);
    setWorkflowLoading(true);

    // Step 1: Initialize forms to empty/initial state
    const resetForms = () => {
      setAssignEngineerForm({
        engineerId: '',
        engineerName: '',
        engineerEmail: '',
        engineerPhone: '',
        engineerSpecialization: '',
        engineerExperience: '',
        assignmentNotes: ''
      });

      setStep2Form({
        tenderDocument: null,
        technicalBidSheet: null,
        keyObservations: '',
        complianceNotes: ''
      });

      setStep3Form({
        emdAmount: '',
        tenderFee: '',
        processingFee: '',
        paymentMode: '',
        requestedBy: '',
        remarks: ''
      });

      setStep4Form({
        costingEngineer: '',
        deadlineDate: '',
        costScopeDescription: '',
        referenceFiles: []
      });

      setStep5Form({
        portalName: '',
        portalUrl: '',
        loginId: '',
        registrationStatus: '',
        credentialsNotes: ''
      });

      setStep6Form({
        requiredDocuments: [],
        checklist: {
          aadhaar: false,
          pan: false,
          gst: false,
          certificates: false
        },
        documentationStatus: ''
      });

      setStep7Form({
        paymentReferenceNo: '',
        paymentDate: '',
        amountPaid: '',
        proofUpload: null,
        paymentStatus: ''
      });

      setCurrentStep(1);
    };

    try {
      // Step 2: Check if this tender has an existing workflow assignment
      if (tender.assignment_id) {
        const workflowData = await apiClient.getWorkflow(tender.assignment_id);

        // Populate Step 1 Data (Engineer)
        if (workflowData.engineer) {
          setAssignEngineerForm({
            engineerId: workflowData.engineer.id || '',
            engineerName: workflowData.engineer.name || '',
            engineerEmail: workflowData.engineer.email || '',
            engineerPhone: workflowData.engineer.phone || '',
            engineerSpecialization: workflowData.engineer.specialization || '',
            engineerExperience: workflowData.engineer.experience || '',
            assignmentNotes: workflowData.notes || ''
          });
        }

        // Populate other steps if data exists
        if (workflowData.steps_data) {
          const steps = workflowData.steps_data;
          if (steps[2]) setStep2Form(prev => ({ ...prev, ...steps[2].data }));
          if (steps[3]) setStep3Form(prev => ({ ...prev, ...steps[3].data }));
          if (steps[4]) setStep4Form(prev => ({ ...prev, ...steps[4].data }));
          if (steps[5]) setStep5Form(prev => ({ ...prev, ...steps[5].data }));
          if (steps[6]) setStep6Form(prev => ({ ...prev, ...steps[6].data }));
          if (steps[7]) setStep7Form(prev => ({ ...prev, ...steps[7].data }));
        }

        // Determine current step
        if (workflowData.current_step) {
          setCurrentStep(workflowData.current_step);
        } else {
          setCurrentStep(1);
        }
      } else {
        // No assignment_id, check for local storage data as fallback or just reset
        const savedDataStr = localStorage.getItem(`tender_${tender.id}_formData`);
        if (savedDataStr) {
          const savedData = JSON.parse(savedDataStr);
          if (savedData.assignEngineerForm) setAssignEngineerForm(savedData.assignEngineerForm);
          if (savedData.step2Form) setStep2Form(savedData.step2Form);
          if (savedData.step3Form) setStep3Form(savedData.step3Form);
          if (savedData.step4Form) setStep4Form(savedData.step4Form);
          if (savedData.step5Form) setStep5Form(savedData.step5Form);
          if (savedData.step6Form) setStep6Form(savedData.step6Form);
          if (savedData.step7Form) setStep7Form(savedData.step7Form);
          if (savedData.currentStep) setCurrentStep(savedData.currentStep);
        } else {
          resetForms();
        }
      }
    } catch (err) {
      console.error('Failed to fetch workflow data:', err);
      resetForms();
    } finally {
      setWorkflowLoading(false);
      setAssignEngineerModalOpen(true);
    }
  };


  // Handle step 2 form change
  const handleStep2Change = (e) => {
    const { name, value, files } = e.target;
    setStep2Form(prev => {
      const updatedForm = files ?
        { ...prev, [name]: files[0] } :
        { ...prev, [name]: value };

      // Auto-save all form data
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: updatedForm,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: currentStep
      };
      autoSaveFormData(selectedTenderForAssignment?.id, formData);

      return updatedForm;
    });
  };

  // Handle step 3 form change
  const handleStep3Change = (e) => {
    const { name, value } = e.target;
    setStep3Form(prev => {
      const updatedForm = {
        ...prev,
        [name]: value
      };

      // Auto-save all form data
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: updatedForm,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: currentStep
      };
      autoSaveFormData(selectedTenderForAssignment?.id, formData);

      return updatedForm;
    });
  };

  // Handle step 4 form change
  const handleStep4Change = (e) => {
    const { name, value, files } = e.target;
    setStep4Form(prev => {
      const updatedForm = files ?
        { ...prev, [name]: Array.from(files) } :
        { ...prev, [name]: value };

      // Auto-save all form data
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: updatedForm,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: currentStep
      };
      autoSaveFormData(selectedTenderForAssignment?.id, formData);

      return updatedForm;
    });
  };

  // Handle step 5 form change
  const handleStep5Change = (e) => {
    const { name, value } = e.target;
    setStep5Form(prev => {
      const updatedForm = {
        ...prev,
        [name]: value
      };

      // Auto-save all form data
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: updatedForm,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: currentStep
      };
      autoSaveFormData(selectedTenderForAssignment?.id, formData);

      return updatedForm;
    });
  };

  // Handle step 6 form change
  const handleStep6Change = (e) => {
    const { name, value, files, type, checked } = e.target;

    setStep6Form(prev => {
      let updatedForm;

      if (files) {
        // Handle file uploads
        updatedForm = {
          ...prev,
          requiredDocuments: Array.from(files)
        };
      } else if (type === 'checkbox') {
        // Handle checklist checkboxes
        updatedForm = {
          ...prev,
          checklist: {
            ...prev.checklist,
            [name]: checked
          }
        };
      } else {
        // Handle regular text inputs
        updatedForm = {
          ...prev,
          [name]: value
        };
      }

      // Auto-save all form data
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: updatedForm,
        step7Form: step7Form,
        currentStep: currentStep
      };
      autoSaveFormData(selectedTenderForAssignment?.id, formData);

      return updatedForm;
    });
  };

  // Handle step 7 form change
  const handleStep7Change = (e) => {
    const { name, value, files } = e.target;
    setStep7Form(prev => {
      const updatedForm = files ?
        { ...prev, [name]: files[0] } :
        { ...prev, [name]: value };

      // Auto-save all form data
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: updatedForm,
        currentStep: currentStep
      };
      autoSaveFormData(selectedTenderForAssignment?.id, formData);

      return updatedForm;
    });
  };

  // Handle step 3 form submit
  const handleStep3Submit = async (e) => {
    e.preventDefault();
    setWorkflowLoading(true);

    try {
      if (selectedTenderForAssignment?.assignment_id) {
        await apiClient.saveWorkflowStep(selectedTenderForAssignment.assignment_id, 3, step3Form);
      }

      // Update the tender with step 3 data
      setTenders(prevTenders =>
        prevTenders.map(tender =>
          tender.id === selectedTenderForAssignment.id
            ? {
              ...tender,
              step3Data: step3Form,
              step3Completed: true,
              currentStep: 4
            }
            : tender
        )
      );

      // Move to next step
      handleNextStep();

      // Show success notification
      setNotifications(prev => [{
        id: Date.now(),
        tenderId: selectedTenderForAssignment.id,
        title: "Step 3 Completed",
        message: `Successfully completed Step 3 for ${selectedTenderForAssignment.title}`,
        type: "success",
        icon: "fas fa-check-circle",
        read: false
      }, ...prev]);

      // Update form data in localStorage
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: 4
      };
      localStorage.setItem(`tender_${selectedTenderForAssignment.id}_formData`, JSON.stringify(formData));
    } catch (err) {
      console.error('Failed to save Step 3:', err);
      alert('Error saving step: ' + err.message);
    } finally {
      setWorkflowLoading(false);
    }
  };


  // Handle step 4 form submit
  const handleStep4Submit = async (e) => {
    e.preventDefault();
    setWorkflowLoading(true);

    try {
      if (selectedTenderForAssignment?.assignment_id) {
        await apiClient.saveWorkflowStep(selectedTenderForAssignment.assignment_id, 4, step4Form);
      }

      // Update the tender with step 4 data
      setTenders(prevTenders =>
        prevTenders.map(tender =>
          tender.id === selectedTenderForAssignment.id
            ? {
              ...tender,
              step4Data: step4Form,
              step4Completed: true,
              currentStep: 5  // Move to next step after completing step 4
            }
            : tender
        )
      );

      // Move to next step
      handleNextStep();

      // Show success notification
      setNotifications(prev => [{
        id: Date.now(),
        tenderId: selectedTenderForAssignment.id,
        title: "Step 4 Completed",
        message: `Successfully completed Step 4 for ${selectedTenderForAssignment.title}`,
        type: "success",
        icon: "fas fa-check-circle",
        read: false
      }, ...prev]);

      // Update form data in localStorage
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: 5
      };
      localStorage.setItem(`tender_${selectedTenderForAssignment.id}_formData`, JSON.stringify(formData));
    } catch (err) {
      console.error('Failed to save Step 4:', err);
      alert('Error saving step: ' + err.message);
    } finally {
      setWorkflowLoading(false);
    }
  };


  // Handle step 5 form submit
  const handleStep5Submit = async (e) => {
    e.preventDefault();
    setWorkflowLoading(true);

    try {
      if (selectedTenderForAssignment?.assignment_id) {
        await apiClient.saveWorkflowStep(selectedTenderForAssignment.assignment_id, 5, step5Form);
      }

      // Update the tender with step 5 data
      setTenders(prevTenders =>
        prevTenders.map(tender =>
          tender.id === selectedTenderForAssignment.id
            ? {
              ...tender,
              step5Data: step5Form,
              step5Completed: true,
              currentStep: 6  // Move to next step after completing step 5
            }
            : tender
        )
      );

      // Move to next step
      handleNextStep();

      // Show success notification
      setNotifications(prev => [{
        id: Date.now(),
        tenderId: selectedTenderForAssignment.id,
        title: "Step 5 Completed",
        message: `Successfully completed Step 5 for ${selectedTenderForAssignment.title}`,
        type: "success",
        icon: "fas fa-check-circle",
        read: false
      }, ...prev]);

      // Update form data in localStorage
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: 6
      };
      localStorage.setItem(`tender_${selectedTenderForAssignment.id}_formData`, JSON.stringify(formData));
    } catch (err) {
      console.error('Failed to save Step 5:', err);
      alert('Error saving step: ' + err.message);
    } finally {
      setWorkflowLoading(false);
    }
  };


  // Handle step 6 form submit
  const handleStep6Submit = async (e) => {
    e.preventDefault();
    setWorkflowLoading(true);

    try {
      if (selectedTenderForAssignment?.assignment_id) {
        await apiClient.saveWorkflowStep(selectedTenderForAssignment.assignment_id, 6, step6Form);
      }

      // Update the tender with step 6 data
      setTenders(prevTenders =>
        prevTenders.map(tender =>
          tender.id === selectedTenderForAssignment.id
            ? {
              ...tender,
              step6Data: step6Form,
              step6Completed: true,
              currentStep: 7  // Move to next step after completing step 6
            }
            : tender
        )
      );

      // Move to next step
      handleNextStep();

      // Show success notification
      setNotifications(prev => [{
        id: Date.now(),
        tenderId: selectedTenderForAssignment.id,
        title: "Step 6 Completed",
        message: `Successfully completed Step 6 for ${selectedTenderForAssignment.title}`,
        type: "success",
        icon: "fas fa-check-circle",
        read: false
      }, ...prev]);

      // Update form data in localStorage
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: 7
      };
      localStorage.setItem(`tender_${selectedTenderForAssignment.id}_formData`, JSON.stringify(formData));
    } catch (err) {
      console.error('Failed to save Step 6:', err);
      alert('Error saving step: ' + err.message);
    } finally {
      setWorkflowLoading(false);
    }
  };


  // Handle step 7 form submit
  const handleStep7Submit = async (e) => {
    e.preventDefault();
    setWorkflowLoading(true);

    try {
      if (selectedTenderForAssignment?.assignment_id) {
        await apiClient.saveWorkflowStep(selectedTenderForAssignment.assignment_id, 7, step7Form);
      }

      // Update the tender with step 7 data
      setTenders(prevTenders =>
        prevTenders.map(tender =>
          tender.id === selectedTenderForAssignment.id
            ? {
              ...tender,
              step7Data: step7Form,
              step7Completed: true,
              currentStep: 8  // Move to next step after completing step 7
            }
            : tender
        )
      );

      // Move to next step
      handleNextStep();

      // Show success notification
      setNotifications(prev => [{
        id: Date.now(),
        tenderId: selectedTenderForAssignment.id,
        title: "Step 7 Completed",
        message: `Successfully completed Step 7 for ${selectedTenderForAssignment.title}`,
        type: "success",
        icon: "fas fa-check-circle",
        read: false
      }, ...prev]);

      // Update form data in localStorage
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: 8
      };
      localStorage.setItem(`tender_${selectedTenderForAssignment.id}_formData`, JSON.stringify(formData));
    } catch (err) {
      console.error('Failed to save Step 7:', err);
      alert('Error saving step: ' + err.message);
    } finally {
      setWorkflowLoading(false);
    }
  };


  // Handle step 8 form submit (final step - complete workflow)
  const handleStep8Submit = async (e) => {
    e.preventDefault();
    setWorkflowLoading(true);

    try {
      if (selectedTenderForAssignment?.assignment_id) {
        await apiClient.submitWorkflow(selectedTenderForAssignment.assignment_id);
      }

      // Update the tender to mark workflow as completed
      setTenders(prevTenders =>
        prevTenders.map(tender =>
          tender.id === selectedTenderForAssignment.id
            ? {
              ...tender,
              stepsCompleted: 8,
              status: 'Submitted',
              workflowCompleted: true,
              completionDate: new Date().toISOString().split('T')[0]
            }
            : tender
        )
      );

      // Show success notification
      setNotifications(prev => [{
        id: Date.now(),
        tenderId: selectedTenderForAssignment.id,
        title: "Workflow Completed",
        message: `Tender workflow completed successfully for ${selectedTenderForAssignment.title}`,
        type: "success",
        icon: "fas fa-check-circle",
        read: false
      }, ...prev]);

      // Close the modal
      handleCloseAssignEngineerModal();

      // Clear form data from localStorage after completion
      localStorage.removeItem(`tender_${selectedTenderForAssignment.id}_formData`);
    } catch (err) {
      console.error('Failed to submit workflow:', err);
      alert('Error submitting workflow: ' + err.message);
    } finally {
      setWorkflowLoading(false);
    }
  };


  // Handle move to next step
  const handleNextStep = () => {
    setCurrentStep(prevStep => {
      const nextStep = prevStep + 1;

      // Save current step to localStorage immediately with the new value
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: nextStep
      };
      localStorage.setItem(`tender_${selectedTenderForAssignment?.id}_formData`, JSON.stringify(formData));

      return nextStep;
    });
  };

  // Handle back to previous step
  const handleBackStep = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);

    // Save current step to localStorage
    const formData = {
      assignEngineerForm: assignEngineerForm,
      step2Form: step2Form,
      step3Form: step3Form,
      step4Form: step4Form,
      step5Form: step5Form,
      step6Form: step6Form,
      step7Form: step7Form,
      currentStep: prevStep
    };
    localStorage.setItem(`tender_${selectedTenderForAssignment?.id}_formData`, JSON.stringify(formData));
  };

  // Handle step 2 form submit
  const handleStep2Submit = async (e) => {
    e.preventDefault();
    setWorkflowLoading(true);

    try {
      if (selectedTenderForAssignment?.assignment_id) {
        await apiClient.saveWorkflowStep(selectedTenderForAssignment.assignment_id, 2, step2Form);
      }

      // Update the tender with step 2 data
      setTenders(prevTenders =>
        prevTenders.map(tender =>
          tender.id === selectedTenderForAssignment.id
            ? {
              ...tender,
              step2Data: step2Form,
              step2Completed: true,
              currentStep: 3
            }
            : tender
        )
      );

      // Move to next step
      setCurrentStep(prev => prev + 1);

      // Show success notification
      setNotifications(prev => [{
        id: Date.now(),
        tenderId: selectedTenderForAssignment.id,
        title: "Step 2 Completed",
        message: `Successfully completed Step 2 for ${selectedTenderForAssignment.title}`,
        type: "success",
        icon: "fas fa-check-circle",
        read: false
      }, ...prev]);

      // Update form data in localStorage
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: 3
      };
      localStorage.setItem(`tender_${selectedTenderForAssignment.id}_formData`, JSON.stringify(formData));
    } catch (err) {
      console.error('Failed to save Step 2:', err);
      alert('Error saving step: ' + err.message);
    } finally {
      setWorkflowLoading(false);
    }
  };


  // Handle assign engineer form submit
  const handleAssignEngineerSubmit = async (e) => {
    e.preventDefault();
    setWorkflowLoading(true);

    try {
      // Prepare extra data
      const extraData = {
        email: assignEngineerForm.engineerEmail,
        phone: assignEngineerForm.engineerPhone,
        specialization: assignEngineerForm.engineerSpecialization,
        experience: assignEngineerForm.engineerExperience,
        notes: assignEngineerForm.assignmentNotes
      };

      // Call API to start workflow
      const response = await apiClient.startWorkflow(
        selectedTenderForAssignment.id,
        assignEngineerForm.engineerId, // Will be empty string or null if not set
        assignEngineerForm.engineerName, // Pass the manual name
        extraData
      );

      const assignmentId = response.assignment_id;

      // Update the tender with the assigned engineer and assignment_id
      setTenders(prevTenders =>
        prevTenders.map(tender =>
          tender.id === selectedTenderForAssignment.id
            ? {
              ...tender,
              assignment_id: assignmentId,
              engineer: assignEngineerForm.engineerName,
              engineerDetails: assignEngineerForm,
              currentStep: 2,
              step1Completed: true
            }
            : tender
        )
      );

      // Update selected tender state
      setSelectedTenderForAssignment(prev => ({
        ...prev,
        assignment_id: assignmentId,
        engineer: assignEngineerForm.engineerName,
        engineerDetails: assignEngineerForm,
        currentStep: 2,
        step1Completed: true
      }));

      // Move to next step - Set explicitly to 2 since we just completed step 1
      setCurrentStep(2);

      // Save to local storage for step 2
      const newFormData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: 2
      };
      localStorage.setItem(`tender_${selectedTenderForAssignment.id}_formData`, JSON.stringify(newFormData));

      // Show success notification
      setNotifications(prev => [{
        id: Date.now(),
        tenderId: selectedTenderForAssignment.id,
        title: "Engineer Assigned",
        message: `Successfully assigned ${assignEngineerForm.engineerName} to ${selectedTenderForAssignment.title}`,
        type: "success",
        icon: "fas fa-check-circle",
        read: false
      }, ...prev]);

      // Update localStorage with the updated tenders
      const updatedTenders = tenders.map(tender =>
        tender.id === selectedTenderForAssignment.id
          ? {
            ...tender,
            assignment_id: assignmentId,
            engineer: assignEngineerForm.engineerName,
            engineerDetails: assignEngineerForm,
            currentStep: 2,
            step1Completed: true
          }
          : tender
      );

      // Save the updated tenders to localStorage
      const acceptedTenderIds = updatedTenders.filter(t =>
        t.status?.toLowerCase() === 'accepted' ||
        t.status?.toLowerCase() === 'submitted' ||
        t.workflowCompleted === true ||
        t.step1Completed
      ).map(t => t.id);
      localStorage.setItem('acceptedTenders', JSON.stringify(acceptedTenderIds));

      // Update form data in localStorage
      const formData = {
        assignEngineerForm: assignEngineerForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: 2
      };
      localStorage.setItem(`tender_${selectedTenderForAssignment.id}_formData`, JSON.stringify(formData));

    } catch (err) {
      console.error('Failed to start workflow:', err);

      // Check for authentication error
      const isAuthError = err.status === 401 ||
        (err.detail && err.detail.includes('Authentication credentials were not provided')) ||
        (typeof err.error === 'string' && err.error.includes('Authentication credentials'));

      if (isAuthError) {
        alert('Your session has expired or you are not logged in. Redirecting to login page...');
        window.location.href = '/login';
        return;
      }

      // Display specific error from backend if available
      const errorMessage = err.error || err.detail || err.message || 'Failed to start workflow. Please try again.';
      alert('Error: ' + errorMessage);
    } finally {
      setWorkflowLoading(false);
    }
  };


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

  // Auto-save function to save all form data
  const autoSaveFormData = (tenderId, formData, showNotification = false) => {
    if (tenderId) {
      localStorage.setItem(`tender_${tenderId}_formData`, JSON.stringify(formData));
      console.log(`Progress saved for tender ${tenderId}`);

      if (showNotification) {
        // Add a brief notification that data was saved
        const saveNotification = {
          id: Date.now(),
          tenderId: tenderId,
          title: "Progress Saved",
          message: "Your progress has been automatically saved",
          type: "success",
          icon: "fas fa-save",
          read: false
        };

        // We'll need to pass setNotifications to use it here
        // For now, we'll rely on the console log and localStorage
        console.log("Auto-save notification:", saveNotification);
      }
    }
  };

  // Handle assign engineer modal close
  const handleCloseAssignEngineerModal = () => {
    setAssignEngineerModalOpen(false);
    setSelectedTenderForAssignment(null);
    // Don't reset forms - keep data in localStorage for persistence
    // Forms will be reset when modal opens if no saved data exists
  };

  // Handle assign engineer form change
  const handleAssignEngineerChange = (e) => {
    const { name, value } = e.target;
    setAssignEngineerForm(prev => {
      let updatedForm = {
        ...prev,
        [name]: value
      };

      // If engineerId is changed, auto-populate details from the selected engineer
      if (name === 'engineerId' && value) {
        const selectedEng = engineers.find(eng => eng.id.toString() === value.toString());
        if (selectedEng) {
          updatedForm = {
            ...updatedForm,
            engineerName: selectedEng.name || '',
            engineerEmail: selectedEng.email || '',
            engineerPhone: selectedEng.phone || '',
            engineerSpecialization: selectedEng.specialization || '',
            engineerExperience: selectedEng.experience || ''
          };
        }
      }

      // Auto-save all form data
      const formData = {
        assignEngineerForm: updatedForm,
        step2Form: step2Form,
        step3Form: step3Form,
        step4Form: step4Form,
        step5Form: step5Form,
        step6Form: step6Form,
        step7Form: step7Form,
        currentStep: currentStep
      };
      autoSaveFormData(selectedTenderForAssignment?.id, formData);

      return updatedForm;
    });
  };



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
    <NotificationProvider>
      <Header />
      <Hero />
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '400px',
          padding: '40px'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '30px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(52, 152, 219, 0.1)'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '15px',
              color: '#3498db'
            }}>
              <i className="fas fa-spinner fa-spin"></i>
            </div>
            <h3 style={{
              color: '#2c3e50',
              marginBottom: '10px',
              fontWeight: '600'
            }}>
              Loading Tender Data
            </h3>
            <p style={{
              color: '#7f8c8d',
              fontSize: '1rem'
            }}>
              Fetching latest tender information from our servers...
            </p>
          </div>
        </div>
      ) : (
        <>
          {error && (
            <div style={{
              padding: '10px 20px',
              backgroundColor: '#fff4e5',
              borderBottom: '1px solid #ffe2b3',
              color: '#663c00',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <i className="fas fa-exclamation-triangle"></i>
              <span>Offline Mode: Showing placeholder tenders as real-time server connection failed.</span>
              <button
                onClick={() => fetchTenderData()}
                style={{
                  background: '#663c00',
                  color: 'white',
                  border: 'none',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          )}
          <Dashboard
            handleFilterChange={handleFilterChange}
            filter={filter}
            handleAcceptTender={handleAcceptTender}
            handleRejectTender={handleRejectTender}
            isTenderCompleted={isTenderCompleted}
            acceptedTenderIds={tenders.filter(t => t.status === 'accepted').map(t => t.id)}
          />
        </>
      )}
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
                    {getAcceptedTenders().length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px 20px' }}>
                          <div style={{ color: '#7f8c8d' }}>
                            <i className="fas fa-inbox" style={{ fontSize: '3rem', marginBottom: '15px', display: 'block' }}></i>
                            <h4 style={{ marginBottom: '10px', color: '#2c3e50' }}>No Accepted Tenders Yet</h4>
                            <p style={{ marginBottom: '20px' }}>Browse the Tender Dashboard above and click "Accept" on tenders you're interested in.</p>
                            <a 
                              href="#dashboard" 
                              style={{ 
                                display: 'inline-block',
                                padding: '10px 20px',
                                background: '#3498db',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '6px',
                                fontWeight: '500'
                              }}
                            >
                              <i className="fas fa-search"></i> Browse Tenders
                            </a>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      getCurrentPageTenders().map(tender => (
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
                                  <div className="step-name">
                                    {progress.completedSteps === 0 ? 'Not Started' :
                                      progress.completedSteps > 0 && progress.completedSteps < progress.totalSteps ? stepInfo.name :
                                        'All Steps Completed'}
                                  </div>
                                  <div className={`step-status-badge status-${progress.completedSteps === 0 ? 'pending' : progress.completedSteps > 0 && progress.completedSteps < progress.totalSteps ? 'in_progress' : 'completed'}`}>
                                    {progress.completedSteps === 0 ? 'PENDING' :
                                      progress.completedSteps > 0 && progress.completedSteps < progress.totalSteps ? 'IN PROGRESS' :
                                        'COMPLETED'}
                                  </div>
                                </div>

                                {/* Engineer Assignment Status */}
                                <div className="engineer-status">
                                  <div className={tender.engineer ? "assigned-engineer" : "no-engineer"}>
                                    <i className={tender.engineer ? "fas fa-user-check" : "fas fa-user-plus"}></i>
                                    {tender.engineer && (
                                      <span className="engineer-name">{tender.engineer}</span>
                                    )}
                                    <span
                                      onClick={() => handleOpenAssignEngineerModal(tender)}
                                      style={{ cursor: 'pointer', textDecoration: 'underline', marginLeft: tender.engineer ? '8px' : '0' }}
                                    >
                                      {getDynamicStepLabel(tender)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                        </td>
                        <td className="contract-value-cell">
                          {tender.amount || '—'}
                        </td>
                      </tr>
                    ))
                    )}
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



      {/* Assign Engineer Modal */}
      {assignEngineerModalOpen && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.3)' }} id="assignEngineerModal" tabIndex="-1" aria-labelledby="assignEngineerModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content" style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
              border: 'none'
            }}>
              <div className="modal-header" style={{
                backgroundColor: 'white',
                borderBottom: '1px solid #e0e0e0',
                padding: '24px 32px 16px 32px',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <h5 className="modal-title" id="assignEngineerModalLabel" style={{
                    color: '#212121',
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    margin: 0
                  }}>
                    Assign Engineer to {selectedTenderForAssignment?.title || 'Tender'}
                  </h5>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.875rem',
                    color: '#6c757d'
                  }}>
                    <i className="fas fa-save" style={{ fontSize: '0.875rem' }}></i>
                    <span>Progress Auto-Saved</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCloseAssignEngineerModal}
                  aria-label="Close"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#757575',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    padding: '8px',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f5f5f5';
                    e.target.style.color = '#212121';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#757575';
                  }}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="modal-body" style={{
                backgroundColor: 'white',
                padding: '16px 32px 24px 32px',
                position: 'relative'
              }}>
                {workflowLoading && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '0 0 16px 16px'
                  }}>
                    <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: '#1976d2', marginBottom: '16px' }}></i>
                    <p style={{ color: '#616161', fontWeight: '500' }}>Processing workflow...</p>
                  </div>
                )}
                {/* Form Data Summary - Visible across all steps */}

                <div style={{
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  padding: '16px',
                  marginBottom: '20px',
                  border: '1px solid #e9ecef'
                }}>
                  <h6 style={{
                    color: '#495057',
                    marginBottom: '12px',
                    fontWeight: '600'
                  }}>
                    <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
                    Form Data Summary
                  </h6>

                  {/* Engineer Details */}
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Engineer:</strong>
                    <div style={{
                      color: assignEngineerForm.engineerName ? '#28a745' : '#dc3545',
                      fontSize: '0.9rem',
                      marginTop: '4px'
                    }}>
                      {assignEngineerForm.engineerName || 'Not assigned yet'}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Contact:</strong>
                    <div style={{
                      color: assignEngineerForm.engineerEmail && assignEngineerForm.engineerPhone ? '#28a745' : '#ffc107',
                      fontSize: '0.9rem',
                      marginTop: '4px'
                    }}>
                      {assignEngineerForm.engineerEmail && assignEngineerForm.engineerPhone ?
                        `${assignEngineerForm.engineerEmail} | ${assignEngineerForm.engineerPhone}` :
                        'Email and phone required'
                      }
                    </div>
                  </div>

                  {/* Specialization and Experience */}
                  <div style={{ marginBottom: '12px' }}>
                    <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Qualifications:</strong>
                    <div style={{
                      color: assignEngineerForm.engineerSpecialization && assignEngineerForm.engineerExperience ? '#28a745' : '#ffc107',
                      fontSize: '0.9rem',
                      marginTop: '4px'
                    }}>
                      {assignEngineerForm.engineerSpecialization && assignEngineerForm.engineerExperience ?
                        `${assignEngineerForm.engineerSpecialization} (${assignEngineerForm.engineerExperience} years)` :
                        'Specialization and experience required'
                      }
                    </div>
                  </div>

                  {/* Notes */}
                  {assignEngineerForm.assignmentNotes && (
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Notes:</strong>
                      <div style={{
                        color: '#6c757d',
                        fontSize: '0.9rem',
                        marginTop: '4px',
                        fontStyle: 'italic'
                      }}>
                        {assignEngineerForm.assignmentNotes}
                      </div>
                    </div>
                  )}

                  {/* Step 2 Data */}
                  {step2Form.keyObservations || step2Form.complianceNotes ? (
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Technical Analysis:</strong>
                      <div style={{
                        color: '#28a745',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        {step2Form.keyObservations ? `Observations: ${step2Form.keyObservations.substring(0, 50)}...` : ''}
                        {step2Form.complianceNotes ? ` | Compliance: ${step2Form.complianceNotes.substring(0, 30)}...` : ''}
                      </div>
                    </div>
                  ) : currentStep > 1 && (
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Technical Analysis:</strong>
                      <div style={{
                        color: '#dc3545',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Not completed yet
                      </div>
                    </div>
                  )}

                  {/* Step 3 Data */}
                  {step3Form.emdAmount || step3Form.tenderFee || step3Form.processingFee ? (
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Financial Details:</strong>
                      <div style={{
                        color: '#28a745',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        EMD: ₹{step3Form.emdAmount || '0'} | Tender Fee: ₹{step3Form.tenderFee || '0'} | Processing: ₹{step3Form.processingFee || '0'}
                      </div>
                      {step3Form.requestedBy && (
                        <div style={{
                          color: '#6c757d',
                          fontSize: '0.85rem',
                          marginTop: '2px'
                        }}>
                          Requested by: {step3Form.requestedBy}
                        </div>
                      )}
                    </div>
                  ) : currentStep > 2 && (
                    <div style={{ marginBottom: '12px' }}>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Financial Details:</strong>
                      <div style={{
                        color: '#dc3545',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Not completed yet
                      </div>
                    </div>
                  )}

                  {/* Step 4 Data */}
                  {step4Form.costingEngineer || step4Form.deadlineDate || step4Form.costScopeDescription ? (
                    <div>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Costing Details:</strong>
                      <div style={{
                        color: '#28a745',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Engineer: {step4Form.costingEngineer || 'N/A'} | Deadline: {step4Form.deadlineDate || 'N/A'}
                      </div>
                      {step4Form.costScopeDescription && (
                        <div style={{
                          color: '#6c757d',
                          fontSize: '0.85rem',
                          marginTop: '2px'
                        }}>
                          Scope: {step4Form.costScopeDescription.substring(0, 50)}...
                        </div>
                      )}
                      {step4Form.referenceFiles && step4Form.referenceFiles.length > 0 && (
                        <div style={{
                          color: '#6c757d',
                          fontSize: '0.85rem',
                          marginTop: '2px'
                        }}>
                          Files: {step4Form.referenceFiles.length} attached
                        </div>
                      )}
                    </div>
                  ) : currentStep > 3 && (
                    <div>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Costing Details:</strong>
                      <div style={{
                        color: '#dc3545',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Not completed yet
                      </div>
                    </div>
                  )}

                  {/* Step 5 Data */}
                  {step5Form.portalName || step5Form.portalUrl || step5Form.loginId ? (
                    <div>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Portal Registration:</strong>
                      <div style={{
                        color: '#28a745',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Portal: {step5Form.portalName || 'N/A'} | ID: {step5Form.loginId || 'N/A'}
                      </div>
                      {step5Form.registrationStatus && (
                        <div style={{
                          color: '#6c757d',
                          fontSize: '0.85rem',
                          marginTop: '2px'
                        }}>
                          Status: {step5Form.registrationStatus}
                        </div>
                      )}
                    </div>
                  ) : currentStep > 4 && (
                    <div>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Portal Registration:</strong>
                      <div style={{
                        color: '#dc3545',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Not completed yet
                      </div>
                    </div>
                  )}

                  {/* Step 6 Data */}
                  {step6Form.requiredDocuments.length > 0 || Object.values(step6Form.checklist).some(val => val) ? (
                    <div>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Documentation:</strong>
                      <div style={{
                        color: '#28a745',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Documents: {step6Form.requiredDocuments.length} uploaded
                      </div>
                      {step6Form.documentationStatus && (
                        <div style={{
                          color: '#6c757d',
                          fontSize: '0.85rem',
                          marginTop: '2px'
                        }}>
                          Status: {step6Form.documentationStatus}
                        </div>
                      )}
                    </div>
                  ) : currentStep > 5 && (
                    <div>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Documentation:</strong>
                      <div style={{
                        color: '#dc3545',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Not completed yet
                      </div>
                    </div>
                  )}

                  {/* Step 7 Data */}
                  {step7Form.paymentReferenceNo || step7Form.amountPaid ? (
                    <div>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Payment Details:</strong>
                      <div style={{
                        color: '#28a745',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Ref: {step7Form.paymentReferenceNo || 'N/A'} | Amount: ₹{step7Form.amountPaid || '0'}
                      </div>
                      {step7Form.paymentStatus && (
                        <div style={{
                          color: '#6c757d',
                          fontSize: '0.85rem',
                          marginTop: '2px'
                        }}>
                          Status: {step7Form.paymentStatus}
                        </div>
                      )}
                    </div>
                  ) : currentStep > 6 && (
                    <div>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Payment Details:</strong>
                      <div style={{
                        color: '#dc3545',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Not completed yet
                      </div>
                    </div>
                  )}

                  {/* Workflow Completion Status */}
                  {currentStep === 8 && (
                    <div>
                      <strong style={{ color: '#6c757d', fontSize: '0.85rem' }}>Workflow Status:</strong>
                      <div style={{
                        color: '#28a745',
                        fontSize: '0.9rem',
                        marginTop: '4px'
                      }}>
                        Steps Completed: 8/8
                      </div>
                      <div style={{
                        color: '#17a2b8',
                        fontSize: '0.85rem',
                        marginTop: '2px'
                      }}>
                        Status: Ready for submission
                      </div>
                    </div>
                  )}
                </div>

                {currentStep === 1 ? (
                  <form onSubmit={handleAssignEngineerSubmit}>
                    <div className="mb-4">
                      <label htmlFor="engineerName" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Engineer Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="engineerName"
                        name="engineerName"
                        value={assignEngineerForm.engineerName}
                        onChange={handleAssignEngineerChange}
                        placeholder="Enter engineer name"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: assignEngineerForm.engineerName ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="engineerEmail" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="engineerEmail"
                        name="engineerEmail"
                        value={assignEngineerForm.engineerEmail}
                        onChange={handleAssignEngineerChange}
                        placeholder="Enter email address"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: assignEngineerForm.engineerEmail ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="engineerPhone" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="engineerPhone"
                        name="engineerPhone"
                        value={assignEngineerForm.engineerPhone}
                        onChange={handleAssignEngineerChange}
                        placeholder="Enter phone number"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: assignEngineerForm.engineerPhone ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="engineerSpecialization" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Specialization
                      </label>
                      <select
                        className="form-control"
                        id="engineerSpecialization"
                        name="engineerSpecialization"
                        value={assignEngineerForm.engineerSpecialization}
                        onChange={handleAssignEngineerChange}
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: assignEngineerForm.engineerSpecialization ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          appearance: 'none',
                          backgroundColor: 'white'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      >
                        <option value="">Select specialization</option>
                        <option value="Solar">Solar Projects</option>
                        <option value="Construction">Construction</option>
                        <option value="Electrical">Electrical Systems</option>
                        <option value="Civil">Civil Engineering</option>
                        <option value="Mechanical">Mechanical Systems</option>
                        <option value="IT">IT & Software</option>
                        <option value="Telecom">Telecommunications</option>
                        <option value="HVAC">HVAC Systems</option>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Architecture">Architecture</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Chemical">Chemical Engineering</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="engineerExperience" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="engineerExperience"
                        name="engineerExperience"
                        value={assignEngineerForm.engineerExperience}
                        onChange={handleAssignEngineerChange}
                        min="1"
                        max="50"
                        placeholder="Enter years of experience"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: assignEngineerForm.engineerExperience ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="assignmentNotes" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Assignment Notes
                      </label>
                      <textarea
                        className="form-control"
                        id="assignmentNotes"
                        name="assignmentNotes"
                        value={assignEngineerForm.assignmentNotes}
                        onChange={handleAssignEngineerChange}
                        rows="3"
                        placeholder="Add any special instructions or notes for the engineer"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: assignEngineerForm.assignmentNotes ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          minHeight: '100px'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      ></textarea>
                    </div>
                    <div className="modal-footer" style={{
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      padding: '24px 32px',
                      borderRadius: '0 0 16px 16px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px'
                    }}>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleCloseAssignEngineerModal}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: '#e0e0e0',
                          color: '#616161',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f5f5f5';
                          e.target.style.borderColor = '#bdbdbd';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e0e0e0';
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: '#1976d2',
                          borderColor: '#1976d2',
                          color: 'white',
                          padding: '10px 24px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#1565c0';
                          e.target.style.borderColor = '#1565c0';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#1976d2';
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Next Step
                      </button>
                    </div>
                  </form>
                ) : currentStep === 2 ? (
                  <form onSubmit={handleStep2Submit}>
                    <div className="mb-4">
                      <label htmlFor="tenderDocument" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Upload Tender Document
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="tenderDocument"
                        name="tenderDocument"
                        onChange={handleStep2Change}
                        accept=".pdf,.doc,.docx"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step2Form.tenderDocument ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="technicalBidSheet" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Upload Technical Bid Sheet
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="technicalBidSheet"
                        name="technicalBidSheet"
                        onChange={handleStep2Change}
                        accept=".pdf,.doc,.docx"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step2Form.technicalBidSheet ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="keyObservations" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Key Observations
                      </label>
                      <textarea
                        className="form-control"
                        id="keyObservations"
                        name="keyObservations"
                        value={step2Form.keyObservations}
                        onChange={handleStep2Change}
                        rows="3"
                        placeholder="Enter key observations"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step2Form.keyObservations ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          minHeight: '100px'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="complianceNotes" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Compliance Notes
                      </label>
                      <textarea
                        className="form-control"
                        id="complianceNotes"
                        name="complianceNotes"
                        value={step2Form.complianceNotes}
                        onChange={handleStep2Change}
                        rows="3"
                        placeholder="Enter compliance notes"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step2Form.complianceNotes ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          minHeight: '100px'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      ></textarea>
                    </div>
                    <div className="modal-footer" style={{
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      padding: '24px 32px',
                      borderRadius: '0 0 16px 16px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px'
                    }}>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleBackStep}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: '#e0e0e0',
                          color: '#616161',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f5f5f5';
                          e.target.style.borderColor = '#bdbdbd';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e0e0e0';
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: '#1976d2',
                          borderColor: '#1976d2',
                          color: 'white',
                          padding: '10px 24px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#1565c0';
                          e.target.style.borderColor = '#1565c0';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#1976d2';
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Save & Continue
                      </button>
                    </div>
                  </form>
                ) : currentStep === 3 ? (
                  <form onSubmit={handleStep3Submit}>
                    <div className="mb-4">
                      <label htmlFor="emdAmount" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        EMD Amount
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="emdAmount"
                        name="emdAmount"
                        value={step3Form.emdAmount}
                        onChange={handleStep3Change}
                        min="0"
                        step="0.01"
                        placeholder="Enter EMD amount"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step3Form.emdAmount ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="tenderFee" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Tender Fee
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="tenderFee"
                        name="tenderFee"
                        value={step3Form.tenderFee}
                        onChange={handleStep3Change}
                        min="0"
                        step="0.01"
                        placeholder="Enter tender fee"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step3Form.tenderFee ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="processingFee" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Processing Fee
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="processingFee"
                        name="processingFee"
                        value={step3Form.processingFee}
                        onChange={handleStep3Change}
                        min="0"
                        step="0.01"
                        placeholder="Enter processing fee"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step3Form.processingFee ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="paymentMode" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Payment Mode
                      </label>
                      <select
                        className="form-control"
                        id="paymentMode"
                        name="paymentMode"
                        value={step3Form.paymentMode}
                        onChange={handleStep3Change}
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step3Form.paymentMode ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          appearance: 'none',
                          backgroundColor: 'white'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      >
                        <option value="">Select payment mode</option>
                        <option value="DD">DD (Demand Draft)</option>
                        <option value="Online">Online</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="requestedBy" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Requested By
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="requestedBy"
                        name="requestedBy"
                        value={step3Form.requestedBy}
                        onChange={handleStep3Change}
                        placeholder="Enter requester name"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step3Form.requestedBy ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="remarks" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Remarks
                      </label>
                      <textarea
                        className="form-control"
                        id="remarks"
                        name="remarks"
                        value={step3Form.remarks}
                        onChange={handleStep3Change}
                        rows="3"
                        placeholder="Enter any additional remarks"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step3Form.remarks ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          minHeight: '100px'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      ></textarea>
                    </div>
                    <div className="modal-footer" style={{
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      padding: '24px 32px',
                      borderRadius: '0 0 16px 16px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px'
                    }}>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleBackStep}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: '#e0e0e0',
                          color: '#616161',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f5f5f5';
                          e.target.style.borderColor = '#bdbdbd';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e0e0e0';
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: '#1976d2',
                          borderColor: '#1976d2',
                          color: 'white',
                          padding: '10px 24px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#1565c0';
                          e.target.style.borderColor = '#1565c0';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#1976d2';
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Save & Continue
                      </button>
                    </div>
                  </form>
                ) : currentStep === 4 ? (
                  <form onSubmit={handleStep4Submit}>
                    <div className="mb-4">
                      <label htmlFor="costingEngineer" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Costing Engineer
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="costingEngineer"
                        name="costingEngineer"
                        value={step4Form.costingEngineer}
                        onChange={handleStep4Change}
                        placeholder="Enter costing engineer name"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step4Form.costingEngineer ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="deadlineDate" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Deadline Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="deadlineDate"
                        name="deadlineDate"
                        value={step4Form.deadlineDate}
                        onChange={handleStep4Change}
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step4Form.deadlineDate ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="costScopeDescription" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Cost Scope Description
                      </label>
                      <textarea
                        className="form-control"
                        id="costScopeDescription"
                        name="costScopeDescription"
                        value={step4Form.costScopeDescription}
                        onChange={handleStep4Change}
                        rows="4"
                        placeholder="Describe the cost scope and requirements"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step4Form.costScopeDescription ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          minHeight: '120px'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="referenceFiles" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Attach Reference Files
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="referenceFiles"
                        name="referenceFiles"
                        onChange={handleStep4Change}
                        multiple
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step4Form.referenceFiles && step4Form.referenceFiles.length > 0 ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                      {step4Form.referenceFiles && step4Form.referenceFiles.length > 0 && (
                        <div style={{
                          marginTop: '8px',
                          padding: '8px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '4px',
                          fontSize: '0.85rem'
                        }}>
                          {step4Form.referenceFiles.length} file(s) selected
                        </div>
                      )}
                    </div>
                    <div className="modal-footer" style={{
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      padding: '24px 32px',
                      borderRadius: '0 0 16px 16px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px'
                    }}>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleBackStep}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: '#e0e0e0',
                          color: '#616161',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f5f5f5';
                          e.target.style.borderColor = '#bdbdbd';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e0e0e0';
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: '#1976d2',
                          borderColor: '#1976d2',
                          color: 'white',
                          padding: '10px 24px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#1565c0';
                          e.target.style.borderColor = '#1565c0';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#1976d2';
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Save & Continue
                      </button>
                    </div>
                  </form>
                ) : currentStep === 5 ? (
                  <form onSubmit={handleStep5Submit}>
                    <div className="mb-4">
                      <label htmlFor="portalName" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Portal Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="portalName"
                        name="portalName"
                        value={step5Form.portalName}
                        onChange={handleStep5Change}
                        placeholder="Enter portal name"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step5Form.portalName ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="portalUrl" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Portal URL
                      </label>
                      <input
                        type="url"
                        className="form-control"
                        id="portalUrl"
                        name="portalUrl"
                        value={step5Form.portalUrl}
                        onChange={handleStep5Change}
                        placeholder="https://example.com/portal"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step5Form.portalUrl ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="loginId" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Login ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="loginId"
                        name="loginId"
                        value={step5Form.loginId}
                        onChange={handleStep5Change}
                        placeholder="Enter login ID or email"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step5Form.loginId ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="registrationStatus" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Registration Status
                      </label>
                      <select
                        className="form-control"
                        id="registrationStatus"
                        name="registrationStatus"
                        value={step5Form.registrationStatus}
                        onChange={handleStep5Change}
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step5Form.registrationStatus ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          appearance: 'none',
                          backgroundColor: 'white'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      >
                        <option value="">Select registration status</option>
                        <option value="Registered">Registered</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="credentialsNotes" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Credentials Notes
                      </label>
                      <textarea
                        className="form-control"
                        id="credentialsNotes"
                        name="credentialsNotes"
                        value={step5Form.credentialsNotes}
                        onChange={handleStep5Change}
                        rows="3"
                        placeholder="Add any important notes about credentials, security questions, recovery options, etc."
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step5Form.credentialsNotes ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          minHeight: '100px'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      ></textarea>
                    </div>
                    <div className="modal-footer" style={{
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      padding: '24px 32px',
                      borderRadius: '0 0 16px 16px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px'
                    }}>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleBackStep}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: '#e0e0e0',
                          color: '#616161',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f5f5f5';
                          e.target.style.borderColor = '#bdbdbd';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e0e0e0';
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: '#1976d2',
                          borderColor: '#1976d2',
                          color: 'white',
                          padding: '10px 24px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#1565c0';
                          e.target.style.borderColor = '#1565c0';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#1976d2';
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Save & Continue
                      </button>
                    </div>
                  </form>
                ) : currentStep === 6 ? (
                  <form onSubmit={handleStep6Submit}>
                    <div className="mb-4">
                      <label htmlFor="requiredDocuments" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Upload Required Documents
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="requiredDocuments"
                        name="requiredDocuments"
                        onChange={handleStep6Change}
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step6Form.requiredDocuments && step6Form.requiredDocuments.length > 0 ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                      {step6Form.requiredDocuments.length > 0 && (
                        <div style={{
                          marginTop: '8px',
                          padding: '8px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '4px',
                          fontSize: '0.85rem'
                        }}>
                          {step6Form.requiredDocuments.length} document(s) selected
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '12px',
                        display: 'block'
                      }}>
                        Checklist
                      </label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type="checkbox"
                            id="aadhaar"
                            name="aadhaar"
                            checked={step6Form.checklist.aadhaar}
                            onChange={handleStep6Change}
                            style={{
                              width: '18px',
                              height: '18px',
                              marginRight: '10px'
                            }}
                          />
                          <label htmlFor="aadhaar" style={{
                            margin: 0,
                            color: '#212121',
                            fontSize: '0.95rem'
                          }}>
                            Aadhaar Card
                          </label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type="checkbox"
                            id="pan"
                            name="pan"
                            checked={step6Form.checklist.pan}
                            onChange={handleStep6Change}
                            style={{
                              width: '18px',
                              height: '18px',
                              marginRight: '10px'
                            }}
                          />
                          <label htmlFor="pan" style={{
                            margin: 0,
                            color: '#212121',
                            fontSize: '0.95rem'
                          }}>
                            PAN Card
                          </label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type="checkbox"
                            id="gst"
                            name="gst"
                            checked={step6Form.checklist.gst}
                            onChange={handleStep6Change}
                            style={{
                              width: '18px',
                              height: '18px',
                              marginRight: '10px'
                            }}
                          />
                          <label htmlFor="gst" style={{
                            margin: 0,
                            color: '#212121',
                            fontSize: '0.95rem'
                          }}>
                            GST Certificate
                          </label>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <input
                            type="checkbox"
                            id="certificates"
                            name="certificates"
                            checked={step6Form.checklist.certificates}
                            onChange={handleStep6Change}
                            style={{
                              width: '18px',
                              height: '18px',
                              marginRight: '10px'
                            }}
                          />
                          <label htmlFor="certificates" style={{
                            margin: 0,
                            color: '#212121',
                            fontSize: '0.95rem'
                          }}>
                            Other Certificates
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="documentationStatus" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Documentation Status
                      </label>
                      <select
                        className="form-control"
                        id="documentationStatus"
                        name="documentationStatus"
                        value={step6Form.documentationStatus}
                        onChange={handleStep6Change}
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step6Form.documentationStatus ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          appearance: 'none',
                          backgroundColor: 'white'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      >
                        <option value="">Select documentation status</option>
                        <option value="Complete">Complete</option>
                        <option value="Pending">Pending</option>
                        <option value="Review Required">Review Required</option>
                        <option value="Incomplete">Incomplete</option>
                      </select>
                    </div>
                    <div className="modal-footer" style={{
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      padding: '24px 32px',
                      borderRadius: '0 0 16px 16px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px'
                    }}>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleBackStep}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: '#e0e0e0',
                          color: '#616161',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f5f5f5';
                          e.target.style.borderColor = '#bdbdbd';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e0e0e0';
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: '#1976d2',
                          borderColor: '#1976d2',
                          color: 'white',
                          padding: '10px 24px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#1565c0';
                          e.target.style.borderColor = '#1565c0';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#1976d2';
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Save & Continue
                      </button>
                    </div>
                  </form>
                ) : currentStep === 7 ? (
                  <form onSubmit={handleStep7Submit}>
                    <div className="mb-4">
                      <label htmlFor="paymentReferenceNo" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Payment Reference No
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="paymentReferenceNo"
                        name="paymentReferenceNo"
                        value={step7Form.paymentReferenceNo}
                        onChange={handleStep7Change}
                        placeholder="Enter payment reference number"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step7Form.paymentReferenceNo ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="paymentDate" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Payment Date
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="paymentDate"
                        name="paymentDate"
                        value={step7Form.paymentDate}
                        onChange={handleStep7Change}
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step7Form.paymentDate ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="amountPaid" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Amount Paid
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="amountPaid"
                        name="amountPaid"
                        value={step7Form.amountPaid}
                        onChange={handleStep7Change}
                        min="0"
                        step="0.01"
                        placeholder="Enter amount paid"
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step7Form.amountPaid ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="proofUpload" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Proof Upload
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="proofUpload"
                        name="proofUpload"
                        onChange={handleStep7Change}
                        accept=".pdf,.jpg,.jpeg,.png"
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step7Form.proofUpload ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      />
                      {step7Form.proofUpload && (
                        <div style={{
                          marginTop: '8px',
                          padding: '8px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '4px',
                          fontSize: '0.85rem'
                        }}>
                          {step7Form.proofUpload.name} selected
                        </div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="paymentStatus" className="form-label" style={{
                        color: '#212121',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        marginBottom: '8px',
                        display: 'block'
                      }}>
                        Payment Status
                      </label>
                      <select
                        className="form-control"
                        id="paymentStatus"
                        name="paymentStatus"
                        value={step7Form.paymentStatus}
                        onChange={handleStep7Change}
                        required
                        style={{
                          borderColor: '#e0e0e0',
                          borderRadius: '8px',
                          padding: '12px 16px',
                          fontSize: '1rem',
                          color: step7Form.paymentStatus ? '#000000' : '#495057',
                          transition: 'all 0.2s ease',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          appearance: 'none',
                          backgroundColor: 'white'
                        }}
                        onMouseEnter={(e) => e.target.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)'}
                        onMouseLeave={(e) => e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'}
                      >
                        <option value="">Select payment status</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </div>
                    <div className="modal-footer" style={{
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      padding: '24px 32px',
                      borderRadius: '0 0 16px 16px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px'
                    }}>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleBackStep}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: '#e0e0e0',
                          color: '#616161',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f5f5f5';
                          e.target.style.borderColor = '#bdbdbd';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e0e0e0';
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: '#1976d2',
                          borderColor: '#1976d2',
                          color: 'white',
                          padding: '10px 24px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#1565c0';
                          e.target.style.borderColor = '#1565c0';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(25, 118, 210, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#1976d2';
                          e.target.style.borderColor = '#1976d2';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Save & Continue
                      </button>
                    </div>
                  </form>
                ) : currentStep === 8 ? (
                  <form onSubmit={handleStep8Submit}>
                    <div style={{
                      textAlign: 'center',
                      padding: '40px 20px',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '12px',
                      marginBottom: '24px'
                    }}>
                      <div style={{
                        fontSize: '3rem',
                        color: '#28a745',
                        marginBottom: '16px'
                      }}>
                        🎉
                      </div>
                      <h3 style={{
                        color: '#212121',
                        marginBottom: '12px',
                        fontWeight: '600'
                      }}>
                        Workflow Complete!
                      </h3>
                      <p style={{
                        color: '#6c757d',
                        fontSize: '1.1rem',
                        marginBottom: '24px'
                      }}>
                        All 8 steps have been completed successfully.
                        <br />
                        You can now submit this tender workflow.
                      </p>
                      <div style={{
                        backgroundColor: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        border: '2px solid #28a745',
                        display: 'inline-block'
                      }}>
                        <div style={{
                          fontSize: '1.2rem',
                          fontWeight: '600',
                          color: '#28a745',
                          marginBottom: '8px'
                        }}>
                          Steps Completed: 8/8
                        </div>
                        <div style={{
                          fontSize: '1rem',
                          color: '#17a2b8',
                          fontWeight: '500'
                        }}>
                          Status: Ready for Submission
                        </div>
                      </div>
                    </div>

                    <div className="modal-footer" style={{
                      borderTop: '1px solid #e0e0e0',
                      backgroundColor: 'white',
                      padding: '24px 32px',
                      borderRadius: '0 0 16px 16px',
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '12px'
                    }}>
                      <button
                        type="button"
                        className="btn"
                        onClick={handleBackStep}
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: '#e0e0e0',
                          color: '#616161',
                          padding: '10px 20px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#f5f5f5';
                          e.target.style.borderColor = '#bdbdbd';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.borderColor = '#e0e0e0';
                        }}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: '#28a745',
                          borderColor: '#28a745',
                          color: 'white',
                          padding: '10px 24px',
                          borderRadius: '8px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#218838';
                          e.target.style.borderColor = '#1e7e34';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#28a745';
                          e.target.style.borderColor = '#28a745';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                      >
                        Submit Workflow
                      </button>
                    </div>
                  </form>
                ) : null}
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

      {/* Enhanced Workflow Modal with Responsive Design */}
      {/* Workflow modal functionality completely removed from accepted tenders */}
    </NotificationProvider>
  );
}

export default App;