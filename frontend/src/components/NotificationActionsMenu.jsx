import React, { useState } from 'react';

const NotificationActionsMenu = ({ onMarkAllAsRead, unreadCount }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead();
    setShowMenu(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={toggleMenu}
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          padding: '8px 12px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.875rem',
          color: '#64748b'
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </button>

      {showMenu && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          zIndex: 1000,
          minWidth: '180px'
        }}>
          <button
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: 'none',
              background: 'transparent',
              textAlign: 'left',
              cursor: unreadCount === 0 ? 'not-allowed' : 'pointer',
              color: unreadCount === 0 ? '#94a3b8' : '#1e293b',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '0'
            }}
            onMouseEnter={(e) => {
              if (unreadCount !== 0) {
                e.currentTarget.style.backgroundColor = '#f1f5f9';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <i className="fas fa-check-double"></i>
            Mark all as read
          </button>
          
          <hr style={{
            margin: '0',
            border: 'none',
            borderTop: '1px solid #e2e8f0'
          }} />
          
          <button
            onClick={() => {
              setShowMenu(false);
            }}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: 'none',
              background: 'transparent',
              textAlign: 'left',
              cursor: 'pointer',
              color: '#1e293b',
              fontSize: '0.875rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <i className="fas fa-sync"></i>
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationActionsMenu;