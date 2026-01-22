import React, { useState } from 'react';
import './TelecallerDashboard.css';

const Settings = () => {
  // Profile Settings State
  const [profile, setProfile] = useState({
    fullName: 'John Doe',
    email: 'john.doe@company.com',
    mobileNumber: '+91 9876543210',
    profilePhoto: null,
    designation: 'Telecaller'
  });

  // Account & Security State
  const [security, setSecurity] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    logoutAllDevices: false
  });

  // Call Preferences State
  const [callPreferences, setCallPreferences] = useState({
    defaultCallStatus: 'interested',
    autoSaveNotes: true,
    autoAssignNextLead: false,
    callReminderTime: '10 min'
  });

  // Notification Settings State
  const [notifications, setNotifications] = useState({
    newLeadAssigned: true,
    followUpReminder: true,
    tenderDeadlineAlert: true,
    deliveryMethod: ['in-app', 'email']
  });

  // Display Settings State
  const [display, setDisplay] = useState({
    language: 'english',
    themeMode: 'light',
    fontSize: 'medium'
  });

  // Activity & Performance State
  const [activity, setActivity] = useState({
    totalCalls: 1248,
    leadsContacted: 876,
    conversionRate: '24.5%',
    lastLogin: 'Jan 9, 2026 at 6:30 PM'
  });

  // Form handlers
  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSecurityChange = (e) => {
    if (e.target.type === 'checkbox') {
      setSecurity({
        ...security,
        [e.target.name]: e.target.checked
      });
    } else {
      setSecurity({
        ...security,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleCallPreferencesChange = (e) => {
    if (e.target.type === 'checkbox') {
      setCallPreferences({
        ...callPreferences,
        [e.target.name]: e.target.checked
      });
    } else {
      setCallPreferences({
        ...callPreferences,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleNotificationChange = (e) => {
    if (e.target.type === 'checkbox') {
      if (e.target.name === 'inApp' || e.target.name === 'email' || e.target.name === 'sms') {
        let newDeliveryMethods = [...notifications.deliveryMethod];
        if (e.target.checked) {
          newDeliveryMethods.push(e.target.name);
        } else {
          newDeliveryMethods = newDeliveryMethods.filter(method => method !== e.target.name);
        }
        setNotifications({
          ...notifications,
          deliveryMethod: newDeliveryMethods
        });
      } else {
        setNotifications({
          ...notifications,
          [e.target.name]: e.target.checked
        });
      }
    }
  };

  const handleDisplayChange = (e) => {
    setDisplay({
      ...display,
      [e.target.name]: e.target.value
    });
  };

  // Form submission handlers
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Updating profile:', profile);
    alert('Profile updated successfully!');
  };

  const handleSaveSecurity = (e) => {
    e.preventDefault();
    // Validate passwords match
    if (security.newPassword !== security.confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    // Simulate API call
    console.log('Saving security settings:', security);
    alert('Security settings saved successfully!');
  };

  const handleSaveCallPreferences = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Saving call preferences:', callPreferences);
    alert('Call preferences saved successfully!');
  };

  const handleSaveNotifications = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Saving notification settings:', notifications);
    alert('Notification settings saved successfully!');
  };

  const handleSaveDisplay = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Saving display settings:', display);
    alert('Display settings saved successfully!');
  };

  const handleClearCache = () => {
    // Simulate clearing cache
    console.log('Clearing local cache...');
    alert('Local cache cleared successfully!');
  };

  return (
    <div className="settings-page">
      <div className="dashboard-header">
        <h1>Settings</h1>
        <p>Manage your telecaller account preferences and security</p>
      </div>

      <div className="settings-grid">
        {/* Profile Settings */}
        <div className="card settings-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-user-circle"></i> Profile Settings
            </h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleUpdateProfile}>
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={profile.fullName}
                    onChange={handleProfileChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    readOnly
                    className="form-control readonly"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={profile.mobileNumber}
                    onChange={handleProfileChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={profile.designation}
                    readOnly
                    className="form-control readonly"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Profile Photo</label>
                <div className="profile-photo-upload">
                  <img 
                    src={profile.profilePhoto || "https://via.placeholder.com/100"} 
                    alt="Profile" 
                    className="profile-preview"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Update Profile
                </button>
                <button type="button" className="btn btn-secondary">
                  <i className="fas fa-times"></i> Cancel Changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Account & Security */}
        <div className="card settings-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-shield-alt"></i> Account & Security
            </h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleSaveSecurity}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={security.currentPassword}
                  onChange={handleSecurityChange}
                  className="form-control"
                  placeholder="Enter current password"
                />
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={security.newPassword}
                  onChange={handleSecurityChange}
                  className="form-control"
                  placeholder="Enter new password"
                />
              </div>
              
              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={security.confirmPassword}
                  onChange={handleSecurityChange}
                  className="form-control"
                  placeholder="Confirm new password"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    name="twoFactorAuth"
                    checked={security.twoFactorAuth}
                    onChange={handleSecurityChange}
                    id="twoFactorAuth"
                  />
                  <label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    name="logoutAllDevices"
                    checked={security.logoutAllDevices}
                    onChange={handleSecurityChange}
                    id="logoutAllDevices"
                  />
                  <label htmlFor="logoutAllDevices">Logout from all devices</label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Save Security Settings
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Call Preferences */}
        <div className="card settings-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-phone"></i> Call Preferences
            </h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleSaveCallPreferences}>
              <div className="form-group">
                <label>Default Call Status</label>
                <select
                  name="defaultCallStatus"
                  value={callPreferences.defaultCallStatus}
                  onChange={handleCallPreferencesChange}
                  className="form-control"
                >
                  <option value="interested">Interested</option>
                  <option value="not-interested">Not Interested</option>
                  <option value="callback-required">Callback Required</option>
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    name="autoSaveNotes"
                    checked={callPreferences.autoSaveNotes}
                    onChange={handleCallPreferencesChange}
                    id="autoSaveNotes"
                  />
                  <label htmlFor="autoSaveNotes">Auto-save call notes</label>
                </div>
                
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    name="autoAssignNextLead"
                    checked={callPreferences.autoAssignNextLead}
                    onChange={handleCallPreferencesChange}
                    id="autoAssignNextLead"
                  />
                  <label htmlFor="autoAssignNextLead">Auto-assign next lead after call</label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Call Reminder Time</label>
                <select
                  name="callReminderTime"
                  value={callPreferences.callReminderTime}
                  onChange={handleCallPreferencesChange}
                  className="form-control"
                >
                  <option value="5 min">5 minutes</option>
                  <option value="10 min">10 minutes</option>
                  <option value="15 min">15 minutes</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Save Call Preferences
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card settings-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-bell"></i> Notification Settings
            </h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleSaveNotifications}>
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  name="newLeadAssigned"
                  checked={notifications.newLeadAssigned}
                  onChange={handleNotificationChange}
                  id="newLeadAssigned"
                />
                <label htmlFor="newLeadAssigned">New Lead Assigned</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  name="followUpReminder"
                  checked={notifications.followUpReminder}
                  onChange={handleNotificationChange}
                  id="followUpReminder"
                />
                <label htmlFor="followUpReminder">Follow-up Reminder</label>
              </div>
              
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  name="tenderDeadlineAlert"
                  checked={notifications.tenderDeadlineAlert}
                  onChange={handleNotificationChange}
                  id="tenderDeadlineAlert"
                />
                <label htmlFor="tenderDeadlineAlert">Tender Deadline Alert</label>
              </div>
              
              <div className="form-group">
                <label>Notification Delivery Method</label>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="inApp"
                    checked={notifications.deliveryMethod.includes('in-app')}
                    onChange={handleNotificationChange}
                    id="inApp"
                  />
                  <label htmlFor="inApp">In-App</label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="email"
                    checked={notifications.deliveryMethod.includes('email')}
                    onChange={handleNotificationChange}
                    id="email"
                  />
                  <label htmlFor="email">Email</label>
                </div>
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    name="sms"
                    checked={notifications.deliveryMethod.includes('sms')}
                    onChange={handleNotificationChange}
                    id="sms"
                  />
                  <label htmlFor="sms">SMS</label>
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Save Notification Settings
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Language & Display */}
        <div className="card settings-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-sliders-h"></i> Language & Display
            </h2>
          </div>
          <div className="card-content">
            <form onSubmit={handleSaveDisplay}>
              <div className="form-group">
                <label>Preferred Language</label>
                <select
                  name="language"
                  value={display.language}
                  onChange={handleDisplayChange}
                  className="form-control"
                >
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="regional">Regional Languages (Future)</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Theme Mode</label>
                <select
                  name="themeMode"
                  value={display.themeMode}
                  onChange={handleDisplayChange}
                  className="form-control"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Font Size</label>
                <select
                  name="fontSize"
                  value={display.fontSize}
                  onChange={handleDisplayChange}
                  className="form-control"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Save Display Settings
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Activity & Performance */}
        <div className="card settings-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-chart-bar"></i> Activity & Performance
            </h2>
          </div>
          <div className="card-content">
            <div className="performance-stats">
              <div className="stat-item">
                <h3>{activity.totalCalls.toLocaleString()}</h3>
                <p>Total Calls Made</p>
              </div>
              <div className="stat-item">
                <h3>{activity.leadsContacted.toLocaleString()}</h3>
                <p>Leads Contacted</p>
              </div>
              <div className="stat-item">
                <h3>{activity.conversionRate}</h3>
                <p>Conversion Rate</p>
              </div>
              <div className="stat-item">
                <h3>{activity.lastLogin}</h3>
                <p>Last Login</p>
              </div>
            </div>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="card settings-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-lock"></i> Data & Privacy
            </h2>
          </div>
          <div className="card-content">
            <div className="privacy-actions">
              <button 
                className="btn btn-warning"
                onClick={handleClearCache}
              >
                <i className="fas fa-trash-alt"></i> Clear Local Cache
              </button>
              <a href="#privacy-policy" className="btn btn-link">
                Privacy Policy
              </a>
              <a href="#terms-of-use" className="btn btn-link">
                Terms of Use
              </a>
            </div>
          </div>
        </div>

        {/* Support & Help */}
        <div className="card settings-card">
          <div className="card-header">
            <h2>
              <i className="fas fa-question-circle"></i> Support & Help
            </h2>
          </div>
          <div className="card-content">
            <div className="support-actions">
              <button className="btn btn-info">
                <i className="fas fa-ticket-alt"></i> Contact Admin / Support Ticket
              </button>
              <button className="btn btn-secondary">
                <i className="fas fa-book"></i> FAQs for Telecallers
              </button>
              <div className="system-version">
                <p>System Version: 1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;