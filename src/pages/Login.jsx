import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { PRODUCTION_API_BASE_URL } from '../utils/globalStyles';

export function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${PRODUCTION_API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const responseData = await response.json();
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('email', responseData.username);
                localStorage.setItem('roles', JSON.stringify(responseData.roles));
                localStorage.setItem('isAuthenticated', 'true');
                setIsAuthenticated(true);
                navigate('/home');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
            }
        } catch (error) {
            setError('Error during login. Please try again later.');
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <NavLink to="/register">Don't have an account? No worries! Register here.</NavLink>
        </>
    );
}

export default Login;