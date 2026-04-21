import React, { useState } from 'react';
import { useNotifications } from '../context/NotificationContext';
import NotificationItem from './NotificationItem';
import NotificationFilters from './NotificationFilters';
import NotificationActionsMenu from './NotificationActionsMenu';
import PaginationControls from './PaginationControls';

const NotificationPage = () => {
  const { notifications, loading, error, getUnreadCount, markAllAsRead, fetchNotifications } = useNotifications();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Filter notifications based on selected filter and search term
  const filteredNotifications = notifications.filter(notification => {
    // Search term check
    const matchesSearch = searchTerm === '' ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Filter type check
    if (filter === 'unread') return !notification.read_at;
    if (filter === 'read') return !!notification.read_at;
    if (filter === 'starred') return notification.is_starred;
    if (filter === 'important') return notification.is_important;
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
              <button
                onClick={() => fetchNotifications()}
                style={{
                  background: 'none',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  color: '#64748b'
                }}
                title="Refresh"
              >
                <i className={`fas fa-sync ${loading ? 'fa-spin' : ''}`}></i>
              </button>
              <NotificationActionsMenu
                onMarkAllAsRead={handleMarkAllAsRead}
                unreadCount={getUnreadCount()}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ position: 'relative' }}>
              <i className="fas fa-search" style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }}></i>
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 10px 10px 36px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>
          </div>

          <NotificationFilters
            filter={filter}
            setFilter={setFilter}
            unreadCount={getUnreadCount()}
            starredCount={notifications.filter(n => n.is_starred).length}
            importantCount={notifications.filter(n => n.is_important).length}
          />

          <div style={{
            marginTop: '20px'
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <i className="fas fa-spinner fa-spin fa-2x text-blue-500"></i>
                <p className="mt-2 text-slate-500">Loading notifications...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#ef4444' }}>
                <i className="fas fa-exclamation-circle fa-2x mb-2"></i>
                <p>{error}</p>
                <button
                  onClick={() => fetchNotifications()}
                  className="mt-2 text-blue-500 underline"
                >
                  Try again
                </button>
              </div>
            ) : currentNotifications.length === 0 ? (
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