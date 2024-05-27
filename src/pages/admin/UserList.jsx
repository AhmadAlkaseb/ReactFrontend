import styled from "styled-components";
import {useEffect, useState} from "react";
import {PRODUCTION_API_BASE_URL} from "../../utils/globalVariables.js";


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
`;

const UserList = ({setUser, updateUser, setUpdateUser}) => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchUsers();
    }, [updateUser]);

    const fetchUsers = () => {
        fetch(`${PRODUCTION_API_BASE_URL}/auth/users`, {
            headers: {
                'Authorization': `Bearer ` + sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const sortedUsers = data.sort((a, b) => a.id - b.id);
                    setUsers(sortedUsers);
                    console.log(sortedUsers);
                } else {
                    setUsers([]);
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (email) => {
        console.log(email)
        fetch(`${PRODUCTION_API_BASE_URL}/auth/delete/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ` + sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email)
        }).then(() => {
            setUpdateUser(!updateUser);
        }).catch(error => {
            console.error('Error deleting item:', error);
        });
    };

    const handleEdit = (user) => {
        setUser(user);
    };

    return (
        <Container>
            <input
                type="text"
                placeholder="Search users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                {filteredUsers.map((user) => (
                    <tr key={user.email}>
                        <td>{user.email}</td>
                        <td>{user.rolesAsStrings.join(' - ')}</td>
                        <td>
                            <button onClick={() => handleEdit(user)}>Edit</button>
                            <button onClick={() => handleDelete(user.email)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </Container>
    );
};

export default UserList