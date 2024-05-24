import React from 'react';
import { PRODUCTION_API_BASE_URL } from '../../utils/globalVariables';

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
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('token'),
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
            <form onSubmit={handleSubmit}>
                <h2>User Info</h2>
                
                <label htmlFor='email'>Email</label>
                <input 
                    type='email' 
                    id='email' 
                    value={user.email} 
                    placeholder='Enter email' 
                    onChange={handleChange} 
                />

                <label htmlFor='role'>Role</label>
                <select 
                    id='role' 
                    value={user.role} 
                    onChange={handleChange}
                >
                    <option value=''>Select role</option>
                    <option value='Admin'>Admin</option>
                    <option value='User'>User</option>
                    
                </select>
                
                <div>
                    <button type='button' onClick={handleCancel}>Cancel</button>
                    <button type='submit'>Save</button>
                </div>
            </form>
            )}
        </>
    );
};

export default AdminUserInputForm;
