import {BACKEND_URL, TEST_PORT} from "./global_constants.js";
import { nextTick } from 'vue';
import { isLoggedInState} from "./store.js";

const isAuthenticated = async () => {
    const token = sessionStorage.getItem('jwt');
    if (!token) return false;
    try {
        const payload = jwt_decode(token);
        const now = Math.floor(Date.now() / 1000);
        const inDate =  payload.exp && payload.exp > now;
        if (!inDate) {
            return await tryRefreshToken();
        } else {
            return inDate;
        }
    } catch (e) {
        return false;
    }
};

const tryRefreshToken = async () => {
    //TODO implement refresh in httponly
    try {
        const res = await fetch(`/api/auth/token/refresh/`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'refresh': sessionStorage.getItem('refresh')})
        });

        if (res.ok) {
            const data = await res.json();
            sessionStorage.setItem('jwt', data.access);
            return true;
        } else {
            sessionStorage.removeItem('jwt');
            sessionStorage.removeItem('refresh');
        }
        return false;
    } catch (err) {
        console.error('Failed to refresh token:', err);
        return false;
    }
}


function jwt_decode(token) {
    try {
        const payload = token.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

        return JSON.parse(decodeURIComponent(escape(decoded)));
    } catch (e) {
        console.error('Invalid JWT token', e);
        return null;
    }
}

const signInWithEmailAndPassword = async (email, password) => {
    try {
        const response = await fetch('/api/auth/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }
        const data = await response.json();
        const token = data.access;
        if (!token) {
            throw new Error('Token not provided');
        }
        sessionStorage.setItem('jwt', token);
        const userInfo = jwt_decode(token);
        console.log(userInfo);

        return true;
    } catch (error) {
        console.error('Login error:', error.message);
        return false;
    }
}


const logout = async () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('refresh');
    isLoggedInState.logged = false;
    return !sessionStorage.getItem('jwt');
};

const signUp = async (email, password1, password2) => {
    try {
        const response = await fetch('/api/auth/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password1,
                password2
            })
        });
        const data = await response.json();
        if (data.access && data.refresh) {
            sessionStorage.setItem('jwt', data.access);
            sessionStorage.setItem('refresh', data.refresh);
            await nextTick();
        }
        return data;
    } catch (e) {
        console.log(e);
        return {};
    }
}

const googleOauth = async (code) => {
    try {
        const response = await fetch('/api/auth/google/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code
            })
        });
        const data = await response.json();
        if (data.access && data.refresh) {
            sessionStorage.setItem('jwt', data.access);
            sessionStorage.setItem('refresh', data.refresh);
            isLoggedInState.logged = true;
            await nextTick();
        }
        return data;
    } catch (e) {
        console.log(e);
        return {};
    }
}

export { isAuthenticated, signInWithEmailAndPassword, logout, signUp, tryRefreshToken, googleOauth };
