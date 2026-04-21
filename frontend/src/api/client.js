/**
 * Central API Client for E-Tender Alert System
 * Uses fetch API to interact with the Django Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

/**
 * Common request wrapper with authentication and error handling
 */
async function request(endpoint, options = {}) {
    const token = localStorage.getItem('access_token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

        // Handle 401 Unauthorized (token expired)
        if (response.status === 401) {
            // Optional: Handle token refresh or redirect to login
            console.warn('Unauthorized request. Token might be expired.');
        }

        const data = await response.json();

        if (!response.ok) {
            throw { status: response.status, ...data };
        }

        return data;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
}

export const apiClient = {
    // Auth
    login: (username, password) =>
        request('/auth/login/', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        }).then(data => {
            if (data.access) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
            }
            return data;
        }),

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    },

    register: (userData) =>
        request('/accounts/register/', {
            method: 'POST',
            body: JSON.stringify(userData),
        }),

    googleLogin: (token) =>
        request('/accounts/google-login/', {
            method: 'POST',
            body: JSON.stringify({ token }),
        }).then(data => {
            if (data.access) {
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
            }
            return data;
        }),

    // Tenders
    getTenders: (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return request(`/tenders/${queryString ? `?${queryString}` : ''}`);
    },

    getTender: (id) => request(`/tenders/${id}/`),
    updateTender: (id, data) =>
        request(`/tenders/${id}/`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),


    // Notifications
    getNotifications: () => request('/notifications/'),
    markNotificationRead: (id) => request(`/notifications/${id}/read/`, { method: 'PATCH' }),
    toggleNotificationStar: (id) => request(`/notifications/${id}/star/`, { method: 'PATCH' }),
    toggleNotificationImportant: (id) => request(`/notifications/${id}/important/`, { method: 'PATCH' }),

    // Workflow
    startWorkflow: (tenderId, engineerId, engineerName, extraData = {}) =>
        request('/workflow/start/', {
            method: 'POST',
            body: JSON.stringify({
                tender_id: tenderId,
                engineer_id: engineerId,
                engineer_name: engineerName,
                engineer_email: extraData.email,
                engineer_phone: extraData.phone,
                engineer_specialization: extraData.specialization,
                engineer_experience: extraData.experience,
                assignment_notes: extraData.notes
            }),
        }),

    getWorkflow: (assignmentId) => request(`/workflow/${assignmentId}/`),

    saveWorkflowStep: (assignmentId, stepNo, data) =>
        request(`/workflow/${assignmentId}/step/${stepNo}/`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        }),

    submitWorkflow: (assignmentId) =>
        request(`/workflow/${assignmentId}/submit/`, {
            method: 'POST',
        }),

    // Engineers
    getEngineers: () => request('/engineers/'),
};

export default apiClient;
