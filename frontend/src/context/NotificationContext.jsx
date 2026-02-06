import React, { createContext, useContext, useReducer } from 'react';

// Notification Context
const NotificationContext = createContext();

// Initial state
const initialState = {
  notifications: [
    {
      id: 1,
      title: 'New Tender Alert',
      message: 'Solar panel installation tender has been published by Government of Maharashtra',
      time: '2 minutes ago',
      type: 'success',
      category: 'Tenders',
      read: false
    },
    {
      id: 2,
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated',
      time: '1 hour ago',
      type: 'success',
      category: 'Account',
      read: true
    },
    {
      id: 3,
      title: 'Reminder: Follow-up Call',
      message: 'Call Priya Sharma regarding street light quotation tomorrow at 10:00 AM',
      time: '3 hours ago',
      type: 'warning',
      category: 'Telecaller',
      read: false
    }
  ]
};

// Action types
const ACTIONS = {
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  MARK_AS_READ: 'MARK_AS_READ',
  MARK_AS_UNREAD: 'MARK_AS_UNREAD',
  MARK_ALL_AS_READ: 'MARK_ALL_AS_READ',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  TOGGLE_STAR: 'TOGGLE_STAR'
};

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [
          {
            id: Date.now(),
            ...action.payload,
            read: false,
            starred: false, // Add starred property
            time: 'Just now'
          },
          ...state.notifications
        ]
      };
    
    case ACTIONS.MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      };
    
    case ACTIONS.MARK_AS_UNREAD:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: false }
            : notification
        )
      };
    
    case ACTIONS.MARK_ALL_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true
        }))
      };
    
    case ACTIONS.DELETE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload
        )
      };
    
    case ACTIONS.TOGGLE_STAR:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, starred: !notification.starred }
            : notification
        )
      };
    
    case ACTIONS.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: []
      };
    
    default:
      return state;
  }
};

// Provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Action creators
  const addNotification = (notification) => {
    dispatch({
      type: ACTIONS.ADD_NOTIFICATION,
      payload: notification
    });
  };

  const markAsRead = (id) => {
    dispatch({
      type: ACTIONS.MARK_AS_READ,
      payload: id
    });
  };

  const markAsUnread = (id) => {
    dispatch({
      type: ACTIONS.MARK_AS_UNREAD,
      payload: id
    });
  };

  const toggleStar = (id) => {
    dispatch({
      type: ACTIONS.TOGGLE_STAR,
      payload: id
    });
  };

  const markAllAsRead = () => {
    dispatch({
      type: ACTIONS.MARK_ALL_AS_READ
    });
  };

  const deleteNotification = (id) => {
    dispatch({
      type: ACTIONS.DELETE_NOTIFICATION,
      payload: id
    });
  };

  const clearNotifications = () => {
    dispatch({
      type: ACTIONS.CLEAR_NOTIFICATIONS
    });
  };

  // Get unread count
  const getUnreadCount = () => {
    return state.notifications.filter(n => !n.read).length;
  };

  // Get all notifications
  const getNotifications = () => {
    return state.notifications;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        addNotification,
        markAsRead,
        markAsUnread,
        toggleStar,
        markAllAsRead,
        deleteNotification,
        clearNotifications,
        getUnreadCount,
        getNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;