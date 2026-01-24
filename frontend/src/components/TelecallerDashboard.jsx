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

  // Mock data for funnel chart
  const funnelData = [
    { stage: 'Incoming Leads', count: 1248, description: 'New prospects from all sources' },
    { stage: 'Qualified Leads', count: 876, description: 'Leads that match our criteria' },
    { stage: 'Contacted', count: 654, description: 'Initial contact established' },
    { stage: 'Converted', count: 248, description: 'Successfully converted to clients' }
  ];

  // Mock data for bar chart
  const barChartData = [
    { day: 'Mon', calls: 120 },
    { day: 'Tue', calls: 150 },
    { day: 'Wed', calls: 180 },
    { day: 'Thu', calls: 140 },
    { day: 'Fri', calls: 160 },
    { day: 'Sat', calls: 90 },
    { day: 'Sun', calls: 70 }
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

  const [activeView, setActiveView] = useState('overview'); // Added state to manage active view
  const [leadsView, setLeadsView] = useState(null); // State for leads view
  const [timelineExpanded, setTimelineExpanded] = useState(false); // State for timeline expansion

  return (
    <div className="telecaller-dashboard-container">
      <div className="telecaller-dashboard telecaller-dashboard-with-sidebar">
        {/* Top Navigation */}
      <div className="top-nav">
        <div className="nav-left">
          <button className="menu-toggle">
            <i className="fas fa-bars"></i>
          </button>
          <div className="logo">TeleCaller Pro</div>
        </div>
        <div className="nav-right">
          <div className="nav-item notifications">
            <i className="fas fa-bell"></i>
            <span className="notification-badge">3</span>
          </div>
          <div className="profile">
            <img src="https://via.placeholder.com/35" alt="Profile" />
            <span className="profile-name">John Doe</span>
          </div>
        </div>
      </div>

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

              {/* Funnel Chart */}
              <div className="card chart-card">
                <div className="card-header">
                  <h2>Lead Conversion Funnel</h2>
                </div>
                <div className="chart-container">
                  <div className="funnel-chart">
                    {funnelData.map((stage, index) => (
                      <div className="funnel-stage" key={index} style={{ width: `${100 - index * 15}%` }}>
                        <div className="stage-content">
                          <h3>{stage.count}</h3>
                          <p>{stage.stage}</p>
                          <small>{stage.description}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="card chart-card">
                <div className="card-header">
                  <h2>Weekly Call Volume</h2>
                </div>
                <div className="chart-container">
                  <div className="bar-chart">
                    {barChartData.map((item, index) => (
                      <div className="bar-container" key={index}>
                        <div 
                          className="bar" 
                          style={{ height: `${(item.calls / 200) * 100}%` }}
                        >
                          <span className="bar-value">{item.calls}</span>
                        </div>
                        <div className="bar-label">{item.day}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reminders */}
              <div className="card reminder-card">
                <div className="card-header">
                  <h2>Upcoming Reminders</h2>
                  <button className="btn">
                    <i className="fas fa-plus"></i> Add Reminder
                  </button>
                </div>
                <div className="reminders-list">
                  {reminders.map(reminder => (
                    <div className={`reminder-item ${getPriorityClass(reminder.priority)}`} key={reminder.id}>
                      <div className="reminder-content">
                        <h4>{reminder.title}</h4>
                        <p>{reminder.description}</p>
                        <small className="reminder-time">{reminder.time}</small>
                      </div>
                      <div className="reminder-actions">
                        <button className="btn btn-sm">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-sm">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Timeline Dropdown */}
              <div className="card timeline-card">
                <div className="card-header">
                  <h2>Activity Timeline</h2>
                  <button className="dropdown-toggle" onClick={() => setTimelineExpanded(!timelineExpanded)}>
                    <i className={`fas fa-chevron-${timelineExpanded ? 'up' : 'down'}`}></i>
                  </button>
                </div>
                {timelineExpanded && (
                  <div className="timeline">
                    {timelineEvents.map((event, index) => (
                      <div className="timeline-item" key={index}>
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                          <h4>{event.title}</h4>
                          <p>{event.description}</p>
                          <small className="timeline-time">{event.time}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
      </div>
    </div>
    </div>
  );
};

export default TelecallerDashboard;