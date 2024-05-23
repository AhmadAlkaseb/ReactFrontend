import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTION_API_BASE_URL } from '../utils/globalVariables';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 95vh;
`;

const Form = styled.form`
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
`;

const FormField = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
    &:focus {
        border-color: #fda085;
        outline: none;
        box-shadow: 0 0 5px rgba(253, 160, 133, 0.5);
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-weight: bold;
    text-align: center;
`;

const SubmitButton = styled.button`
    background-color: #fda085;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #f6d365;
    }
`;

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
        <FormContainer>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="text"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </FormField>
                <FormField>
                    <Label htmlFor="password1">Password:</Label>
                    <Input
                        type="password"
                        id="password1"
                        value={password1}
                        onChange={handlePassword1Change}
                        required
                    />
                </FormField>
                <FormField>
                    <Label htmlFor="password2">Confirm Password:</Label>
                    <Input
                        type="password"
                        id="password2"
                        value={password2}
                        onChange={handlePassword2Change}
                        required
                    />
                </FormField>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <SubmitButton type="submit">Register</SubmitButton>
            </Form>
        </FormContainer>
    );
}

export default Register;
