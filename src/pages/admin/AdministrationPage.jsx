import React, { useState } from 'react';
import UserList from "./UserList.jsx";
import AdminUserInputForm from "./AdminUserInputForm.jsx";

const AdministrationPage = () => {
    const [updateUser, setUpdateUser] = useState(false);
    const [user, setUser] = useState({
        email: '',
        role: ''
    });

    return (
        <>     
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
