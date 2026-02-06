import React, { useState, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';

const Notifications = ({ isOpen, onClose }) => {
  const { 
    notifications: localNotifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  // Get unread count
  const unreadCount = localNotifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div 
      className="notifications-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        zIndex: 10000,
        paddingTop: '70px'
      }}
      onClick={onClose}
    >
      <div 
        className="notifications-panel"
        style={{
          width: '400px',
          height: 'calc(100vh - 70px)',
          backgroundColor: 'white',
          boxShadow: '-5px 0 15px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{
            margin: 0,
            color: '#1e293b',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>
            Notifications
            {unreadCount > 0 && (
              <span style={{
                backgroundColor: '#ef4444',
                color: 'white',
                borderRadius: '12px',
                padding: '2px 8px',
                fontSize: '0.75rem',
                marginLeft: '8px'
              }}>
                {unreadCount}
              </span>
            )}
          </h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              color: '#64748b',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            ×
          </button>
        </div>

        {/* Action Bar */}
        {localNotifications.length > 0 && (
          <div style={{
            padding: '12px 20px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              style={{
                background: 'none',
                border: 'none',
                color: unreadCount === 0 ? '#94a3b8' : '#3b82f6',
                fontSize: '0.875rem',
                cursor: unreadCount === 0 ? 'not-allowed' : 'pointer',
                padding: '4px 8px',
                borderRadius: '4px'
              }}
            >
              Mark all as read
            </button>
            <span style={{
              color: '#64748b',
              fontSize: '0.875rem'
            }}>
              {localNotifications.length} notifications
            </span>
          </div>
        )}

        {/* Notifications List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 0',
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9',
          scrollBehavior: 'smooth'
        }}>
          {localNotifications.length === 0 ? (
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
              <h4 style={{
                margin: '0 0 8px 0',
                color: '#64748b',
                fontWeight: '500'
              }}>No notifications</h4>
              <p style={{
                margin: 0,
                color: '#94a3b8',
                fontSize: '0.875rem'
              }}>You're all caught up!</p>
            </div>
          ) : (
            localNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => !notification.read && markAsRead(notification.id)}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  backgroundColor: notification.read ? 'white' : '#f8fafc',
                  transition: 'all 0.3s ease',
                  position: 'relative',
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
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
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

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  {/* Icon */}
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: notification.type === 'success' ? '#dcfce7' :
                                   notification.type === 'warning' ? '#ffedd5' :
                                   notification.type === 'error' ? '#fee2e2' : '#dbeafe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <i className={
                      notification.type === 'success' ? 'fas fa-check-circle' :
                      notification.type === 'warning' ? 'fas fa-exclamation-triangle' :
                      notification.type === 'error' ? 'fas fa-exclamation-circle' : 'fas fa-info-circle'
                    } style={{
                      color: notification.type === 'success' ? '#16a34a' :
                             notification.type === 'warning' ? '#ea580c' :
                             notification.type === 'error' ? '#dc2626' : '#2563eb',
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
                        fontWeight: notification.read ? '500' : '600',
                        color: '#1e293b',
                        lineHeight: '1.3'
                      }}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#3b82f6'
                        }}></div>
                      )}
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
                        {notification.time}
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
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;