import {BACKEND_URL, TEST_PORT} from "./global_constants.js";

const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    // Можно также добавить валидацию токена
    return !!token;
};


const signInWithEmailAndPassword = async (email, password) => {
    console.log(password, email);
    // For test set alwayes
    localStorage.setItem('jwt', '100500');
    return true;

    try {
        const response = await fetch(BACKEND_URL + '/signin', {
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
        const token = data.token; // предполагаем, что backend возвращает { token: '...' }
        if (!token) {
            throw new Error('Token not provided');
        }
        localStorage.setItem('jwt', token);

        // (опционально) можно декодировать токен:
        // const userInfo = jwt_decode(token);

        return true;
    } catch (error) {
        console.error('Login error:', error.message);
        return false;
    }
}

const signUpWithEmailAndPassword = async (email, password) => {

}

const logout = async () => {
    localStorage.removeItem('jwt');
    return !localStorage.getItem('jwt');
};

export { isAuthenticated, signInWithEmailAndPassword, logout, signUpWithEmailAndPassword };