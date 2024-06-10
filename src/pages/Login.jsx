import {useEffect, useState} from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {LOCAL_API_BASE_URL, PRODUCTION_API_BASE_URL} from '../utils/globalVariables';

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

const RegisterLink = styled(NavLink)`
    margin-top: 20px;
    color: #fda085;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
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


// fremfor at definere props, kan man blot skrive props og tilgå data via denne "props.setIsAuthenticated"
export function Login(props, { setIsAuthenticated, setRole }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            console.log('Window resized to:', window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            console.log("removed")
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${LOCAL_API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                 const responseData = await response.json();
                sessionStorage.setItem('token', responseData.token);
                sessionStorage.setItem('email', responseData.username);
                sessionStorage.setItem('roles', JSON.stringify(responseData.roles));
                sessionStorage.setItem('isAuthenticated', 'true');
                setIsAuthenticated(true);
                setRole(JSON.parse(sessionStorage.getItem('roles')));
                setLoading(false);
                navigate('/home');
            } else {
                //Promise rejected griber fejlen og gør noget med den...
                const errorData = await response.json();
                setError(errorData.message);
                setLoading(false);
            }
        } catch (error) {
            window.alert("Server is unreachable. Maybe you are using trying to access server through your localhost??")
            setError('Error during login. Please try again later.');
            setLoading(false);
        }
    };

    // if-else conditional rendering
    if (loading) {
        return (
            <LoadingContainer>
                <img src="https://i.gifer.com/ZZ5H.gif" alt="Loading..." />
                <LoadingMessage>Logging in, please wait...</LoadingMessage>
            </LoadingContainer>
        );
    }

    const goToRegister = () =>{
        window.location.href = "/register"
    }

    return (
            <FormContainer>
                <Headline>Welcome to LAHY</Headline>
                <SubHeadline>Give something used a new life or find your next treasure today!</SubHeadline>
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
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </FormField>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <SubmitButton type="submit">Login</SubmitButton>
                </Form>
                <RegisterLink to="/register">Don't have an account? No worries! Register here.</RegisterLink>
                <button onClick={goToRegister}>Go to Register</button>
            </FormContainer>
    );
}

export default Login;
