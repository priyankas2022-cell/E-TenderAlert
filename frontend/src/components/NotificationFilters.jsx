import React from 'react';

const NotificationFilters = ({ filter, setFilter, unreadCount, starredCount, importantCount }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      marginBottom: '16px',
      flexWrap: 'wrap'
    }}>
      <button
        onClick={() => setFilter('all')}
        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        style={{
          padding: '8px 16px',
          border: '1px solid #e2e8f0',
          backgroundColor: filter === 'all' ? '#f1f5f9' : 'white',
          color: filter === 'all' ? '#1e293b' : '#64748b',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: filter === 'all' ? '600' : '500',
          transition: 'all 0.2s ease'
        }}
      >
        All
      </button>
      <button
        onClick={() => setFilter('unread')}
        className={`filter-btn ${filter === 'unread' ? 'active' : ''}`}
        style={{
          padding: '8px 16px',
          border: '1px solid #e2e8f0',
          backgroundColor: filter === 'unread' ? '#f1f5f9' : 'white',
          color: filter === 'unread' ? '#1e293b' : '#64748b',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: filter === 'unread' ? '600' : '500',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        Unread
        {unreadCount > 0 && (
          <span style={{
            backgroundColor: '#ef4444',
            color: 'white',
            borderRadius: '12px',
            padding: '1px 6px',
            fontSize: '0.75rem',
            marginLeft: '4px'
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      <button
        onClick={() => setFilter('starred')}
        className={`filter-btn ${filter === 'starred' ? 'active' : ''}`}
        style={{
          padding: '8px 16px',
          border: '1px solid #e2e8f0',
          backgroundColor: filter === 'starred' ? '#f1f5f9' : 'white',
          color: filter === 'starred' ? '#1e293b' : '#64748b',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: filter === 'starred' ? '600' : '500',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <i className="fas fa-star" style={{ color: '#f59e0b' }}></i>
        Starred
        {starredCount > 0 && (
          <span style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            borderRadius: '12px',
            padding: '1px 6px',
            fontSize: '0.75rem',
            marginLeft: '4px'
          }}>
            {starredCount}
          </span>
        )}
      </button>

      <button
        onClick={() => setFilter('important')}
        className={`filter-btn ${filter === 'important' ? 'active' : ''}`}
        style={{
          padding: '8px 16px',
          border: '1px solid #e2e8f0',
          backgroundColor: filter === 'important' ? '#f1f5f9' : 'white',
          color: filter === 'important' ? '#1e293b' : '#64748b',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: filter === 'important' ? '600' : '500',
          transition: 'all 0.2s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        <i className="fas fa-exclamation-circle" style={{ color: '#ef4444' }}></i>
        Important
        {importantCount > 0 && (
          <span style={{
            backgroundColor: '#ef4444',
            color: 'white',
            borderRadius: '12px',
            padding: '1px 6px',
            fontSize: '0.75rem',
            marginLeft: '4px'
          }}>
            {importantCount}
          </span>
        )}
      </button>

      <button
        onClick={() => setFilter('read')}
        className={`filter-btn ${filter === 'read' ? 'active' : ''}`}
        style={{
          padding: '8px 16px',
          border: '1px solid #e2e8f0',
          backgroundColor: filter === 'read' ? '#f1f5f9' : 'white',
          color: filter === 'read' ? '#1e293b' : '#64748b',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '0.875rem',
          fontWeight: filter === 'read' ? '600' : '500',
          transition: 'all 0.2s ease'
        }}
      >
        Read
      </button>
    </div>
  );
};

export default NotificationFilters;