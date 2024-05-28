import React, { useState } from 'react';
import styled from 'styled-components';
import UserList from "./UserList.jsx";
import AdminUserInputForm from "./AdminUserInputForm.jsx";

const PageHeader = styled.h1`
    padding-top: 50px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 100px;
    color: #333;
`;

const AdministrationPage = () => {
    const [updateUser, setUpdateUser] = useState(false);
    const [user, setUser] = useState({
        email: '',
        roleAsStrings: ''
    });

    return (
        <>
            <PageHeader>Administration</PageHeader>
            <AdminUserInputForm 
                updateUser={updateUser} 
                setUpdateUser={setUpdateUser} 
                user={user} 
                setUser={setUser} 
            />   
            <UserList 
                updateUser={updateUser} 
                setUpdateUser={setUpdateUser} 
                setUser={setUser} 
            />
        </>
    );
};

export default AdministrationPage;

