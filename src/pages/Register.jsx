import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTION_API_BASE_URL } from '../utils/globalVariables';

export function Register({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePassword1Change = (event) => {
        setPassword1(event.target.value);
    };

    const handlePassword2Change = (event) => {
        setPassword2(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password1 !== password2) {
            setError('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`${PRODUCTION_API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password: password1 }),
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
                setError(errorData.error || 'Email is already registered.');
            }
        } catch (error) {
            setError('Error during registration. Please try again later.');
        }
    };

    return (
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
                <label htmlFor="password1">Password:</label>
                <input
                    type="password"
                    id="password1"
                    value={password1}
                    onChange={handlePassword1Change}
                    required
                />
            </div>
            <div>
                <label htmlFor="password2">Confirm Password:</label>
                <input
                    type="password"
                    id="password2"
                    value={password2}
                    onChange={handlePassword2Change}
                    required
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
