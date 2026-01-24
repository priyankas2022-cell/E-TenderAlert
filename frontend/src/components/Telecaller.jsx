import React, { useState, useEffect } from 'react';
import telecallerBg from './telecaller_bc.jpg';

const Telecaller = ({ setAddLeadModalOpen }) => {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      company: "Solar Solutions Inc.",
      interest: "50MW solar plant tender",
      lastContact: "2 days ago",
      status: "interested",
      priority: "high",
      nextFollowUp: "2023-11-25",
      source: "Website Form"
    },
    {
      id: 2,
      name: "Priya Sharma",
      company: "Green Energy Corp",
      interest: "Street light project",
      lastContact: "1 day ago",
      status: "follow-up",
      priority: "medium",
      nextFollowUp: "2023-11-23",
      source: "Referral"
    },
    {
      id: 3,
      name: "Vikram Singh",
      company: "EV Innovations Ltd",
      interest: "EV charging station requirements",
      lastContact: "3 hours ago",
      status: "new",
      priority: "high",
      nextFollowUp: "2023-11-22",
      source: "LinkedIn"
    },
    {
      id: 4,
      name: "Anita Desai",
      company: "Power Grid Solutions",
      interest: "BESS implementation query",
      lastContact: "1 week ago",
      status: "pending",
      priority: "low",
      nextFollowUp: "2023-11-30",
      source: "Email Campaign"
    }
  ]);

  const [stats, setStats] = useState({
    totalLeads: 47,
    callsToday: 23,
    followUps: 12,
    successRate: 68,
    conversionRate: 24,
    avgResponseTime: "2.3 hrs"
  });

  // Simulate counter animation
  useEffect(() => {
    const animateCounters = () => {
      const counters = document.querySelectorAll('.telecaller-stat .counter');
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        if (!isNaN(target)) {
          counter.innerText = '0';

          const duration = 2000;
          const startTime = Date.now();

          const updateCounter = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(target * easeOutQuart);

            counter.innerText = target.toString().includes('%') ? current + '%' : current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target.toString().includes('%') ? target + '%' : target;
            }
          };

          requestAnimationFrame(updateCounter);
        }
      });
    };

    // Animate counters when component mounts
    setTimeout(animateCounters, 500);
  }, []);

  const handleCall = (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    alert(`Calling ${lead.name} at ${lead.company}...`);
  };

  const handleRemind = (leadId) => {
    const lead = leads.find(l => l.id === leadId);
    alert(`Setting reminder for ${lead.name}...`);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'interested': return 'status-interested';
      case 'follow-up': return 'status-followup';
      case 'new': return 'status-new';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'Website Form': return 'fas fa-globe';
      case 'Referral': return 'fas fa-user-friends';
      case 'LinkedIn': return 'fab fa-linkedin';
      case 'Email Campaign': return 'fas fa-envelope';
      default: return 'fas fa-question-circle';
    }
  };

  return (
    <section
      id="telecaller"
      className="dashboard telecaller-section"
      style={{
        backgroundImage: `url(${telecallerBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <div className="section-title">
          <h2><i className="fas fa-crown royal-icon"></i> Royal Telecaller Dashboard</h2>
          <p>Manage leads and follow-ups for tender opportunities with premium features</p>
        </div>

        <div className="telecaller-dashboard animate__animated animate__fadeInUp">
          {/* Floating Royal Elements */}
          <div className="royal-floating-elements">
            <div className="floating-element floating-element-1"></div>
            <div className="floating-element floating-element-2"></div>
            <div className="floating-element floating-element-3"></div>
          </div>

          <div className="telecaller-header">
            <div className="telecaller-title">
              <i className="fas fa-headset"></i> Lead Management
              <span className="royal-badge">Premium</span>
            </div>
            <div className="telecaller-actions">
              <button className="btn btn-primary" onClick={() => setAddLeadModalOpen(true)}>
                <i className="fas fa-plus me-2"></i> Add New Lead
              </button>
              <button className="btn btn-secondary">
                <i className="fas fa-download me-2"></i> Export Report
              </button>
            </div>
          </div>

          <div className="telecaller-stats">
            <div className="telecaller-stat royal-stat">
              <div className="stat-icon royal-icon-bg">
                <i className="fas fa-user-friends"></i>
              </div>
              <div className="stat-content">
                <h4 className="counter" data-target={stats.totalLeads}>{stats.totalLeads}</h4>
                <p>Total Leads</p>
              </div>
              <div className="stat-trend royal-trend-up">
                <i className="fas fa-arrow-up"></i> 12%
              </div>
            </div>
            <div className="telecaller-stat royal-stat">
              <div className="stat-icon royal-icon-bg">
                <i className="fas fa-phone-alt"></i>
              </div>
              <div className="stat-content">
                <h4 className="counter" data-target={stats.callsToday}>{stats.callsToday}</h4>
                <p>Calls Today</p>
              </div>
              <div className="stat-trend royal-trend-up">
                <i className="fas fa-arrow-up"></i> 8%
              </div>
            </div>
            <div className="telecaller-stat royal-stat">
              <div className="stat-icon royal-icon-bg">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="stat-content">
                <h4 className="counter" data-target={stats.followUps}>{stats.followUps}</h4>
                <p>Follow-ups</p>
              </div>
              <div className="stat-trend royal-trend-down">
                <i className="fas fa-arrow-down"></i> 3%
              </div>
            </div>
            <div className="telecaller-stat royal-stat">
              <div className="stat-icon royal-icon-bg">
                <i className="fas fa-chart-pie"></i>
              </div>
              <div className="stat-content">
                <h4 className="counter" data-target={`${stats.successRate}%`}>{stats.successRate}%</h4>
                <p>Success Rate</p>
              </div>
              <div className="stat-trend royal-trend-up">
                <i className="fas fa-arrow-up"></i> 5%
              </div>
            </div>
            <div className="telecaller-stat royal-stat">
              <div className="stat-icon royal-icon-bg">
                <i className="fas fa-percentage"></i>
              </div>
              <div className="stat-content">
                <h4 className="counter" data-target={`${stats.conversionRate}%`}>{stats.conversionRate}%</h4>
                <p>Conversion Rate</p>
              </div>
              <div className="stat-trend royal-trend-neutral">
                <i className="fas fa-equals"></i> 0%
              </div>
            </div>
            <div className="telecaller-stat royal-stat">
              <div className="stat-icon royal-icon-bg">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-content">
                <h4 className="counter" data-target={stats.avgResponseTime}>{stats.avgResponseTime}</h4>
                <p>Avg Response</p>
              </div>
              <div className="stat-trend royal-trend-down">
                <i className="fas fa-arrow-down"></i> 15%
              </div>
            </div>
          </div>

          <div className="telecaller-controls">
            <div className="controls-left">
              <div className="search-box">
                <i className="fas fa-search"></i>
                <input type="text" placeholder="Search leads by name, company, or interest..." />
              </div>
            </div>
            <div className="controls-right">
              <button className="btn btn-filter">
                <i className="fas fa-filter"></i> Filter
              </button>
              <button className="btn btn-sort">
                <i className="fas fa-sort"></i> Sort
              </button>
              <button className="btn btn-view">
                <i className="fas fa-th-large"></i> View
              </button>
            </div>
          </div>

          <h5 className="mt-4 mb-3"><i className="fas fa-list me-2"></i>Recent Leads</h5>
          <div className="telecaller-leads">
            {leads.map(lead => (
              <div key={lead.id} className="lead-item animate__animated animate__fadeInUp royal-lead-item">
                <div className="lead-info">
                  <div className="lead-header">
                    <h6>{lead.name} - {lead.company}</h6>
                    <div className="lead-tags">
                      <span className={`lead-status ${getStatusClass(lead.status)}`}>
                        {lead.status}
                      </span>
                      <span className={`lead-priority ${getPriorityClass(lead.priority)}`}>
                        {lead.priority}
                      </span>
                      <span className="lead-source">
                        <i className={`${getSourceIcon(lead.source)} me-1`}></i>
                        {lead.source}
                      </span>
                    </div>
                  </div>
                  <p className="lead-interest">
                    <i className="fas fa-lightbulb me-2"></i>
                    {lead.interest}
                  </p>
                  <div className="lead-details">
                    <span className="last-contact">
                      <i className="fas fa-history me-1"></i>
                      Last contact: {lead.lastContact}
                    </span>
                    <span className="next-followup">
                      <i className="fas fa-calendar me-1"></i>
                      Next: {lead.nextFollowUp}
                    </span>
                  </div>
                </div>
                <div className="lead-actions">
                  <button
                    className="btn btn-call"
                    onClick={() => handleCall(lead.id)}
                    title="Call Lead"
                  >
                    <i className="fas fa-phone"></i>
                  </button>
                  <button
                    className="btn btn-remind"
                    onClick={() => handleRemind(lead.id)}
                    title="Set Reminder"
                  >
                    <i className="fas fa-bell"></i>
                  </button>
                  <button
                    className="btn btn-view"
                    title="View Details"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-assign"
                    title="Assign to Agent"
                  >
                    <i className="fas fa-user-plus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="telecaller-footer">
            <button className="btn btn-outline-primary">
              <i className="fas fa-sync-alt me-2"></i> Refresh Data
            </button>
            <button className="btn btn-outline-secondary">
              <i className="fas fa-file-export me-2"></i> Export Leads
            </button>
            <button className="btn btn-outline-success">
              <i className="fas fa-cog me-2"></i> Advanced Settings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Telecaller;