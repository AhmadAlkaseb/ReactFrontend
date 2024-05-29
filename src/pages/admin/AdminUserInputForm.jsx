import React from 'react';
import { PRODUCTION_API_BASE_URL } from '../../utils/globalVariables';
import styled from 'styled-components';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 500px;  /* Increased width */
    width: 100%;
    margin: 20px auto;
    padding: 30px;  /* Increased padding */
    background-color: #e9ecef; /* Fallback for older browsers */
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Fieldset = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    margin-right: 20px;

    &:last-child {
        margin-right: 0;
    }
`;

const Title = styled.h3`
    margin-bottom: 10px;
    text-align: center;
`;

const Label = styled.label`
    margin: 5px 0 2px;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

const EmailInput = styled(Input)`
    width: 100%; /* Make it slightly larger than other inputs */
`;

const Select = styled.select`
    margin-bottom: 15px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${({$primary}) => ($primary ? '#4CAF50' : '#f44336')};
    color: white;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${({$primary}) => ($primary ? '#388E3C' : '#d32f2f')};
    }
`;

const AdminUserInputForm = ({ updateUser, setUpdateUser, user, setUser }) => {
    const handleChange = (event) => {
        const { id, value } = event.target;
        setUser({
            ...user,
            [id]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `${PRODUCTION_API_BASE_URL}/auth/addroletouser`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ` + sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                role: user.role
            })
        })
        .then(response => response.json())
        .then(() => {
            setUser({ email: '', role: '' });
            setUpdateUser(!updateUser);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCancel = (event) => {
        event.preventDefault();
        setUser({ email: '', role: '' });
    };

    return (
        <>
            {user.email && (
                <FormContainer onSubmit={handleSubmit}>
                    <Fieldset>
                        <Column>
                            <Title>User Info</Title>
                            <Label htmlFor='email'>Email</Label>
                            <EmailInput
                                disabled
                                id='email'
                                value={user.email}
                                onChange={handleChange}
                            />
                            
                            <Label htmlFor='role'>Role</Label>
                            <Select
                                id='role'
                                value={user.role}
                                onChange={handleChange}
                            >
                                <option value=''>Select role</option>
                                <option value='admin'>Admin</option>
                                <option value='user'>User</option>
                            </Select>
                        </Column>
                    </Fieldset>
                    <ButtonContainer>
                        <Button type='button' onClick={handleCancel}>Cancel</Button>
                        <Button $primary type='submit'>Save</Button>
                    </ButtonContainer>
                </FormContainer>
            )}
        </>
    );
};

export default AdminUserInputForm;
