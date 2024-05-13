import React, {useEffect, useState} from 'react';
import { LOCAL_API_BASE_URL } from "../../utils/globalVariables.js";
import { useNavigate } from "react-router-dom";

export function Login({setLoggedIn}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate(); // Hook for navigation

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${LOCAL_API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                // Login successful
                const responseData = await response.json(); // Parse response JSON
                console.log('Logged in successfully');
                console.log('Response:', responseData); // Log response data

                // Save data to localStorage
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('username', responseData.username);
                localStorage.setItem('roles', JSON.stringify(responseData.roles));
                setLoggedIn(true);
                navigate('/loggedin'); // Navigate to the loggedin page
            } else {
                // Login failed
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
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
                <button type="submit">Login</button>
            </form>
        </>
    );
}