import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import NotificationItem from './NotificationItem';
import NotificationFilters from './NotificationFilters';
import NotificationActionsMenu from './NotificationActionsMenu';
import PaginationControls from './PaginationControls';

const NotificationPage = () => {
  const { notifications, getUnreadCount, markAllAsRead } = useNotifications();
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Filter notifications based on selected filter
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'unread') return !notification.read;
    if (filter === 'read') return notification.read;
    if (filter === 'starred') return notification.starred;
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const currentNotifications = filteredNotifications.slice(startIndex, startIndex + itemsPerPage);

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <div className="notification-page-container" style={{
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      height: 'calc(100vh - 100px)',
      overflow: 'hidden'
    }}>
      <div style={{
        height: '100%',
        overflowY: 'auto',
        paddingRight: '8px',
        scrollbarWidth: 'thin',
        scrollbarColor: '#cbd5e1 #f1f5f9',
        scrollBehavior: 'smooth'
      }}>
        <div style={{ paddingBottom: '8px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#1e293b'
        }}>
          Notifications
        </h1>
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <NotificationActionsMenu 
            onMarkAllAsRead={handleMarkAllAsRead}
            unreadCount={getUnreadCount()}
          />
        </div>
      </div>

      <NotificationFilters 
        filter={filter}
        setFilter={setFilter}
        unreadCount={getUnreadCount()}
        starredCount={notifications.filter(n => n.starred).length}
      />

      <div style={{
        marginTop: '20px'
      }}>
        {currentNotifications.length === 0 ? (
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
            }}>
              No notifications
            </h3>
            <p style={{
              margin: 0,
              color: '#94a3b8'
            }}>
              {filter === 'unread' 
                ? 'You have no unread notifications' 
                : filter === 'read' 
                  ? 'You have no read notifications' 
                  : 'You\'re all caught up!'}
            </p>
          </div>
        ) : (
          <div style={{
            transition: 'all 0.3s ease',
            animation: 'fadeIn 0.3s ease-in',
            willChange: 'transform'
          }}>
            {currentNotifications.map((notification, index) => (
              <div 
                key={notification.id}
                style={{
                  transition: 'all 0.3s ease',
                  animation: `fadeIn 0.3s ease-in ${index * 0.05}s forwards`,
                  opacity: 0
                }}
              >
                <NotificationItem 
                  notification={notification} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {filteredNotifications.length > itemsPerPage && (
        <div style={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <PaginationControls 
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
      </div>
    </div>
  );
};

export default NotificationPage;