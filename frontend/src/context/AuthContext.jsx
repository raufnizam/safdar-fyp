import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Set base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:3000';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
                    const { data } = await axios.get('/api/auth/me');
                    setUser(data);
                    setIsAuthenticated(true);
                } catch (err) {
                    console.error('Session validation failed:', err);
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                }
            }
            setIsLoading(false);
        };
        initializeAuth();
    }, []);

    const register = async (formData) => {
        try {
            const { data } = await axios.post('/api/auth/register', formData);
            return data;
        } catch (err) {
            throw err.response?.data || { message: 'Registration failed' };
        }
    };

    const login = async (formData) => {
        try {
            const { data } = await axios.post('/api/auth/login', formData);
            localStorage.setItem('token', data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
            setToken(data.token);
            setUser(data.user);
            setIsAuthenticated(true);
            return data;
        } catch (err) {
            throw err.response?.data || { message: 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate('/');
    };

    const value = {
        user,
        token,
        isAuthenticated,
        isLoading,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;  