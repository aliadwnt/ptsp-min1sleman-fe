import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch authentication status and user info (replace with actual API call)
        const fetchAuthData = async () => {
            // Example: const response = await fetch('/api/auth/status');
            // const data = await response.json();
            const data = { isAuthenticated: true, user: { firstName: 'John', name: 'John Doe', email: 'john.doe@example.com' } };
            
            setIsAuthenticated(data.isAuthenticated);
            setUser(data.user);
        };

        fetchAuthData();
    }, []);

    const logout = async () => {
        // Example: await fetch('/api/logout', { method: 'POST' });
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    return { isAuthenticated, user, logout };
};
