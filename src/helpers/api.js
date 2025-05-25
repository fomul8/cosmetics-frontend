import {tryRefreshToken} from './auth.js';

const API_BASE = '/api';
const apiFetch = async (endpoint, options = {}, retry = false) => {
    const accessToken = sessionStorage.getItem('jwt');
    const config = {
        method: options.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        credentials: 'include',
    };
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if (options.body) {
        config.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
    }

    try {
        const response = await fetch(API_BASE + endpoint, config);
        if (response.status === 401 && retry) {
            const refreshed = await tryRefreshToken();
            if (refreshed) {
                return apiFetch(endpoint, options, false);
            } else {
                logoutAndRedirect();
                throw new Error('Unauthorized, refresh failed');
            }
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Request error');
        }

        return await response.json();
    } catch (err) {
        console.error('API error:', err);
        throw err;
    }
}

function logoutAndRedirect() {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('refresh');
    window.location.href = '/';
}
