import React, { useEffect, useState } from 'react';
import { PRODUCTION_API_BASE_URL } from '../../utils/globalVariables';

const MyItems = ({ update, setUpdate, setItem }) => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        fetch(`${PRODUCTION_API_BASE_URL}/items/personal/` + localStorage.getItem('email'), {
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setItems(data);
                    setFilteredItems(data);
                } else {
                    setItems([]);
                    setFilteredItems([]);
                }
            })
            .catch(error => console.error('Error fetching items:', error));
    }, [update]);

    useEffect(() => {
        const filtered = items.filter(item =>
            item.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            item.id.toString().startsWith(searchQuery)
        );
        setFilteredItems(filtered);
    }, [searchQuery, items]);

    const handleDelete = (event) => {
        fetch(`${PRODUCTION_API_BASE_URL}/items/` + localStorage.getItem('email'), {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json',
            },
            body: event.target.id
        }).then(() => {
            setUpdate(!update);
        }).catch(error => {
            console.error('Error deleting item:', error);
        });
    };

    const handleEdit = (item) => {
        setItem(item);
    };

    return (
        <>
            <input
                type="text"
                placeholder="Search items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Fullname</th>
                        <th>Phone number</th>
                        <th>Address</th>
                        <th>Zipcode</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.status ? "For sale" : "Sold"}</td>
                                <td>{item.fullName}</td>
                                <td>{item.phoneNr}</td>
                                <td>{item.address}</td>
                                <td>{item.postalCode}</td>
                                <td><button onClick={() => handleEdit(item)}>Edit</button></td>
                                <td><button id={item.id} onClick={handleDelete}>Delete</button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11">No items found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default MyItems;
