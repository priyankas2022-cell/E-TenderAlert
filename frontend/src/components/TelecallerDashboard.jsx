import React, { useState } from 'react';
import './TelecallerDashboard.css';
import TelecallerCalls from './TelecallerCalls';
import Leads from './Leads';
import Settings from './Settings';

const TelecallerDashboard = () => {
  // Mock data for KPI cards
  const kpiData = [
    { title: 'Total Calls', value: '1,248', change: '+12%', icon: 'fas fa-phone', type: 'primary', specialClass: 'total-calls-gradient' },
    { title: 'Successful Connects', value: '876', change: '+8%', icon: 'fas fa-check-circle', type: 'success', specialClass: 'successful-connects-gradient' },
    { title: 'Pending Follow-ups', value: '156', change: '-3%', icon: 'fas fa-clock', type: 'warning', specialClass: 'pending-followups-gradient' },
    { title: 'Conversion Rate', value: '24.5%', change: '+2.1%', icon: 'fas fa-chart-line', type: 'info', specialClass: 'conversion-rate-gradient' }
  ];

  // Mock data for recent calls
  const recentCalls = [
    { id: 1, name: 'Rajesh Kumar', company: 'Solar Solutions Inc.', time: '2 mins ago', status: 'completed', duration: '4:32' },
    { id: 2, name: 'Priya Sharma', company: 'Green Energy Corp', time: '15 mins ago', status: 'pending', duration: 'N/A' },
    { id: 3, name: 'Vikram Singh', company: 'EV Innovations Ltd', time: '1 hour ago', status: 'in-progress', duration: '2:15' },
    { id: 4, name: 'Anita Desai', company: 'Power Grid Solutions', time: '3 hours ago', status: 'completed', duration: '6:45' }
  ];



  // Mock data for reminders
  const reminders = [
    { id: 1, title: 'Follow up with Rajesh', description: 'Solar project discussion', time: 'Today, 3:00 PM', priority: 'high' },
    { id: 2, title: 'Call Priya Sharma', description: 'Quote for street lights', time: 'Tomorrow, 10:00 AM', priority: 'medium' },
    { id: 3, title: 'Send proposal to Vikram', description: 'EV charging stations', time: 'Tomorrow, 2:00 PM', priority: 'low' }
  ];

  // Mock data for timeline
  const timelineEvents = [
    { id: 1, title: 'New lead received', description: 'Solar Solutions Inc. submitted inquiry', time: '10:30 AM' },
    { id: 2, title: 'Initial call completed', description: 'Discussed project requirements with Rajesh', time: '11:45 AM' },
    { id: 3, title: 'Proposal sent', description: 'E-mailed detailed proposal for review', time: '2:15 PM' },
    { id: 4, title: 'Follow-up scheduled', description: 'Meeting set for project discussion', time: '4:30 PM' }
  ];

  const getStatusClass = (status) => {
    switch(status) {
      case 'completed': return 'completed';
      case 'pending': return 'pending';
      case 'in-progress': return 'in-progress';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };
  
  // Handle opening add reminder modal
  const openAddReminderModal = () => {
    setEditingReminder(null);
    setReminderTitle('');
    setReminderDescription('');
    setReminderDate('');
    setReminderTime('');
    setShowReminderModal(true);
  };
  
  // Handle opening edit reminder modal
  const openEditReminderModal = (reminder) => {
    setEditingReminder(reminder);
    setReminderTitle(reminder.title);
    setReminderDescription(reminder.description);
    // Parse time from reminder.time string (e.g., "Today, 3:00 PM")
    const timeMatch = reminder.time.match(/(\d+:\d+)\s*(AM|PM)/i);
    if (timeMatch) {
      setReminderTime(timeMatch[1].toLowerCase() + ' ' + timeMatch[2].toLowerCase());
    }
    setShowReminderModal(true);
  };
  
  // Handle saving reminder
  const saveReminder = () => {
    if (!reminderTitle.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newReminder = {
        id: editingReminder ? editingReminder.id : Date.now(),
        title: reminderTitle,
        description: reminderDescription,
        time: reminderTime ? `Today, ${reminderTime}` : 'Today',
        priority: 'medium'
      };
      
      if (editingReminder) {
        // Update existing reminder
        setLocalReminders(prev => 
          prev.map(r => r.id === editingReminder.id ? newReminder : r)
        );
        showToast(editingReminder ? 'Reminder updated successfully' : 'Reminder added successfully', 'success');
      } else {
        // Add new reminder
        setLocalReminders(prev => [...prev, newReminder]);
        showToast('Reminder added successfully', 'success');
      }
      
      setIsLoading(false);
      setShowReminderModal(false);
    }, 500);
  };
  
  // Handle deleting reminder
  const deleteReminder = (id) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      setIsLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        setLocalReminders(prev => prev.filter(r => r.id !== id));
        showToast('Reminder deleted successfully', 'success');
        setIsLoading(false);
      }, 300);
    }
  };
  
  // Close modal
  const closeReminderModal = () => {
    setShowReminderModal(false);
    setEditingReminder(null);
  };
  
  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };
  
  // Close toast manually
  const closeToast = () => {
    setToast({ show: false, message: '', type: '' });
  };


  const [activeView, setActiveView] = useState('overview'); // Added state to manage active view
  const [leadsView, setLeadsView] = useState(null); // State for leads view
  
  // Reminder modal states
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDescription, setReminderDescription] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  
  // Local reminders state
  const [localReminders, setLocalReminders] = useState(reminders);
  
  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  
  // Loading state for skeleton
  const [isLoading, setIsLoading] = useState(false);
  
  // Helper function to categorize and sort reminders
  const categorizeAndSortReminders = (remindersList) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return remindersList
      .map(reminder => {
        // Parse time from reminder.time string
        let dateCategory = 'Upcoming';
        let colorClass = 'priority-low'; // Green
        
        if (reminder.time.includes('Today')) {
          dateCategory = 'Today';
          colorClass = 'priority-high'; // Red
        } else if (reminder.time.includes('Tomorrow')) {
          dateCategory = 'Tomorrow';
          colorClass = 'priority-medium'; // Orange
        }
        
        return {
          ...reminder,
          dateCategory,
          colorClass
        };
      })
      .sort((a, b) => {
        // Sort by date category: Today -> Tomorrow -> Upcoming
        const categoryOrder = { 'Today': 1, 'Tomorrow': 2, 'Upcoming': 3 };
        return categoryOrder[a.dateCategory] - categoryOrder[b.dateCategory];
      });
  };
  
  // Get sorted and categorized reminders
  const sortedReminders = categorizeAndSortReminders(localReminders);


  return (
    <div className="telecaller-dashboard-container">
      <div className="telecaller-dashboard telecaller-dashboard-with-sidebar">

      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Dashboard</h2>
        </div>
        <ul className="sidebar-menu">
          <li className={`menu-item ${activeView === 'overview' ? 'active' : ''}`} onClick={() => setActiveView('overview')}>
            <i className="fas fa-home"></i>
            <span>Overview</span>
          </li>
          <li className={`menu-item ${activeView === 'calls' ? 'active' : ''}`} onClick={() => setActiveView('calls')}>
            <i className="fas fa-phone"></i>
            <span>Calls</span>
          </li>
          <li className={`menu-item ${activeView === 'leads' ? 'active' : ''}`} onClick={() => setActiveView('leads')}>
            <i className="fas fa-users"></i>
            <span>Leads</span>
          </li>
          <li className="menu-item" onClick={() => setActiveView('settings')}>
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {activeView === 'overview' && (
          <div className="overview-content">
            <div className="dashboard-header">
              <h1>TeleCaller Dashboard</h1>
              <p>Monitor and manage your telecalling activities</p>
            </div>

            {/* KPI Cards */}
            <div className="kpi-cards">
              {kpiData.map((kpi, index) => (
                <div className={`card ${kpi.specialClass || ''}`} key={index}>
                  <div className="kpi-card">
                    <div className={`card-icon ${kpi.type}`}>
                      <i className={kpi.icon}></i>
                    </div>
                    <div className="card-content">
                      <h3>{kpi.value}</h3>
                      <p>{kpi.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Grid */}
            <div className="dashboard-grid">
              {/* Recent Calls Table */}
              <div className="card table-card">
                <div className="card-header">
                  <h2>Recent Calls</h2>
                  <button className="btn">
                    <i className="fas fa-plus"></i> New Call
                  </button>
                </div>
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Time</th>
                        <th>Status</th>
                        <th>Duration</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentCalls.map(call => (
                        <tr key={call.id}>
                          <td>{call.name}</td>
                          <td>{call.company}</td>
                          <td>{call.time}</td>
                          <td>
                            <span className={`status-badge ${getStatusClass(call.status)}`}>
                              {call.status}
                            </span>
                          </td>
                          <td>{call.duration}</td>
                          <td>
                            <button className="btn btn-sm btn-icon">
                              <i className="fas fa-eye"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>




              {/* Reminders */}
              <div className="card reminder-card">
                <div className="card-header">
                  <h2>Upcoming Reminders</h2>
                  <button className="btn" onClick={openAddReminderModal}>
                    <i className="fas fa-plus"></i> Add Reminder
                  </button>
                </div>
                <div className="reminders-list">
                  {isLoading ? (
                    // Skeleton loader
                    Array.from({ length: 3 }).map((_, index) => (
                      <div className="reminder-item skeleton-item" key={index} style={{
                        animation: 'pulse 1.5s ease-in-out infinite',
                        backgroundColor: '#f0f0f0'
                      }}>
                        <div className="reminder-content">
                          <div style={{
                            height: '20px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            marginBottom: '8px',
                            width: '60%'
                          }}></div>
                          <div style={{
                            height: '16px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            marginBottom: '4px',
                            width: '80%'
                          }}></div>
                          <div style={{
                            height: '14px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '4px',
                            width: '40%'
                          }}></div>
                        </div>
                        <div className="reminder-actions">
                          <div style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '50%',
                            marginRight: '8px'
                          }}></div>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            backgroundColor: '#e0e0e0',
                            borderRadius: '50%'
                          }}></div>
                        </div>
                      </div>
                    ))
                  ) : sortedReminders.length > 0 ? (
                    sortedReminders.map(reminder => (
                      <div className={`reminder-item ${reminder.colorClass}`} key={reminder.id}>
                        <div className="reminder-content">
                          <h4>{reminder.title}</h4>
                          <p>{reminder.description}</p>
                          <small className="reminder-time">
                            {reminder.dateCategory} {reminder.time.includes(',') ? reminder.time.split(',')[1] : reminder.time}
                          </small>
                        </div>
                        <div className="reminder-actions">
                          <button className="btn btn-sm" onClick={() => openEditReminderModal(reminder)}>
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn btn-sm" onClick={() => deleteReminder(reminder.id)}>
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Empty state
                    <div style={{
                      textAlign: 'center',
                      padding: '40px 20px',
                      color: '#64748b'
                    }}>
                      <i className="fas fa-bell-slash" style={{
                        fontSize: '3rem',
                        marginBottom: '16px',
                        color: '#cbd5e1'
                      }}></i>
                      <h3 style={{
                        margin: '0 0 8px 0',
                        color: '#64748b',
                        fontWeight: '500'
                      }}>No reminders yet</h3>
                      <p style={{
                        margin: 0,
                        color: '#94a3b8'
                      }}>Add your first reminder to get started</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        {activeView === 'calls' && <TelecallerCalls />}
        {activeView === 'leads' && <Leads />}
        {activeView === 'settings' && <Settings />}
        {activeView !== 'overview' && activeView !== 'calls' && activeView !== 'leads' && activeView !== 'settings' && (
          <div className="dashboard-header">
            <h1>{activeView.charAt(0).toUpperCase() + activeView.slice(1)} View</h1>
            <p>This section is under development</p>
          </div>
        )}

        {/* Reminder Modal */}
        {showReminderModal && (
          <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }} onClick={closeReminderModal}>
            <div className="modal-content" style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '20px',
              width: '90%',
              maxWidth: '500px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }} onClick={(e) => e.stopPropagation()}>
              <h3 style={{margin: '0 0 20px 0', color: '#1e293b'}}>
                {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}</h3>
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600', color: '#1e293b'}}>
                  Title *
                </label>
                <input
                  type="text"
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter reminder title"
                />
              </div>
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600', color: '#1e293b'}}>
                  Description
                </label>
                <textarea
                  value={reminderDescription}
                  onChange={(e) => setReminderDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    minHeight: '80px',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                  placeholder="Enter description (optional)"
                />
              </div>
              
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600', color: '#1e293b'}}>
                  Time
                </label>
                <input
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    fontSize: '0.9rem',
                    boxSizing: 'border-box'
                  }}
                  placeholder="set time"
                />
              </div>
              
              <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                <button
                  onClick={closeReminderModal}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    backgroundColor: 'white',
                    color: '#64748b',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={saveReminder}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #3b82f6',
                    borderRadius: '6px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  disabled={!reminderTitle.trim()}
                >
                  {editingReminder ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast.show && (
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'slideInRight 0.3s ease-out'
          }}>
            <i className={`fas ${toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            <span>{toast.message}</span>
            <button 
              onClick={closeToast}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                marginLeft: '8px',
                fontSize: '1.2rem'
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default TelecallerDashboard;