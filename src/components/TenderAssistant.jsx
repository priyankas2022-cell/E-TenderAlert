import React, { useRef, useEffect, useState } from 'react';
import aiChatbotIcon from './ai_chatbot.jpeg';

const TenderAssistant = ({ 
  botOpen, 
  toggleBot, 
  botMessages, 
  botInput, 
  setBotInput, 
  handleBotSend, 
  handleBotKeyPress, 
  askForName, 
  isSpeaking, 
  handleStopSpeaking,
  userName,
  isTyping
}) => {
  const botMessagesRef = useRef(null);
  const [showQuickOptions, setShowQuickOptions] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('connected');

  // Scroll to bottom of bot messages when new messages are added
  useEffect(() => {
    if (botMessagesRef.current) {
      botMessagesRef.current.scrollTop = botMessagesRef.current.scrollHeight;
    }
  }, [botMessages]);

  // Update unread count when messages are added and chat is closed
  useEffect(() => {
    if (!botOpen && botMessages.length > 1) {
      setUnreadCount(prev => prev + 1);
    }
  }, [botMessages, botOpen]);

  // Reset unread count when chat is opened
  useEffect(() => {
    if (botOpen) {
      setUnreadCount(0);
    }
  }, [botOpen]);

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ['connected', 'connecting', 'disconnected'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setConnectionStatus(randomStatus);
      setIsOnline(randomStatus === 'connected');
    }, 30000); // Change status every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Quick response options with categories
  const quickOptions = [
    { id: 1, text: "Find Tenders", icon: "🔍", category: "search" },
    { id: 2, text: "Track Progress", icon: "📊", category: "tracking" },
    { id: 3, text: "Upcoming Deadlines", icon: "⏰", category: "deadlines" },
    { id: 4, text: "Need Help", icon: "💡", category: "help" },
    { id: 5, text: "My Profile", icon: "👤", category: "profile" },
    { id: 6, text: "Settings", icon: "⚙️", category: "settings" }
  ];

  // Handle quick option selection
  const handleQuickOptionSelect = (optionText) => {
    setBotInput(optionText);
    setShowQuickOptions(false);
    
    // Auto-send after a short delay
    setTimeout(() => {
      handleBotSend();
    }, 300);
  };

  // Handle file attachment
  const handleAttachFile = () => {
    // In a real implementation, this would open a file dialog
    alert('File attachment feature would open here');
  };

  // Handle voice input
  const handleVoiceInput = () => {
    // In a real implementation, this would start voice recognition
    alert('Voice input feature would start here');
  };

  return (
    <div className="bot-container">
      <div className="bot-button" onClick={toggleBot}>
        <img src={aiChatbotIcon} alt="AI Assistant" className="bot-button-image" />
        {unreadCount > 0 && (
          <span className="bot-unread-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
        <div className={`bot-status-indicator ${isOnline ? 'online' : 'offline'}`}></div>
      </div>
      {botOpen && (
        <div className={`bot-window ${isMinimized ? 'minimized' : ''}`}>
          <div className="bot-header">
            <div className="bot-title">
              <div className="bot-title-content">
                <img src={aiChatbotIcon} alt="AI Assistant" className="bot-title-image" />
                <span>Tender Assistant</span>
              </div>
              <div className="bot-status">
                <span className={`status-dot ${isOnline ? 'online' : 'offline'}`}></span>
                <span className="status-text">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
            </div>
            <div className="bot-header-actions">
              <button className="bot-minimize" onClick={() => setIsMinimized(!isMinimized)}>
                <i className={`fas ${isMinimized ? 'fa-expand' : 'fa-minus'}`}></i>
              </button>
              <button className="bot-close" onClick={() => toggleBot()}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="bot-messages" ref={botMessagesRef}>
                {botMessages.map((message) => (
                  <div key={message.id} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
                    {message.isUser ? (
                      <div className="user-message-content">
                        <div className="message-text">{message.text}</div>
                        <div className="message-time">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                      </div>
                    ) : (
                      <div className="bot-message-content">
                        <div className="bot-avatar">
                          <i className="fas fa-female"></i>
                        </div>
                        <div className="message-content-wrapper">
                          <div className="message-text">{message.text}</div>
                          <div className="message-time">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Show quick options if no user message has been sent yet */}
                {showQuickOptions && botMessages.length <= 1 && (
                  <div className="quick-options-container">
                    <div className="quick-options-title">How can I help you today?</div>
                    <div className="quick-options-grid">
                      {quickOptions.map(option => (
                        <button 
                          key={option.id} 
                          className={`quick-option-btn ${option.category}`}
                          onClick={() => handleQuickOptionSelect(option.text)}
                        >
                          <span className="quick-option-icon">{option.icon}</span>
                          <span className="quick-option-text">{option.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Typing indicator when bot is "thinking" */}
                {isTyping && (
                  <div className="bot-message">
                    <div className="bot-message-content">
                      <div className="bot-avatar">
                        <img src={aiChatbotIcon} alt="AI Assistant" className="bot-avatar-image" />
                      </div>
                      <div className="typing-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bot-input-area">
                <div className="bot-input-tools">
                  <button className="tool-btn" onClick={handleAttachFile} title="Attach file">
                    <i className="fas fa-paperclip"></i>
                  </button>
                  <button className="tool-btn" onClick={handleVoiceInput} title="Voice input">
                    <i className="fas fa-microphone"></i>
                  </button>
                </div>
                <div className="bot-input-container">
                  <input
                    type="text"
                    value={botInput}
                    onChange={(e) => setBotInput(e.target.value)}
                    onKeyPress={handleBotKeyPress}
                    placeholder={askForName ? "Please enter your name..." : "Type your message..."}
                    className="bot-input-field"
                  />
                  <button onClick={handleBotSend} className="bot-send-btn" disabled={!botInput.trim()}>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
                <div className="bot-input-hints">
                  <span className="hint">Press Enter to send</span>
                  <span className="hint">Shift+Enter for new line</span>
                </div>
              </div>
              
              {isSpeaking && (
                <div className="bot-speaking-indicator">
                  <button className="stop-speaking-btn" onClick={handleStopSpeaking}>
                    <i className="fas fa-stop"></i> Stop Speaking
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default TenderAssistant;