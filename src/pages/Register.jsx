import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTION_API_BASE_URL } from '../utils/globalVariables';
import styled from 'styled-components';

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 95vh;
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
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

const BackButton = styled.button`
    background-color: #40E0D0;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
        background-color: #20B2AA;
    }
`;

const Headline = styled.h1`
    margin-bottom: 20px;
    font-size: 3rem;
    color: white;
    text-align: center;
`;

const SubHeadline = styled.h2`
    margin-bottom: 20px;
    font-size: 2rem;
    color: #3a4046;
    text-align: center;
`;

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
`;

const LoadingMessage = styled.p`
    font-size: 1.5rem;
    color: #3a4046;
    margin-top: 20px;
`;

export function Register({ setIsAuthenticated, setRole }) {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        if (password1 !== password2) {
            setError('Passwords do not match.');
            setLoading(false);
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
                sessionStorage.setItem('token', responseData.token);
                sessionStorage.setItem('email', responseData.username);
                sessionStorage.setItem('roles', JSON.stringify(responseData.roles));
                sessionStorage.setItem('isAuthenticated', 'true');
                setIsAuthenticated(true);
                setRole(JSON.parse(sessionStorage.getItem('roles')));
                setTimeout(() => {
                    setLoading(false);
                    navigate('/home');
                }, 2000);
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Email is already registered.');
                setLoading(false);
            }
        } catch (error) {
            setError('Error during registration. Please try again later.');
            setLoading(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <LoadingContainer>
                <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." />
                <LoadingMessage>Registering, please wait...</LoadingMessage>
            </LoadingContainer>
        );
    }

    return (
        <FormContainer>
            <Headline>Welcome to LAHY</Headline>
            <SubHeadline>Give something used a new life or find your next treasure today!</SubHeadline>
            <Form onSubmit={handleSubmit}>
                <FormField>
                    <Label htmlFor="email">Email:</Label>
                    <Input
                        type="email"
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
                <ButtonContainer>
                    <BackButton type="button" onClick={handleBack}>Go Back</BackButton>
                    <SubmitButton type="submit">Register</SubmitButton>
                </ButtonContainer>
            </Form>
        </FormContainer>
    );
}

export default Register;
