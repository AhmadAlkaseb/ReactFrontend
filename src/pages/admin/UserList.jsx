import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { PRODUCTION_API_BASE_URL } from '../../utils/globalVariables.js';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75vh;
`;

const SearchInput = styled.input`
    margin-bottom: 20px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 300px;
`;

const Title = styled.h2`
    margin: 20px 0;
    color: #333;
    display: flex;
    justify-content: center;
`;

const TablesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
`;

const TableWrapper = styled.div`
    width: 45%;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const TableHeader = styled.th`
    border: 1px solid #ccc;
    padding: 10px;
`;

const TableCell = styled.td`
    border: 1px solid #ccc;
    padding: 10px;
    text-align: center;
`;

const Button = styled.button`
    padding: 8px 12px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${(props) => {
        if (props.primary) return '#4CAF50';
        if (props.danger) return '#f44336';
        if (props.edit) return '#4CAF50';
        return '#008CBA';
    }};
    color: white;
    transition: background-color 0.3s ease;
    margin: 0 5px;

    &:hover {
        background-color: ${(props) => {
            if (props.primary) return '#388E3C';
            if (props.danger) return '#d32f2f';
            if (props.edit) return '#388E3C';
            return '#007BB5';
        }};
    }
`;

const UserList = ({ setUser, updateUser, setUpdateUser }) => {
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
                } else {
                    setUsers([]);
                }
            })
            .catch(error => console.error('Error fetching users:', error));
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    const bannedUsers = filteredUsers.filter(user => user.banned);
    const notBannedUsers = filteredUsers.filter(user => !user.banned);

    const handleDelete = (email) => {
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
            console.error('Error deleting user:', error);
        });
    };

    const handleEdit = (user) => {
        setUser(user);
    };

    const handleBan = (email) => {
        fetch(`${PRODUCTION_API_BASE_URL}/auth/banuser/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ` + sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(email)
        }).then(() => {
            setUpdateUser(!updateUser);
        }).catch(error => {
            console.error('Error banning user:', error);
        });
    };

    return (
        <Container>
            <SearchInput
                type="text"
                placeholder="Search users"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <TablesContainer>
                <TableWrapper>
                    <Title>Users</Title>
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Email</TableHeader>
                                <TableHeader>Role</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {notBannedUsers.map((user) => (
                                <tr key={user.email}>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.rolesAsStrings.join(' - ')}</TableCell>
                                    <TableCell>
                                        <Button edit onClick={() => handleEdit(user)}>Edit</Button>
                                        <Button onClick={() => handleBan(user.email)}>Ban</Button>
                                        <Button danger onClick={() => handleDelete(user.email)}>Delete</Button>
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrapper>
                <TableWrapper>
                    <Title>Banned Users</Title>
                    <Table>
                        <thead>
                            <tr>
                                <TableHeader>Email</TableHeader>
                                <TableHeader>Role</TableHeader>
                                <TableHeader>Actions</TableHeader>
                            </tr>
                        </thead>
                        <tbody>
                            {bannedUsers.map((user) => (
                                <tr key={user.email}>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.rolesAsStrings.join(' - ')}</TableCell>
                                    <TableCell>
                                        <Button edit onClick={() => handleEdit(user)}>Edit</Button>
                                        <Button danger onClick={() => handleDelete(user.email)}>Delete</Button>
                                    </TableCell>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrapper>
            </TablesContainer>
        </Container>
    );
};

export default UserList;
