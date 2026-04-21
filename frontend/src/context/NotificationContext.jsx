import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import apiClient from '../api/client';

// Notification Context
const NotificationContext = createContext();

// Initial state
const initialState = {
  notifications: [],
  loading: true,
  error: null
};

// Action types
const ACTIONS = {
  SET_NOTIFICATIONS: 'SET_NOTIFICATIONS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  MARK_AS_READ: 'MARK_AS_READ',
  MARK_AS_UNREAD: 'MARK_AS_UNREAD',
  MARK_ALL_AS_READ: 'MARK_ALL_AS_READ',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
  CLEAR_NOTIFICATIONS: 'CLEAR_NOTIFICATIONS',
  TOGGLE_STAR: 'TOGGLE_STAR',
  TOGGLE_IMPORTANT: 'TOGGLE_IMPORTANT'
};

// Reducer
const notificationReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
        loading: false,
        error: null
      };

    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };

    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case ACTIONS.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };

    case ACTIONS.MARK_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read_at: new Date().toISOString() }
            : notification
        )
      };

    case ACTIONS.MARK_AS_UNREAD:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read_at: null }
            : notification
        )
      };

    case ACTIONS.MARK_ALL_AS_READ:
      return {
        ...state,
        notifications: state.notifications.map(notification => ({
          ...notification,
          read_at: notification.read_at || new Date().toISOString()
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
            ? { ...notification, is_starred: !notification.is_starred }
            : notification
        )
      };

    case ACTIONS.TOGGLE_IMPORTANT:
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, is_important: !notification.is_important }
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

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const data = await apiClient.getNotifications();
      // Ensure data is array (backend returns results if paginated)
      const notifications = Array.isArray(data) ? data : (data.results || []);
      dispatch({ type: ACTIONS.SET_NOTIFICATIONS, payload: notifications });
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load notifications' });
    }
  };

  const markAsRead = async (id) => {
    try {
      await apiClient.markNotificationRead(id);
      dispatch({ type: ACTIONS.MARK_AS_READ, payload: id });
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const markAsUnread = async (id) => {
    // Currently API only has mark as read, but we can treat as PATCH read_at: null if needed
    // For now, let's keep it local if API doesn't support unread
    dispatch({ type: ACTIONS.MARK_AS_UNREAD, payload: id });
  };

  const toggleStar = async (id) => {
    try {
      await apiClient.toggleNotificationStar(id);
      dispatch({ type: ACTIONS.TOGGLE_STAR, payload: id });
    } catch (err) {
      console.error('Failed to toggle notification star:', err);
    }
  };

  const toggleImportant = async (id) => {
    try {
      await apiClient.toggleNotificationImportant(id);
      dispatch({ type: ACTIONS.TOGGLE_IMPORTANT, payload: id });
    } catch (err) {
      console.error('Failed to toggle notification importance:', err);
    }
  };

  const markAllAsRead = async () => {
    // API might not have mark all as read yet, handle individually for now
    const unread = state.notifications.filter(n => !n.read_at);
    try {
      await Promise.all(unread.map(n => apiClient.markNotificationRead(n.id)));
      dispatch({ type: ACTIONS.MARK_ALL_AS_READ });
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    }
  };

  const deleteNotification = (id) => {
    // API delete might be needed
    dispatch({ type: ACTIONS.DELETE_NOTIFICATION, payload: id });
  };

  const clearNotifications = () => {
    dispatch({ type: ACTIONS.CLEAR_NOTIFICATIONS });
  };

  // Get unread count
  const getUnreadCount = () => {
    return state.notifications.filter(n => !n.read_at).length;
  };

  // Get all notifications
  const getNotifications = () => {
    return state.notifications;
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        loading: state.loading,
        error: state.error,
        fetchNotifications,
        markAsRead,
        markAsUnread,
        toggleStar,
        toggleImportant,
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