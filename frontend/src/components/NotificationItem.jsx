import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';

const NotificationItem = ({ notification }) => {
  const { markAsRead, deleteNotification, toggleStar, toggleImportant, markAsUnread } = useNotifications();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleClick = () => {
    if (!notification.read_at) {
      markAsRead(notification.id);
    }
  };

  const handleToggleRead = () => {
    if (notification.read_at) {
      markAsUnread(notification.id);
    } else {
      markAsRead(notification.id);
    }
  };

  const handleToggleStar = () => {
    toggleStar(notification.id);
  };

  const handleToggleImportant = () => {
    toggleImportant(notification.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNotification(notification.id);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        padding: '16px 20px',
        borderBottom: '1px solid #f1f5f9',
        cursor: 'pointer',
        backgroundColor: notification.read ? 'white' : '#f8fafc',
        transition: 'all 0.3s ease',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        animation: 'fadeIn 0.3s ease-out',
        opacity: 1
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = notification.read ? '#f1f5f9' : '#f1f5f9';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = notification.read ? 'white' : '#f8fafc';
      }}
    >
      {/* Delete button */}
      <button
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'none',
          border: 'none',
          color: '#94a3b8',
          cursor: 'pointer',
          fontSize: '0.875rem',
          padding: '4px',
          borderRadius: '4px',
          opacity: 0,
          transition: 'opacity 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#fee2e2';
          e.currentTarget.style.color = '#ef4444';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#94a3b8';
        }}
      >
        <i className="fas fa-times"></i>
      </button>

      {/* Show delete button on hover */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          opacity: 0,
          transition: 'opacity 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.previousSibling.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.previousSibling.style.opacity = '0';
        }}
      >
        &nbsp;
      </div>

      {/* Icon */}
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: notification.category === 'SUCCESS' ? '#dcfce7' :
          notification.category === 'WARNING' ? '#ffedd5' :
            notification.category === 'SYSTEM' ? '#fee2e2' : '#dbeafe',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {notification.is_starred && (
          <i className="fas fa-star" style={{ color: '#f59e0b', fontSize: '0.8rem', position: 'absolute' }}></i>
        )}
        <i className={
          notification.category === 'SUCCESS' ? 'fas fa-check-circle' :
            notification.category === 'WARNING' ? 'fas fa-exclamation-triangle' :
              notification.category === 'SYSTEM' ? 'fas fa-exclamation-circle' : 'fas fa-info-circle'
        } style={{
          color: notification.category === 'SUCCESS' ? '#16a34a' :
            notification.category === 'WARNING' ? '#ea580c' :
              notification.category === 'SYSTEM' ? '#dc2626' : '#2563eb',
          fontSize: '1rem'
        }}></i>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4px'
        }}>
          <h4 style={{
            margin: 0,
            fontSize: '0.95rem',
            fontWeight: notification.read_at ? '500' : '600',
            color: '#1e293b',
            lineHeight: '1.3'
          }}>
            {notification.title}
          </h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!notification.read_at && (
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6'
              }}></div>
            )}
            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  padding: '4px',
                  borderRadius: '4px',
                  opacity: 0,
                  transition: 'opacity 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '0';
                }}
              >
                <i className="fas fa-ellipsis-vertical"></i>
              </button>

              {showDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  zIndex: 1000,
                  minWidth: '180px',
                  marginTop: '4px'
                }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleRead();
                      setShowDropdown(false);
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
                      borderRadius: '0',
                      borderTopLeftRadius: '6px',
                      borderTopRightRadius: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <i className={`fas fa-${notification.read_at ? 'envelope' : 'check'}`}></i>
                    {notification.read_at ? 'Mark as Unread' : 'Mark as Read'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStar();
                      setShowDropdown(false);
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
                    <i className={`fas fa-star`} style={{ color: notification.is_starred ? '#f59e0b' : '#94a3b8' }}></i>
                    {notification.is_starred ? 'Unstar' : 'Star'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleImportant();
                      setShowDropdown(false);
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
                    <i className={`fas fa-exclamation-circle`} style={{ color: notification.is_important ? '#ef4444' : '#94a3b8' }}></i>
                    {notification.is_important ? 'Unmark Important' : 'Mark Important'}
                  </button>
                  <hr style={{
                    margin: '0',
                    border: 'none',
                    borderTop: '1px solid #e2e8f0'
                  }} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                      setShowDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: '#dc2626',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '0',
                      borderBottomLeftRadius: '6px',
                      borderBottomRightRadius: '6px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fee2e2';
                      e.currentTarget.style.color = '#b91c1c';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#dc2626';
                    }}
                  >
                    <i className="fas fa-trash"></i>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <p style={{
          margin: '0 0 8px 0',
          fontSize: '0.875rem',
          color: '#64748b',
          lineHeight: '1.4'
        }}>
          {notification.message}
        </p>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontSize: '0.75rem',
            color: '#94a3b8'
          }}>
            {notification.created_at ? new Date(notification.created_at).toLocaleString() : 'Just now'}
          </span>
          {notification.category && (
            <span style={{
              fontSize: '0.7rem',
              backgroundColor: '#f1f5f9',
              color: '#64748b',
              padding: '2px 6px',
              borderRadius: '12px'
            }}>
              {notification.category}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;