import { useEffect, useState } from 'react';
import {LOCAL_API_BASE_URL, PRODUCTION_API_BASE_URL} from '../../utils/globalVariables';
import styled from 'styled-components';

const Container = styled.div`
    margin: 20px;
`;

const SearchContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
    width: 200px;
    margin-left: auto;
`;

const SearchInput = styled.input`
    padding: 6px;
    font-size: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const ItemsContainer = styled.div`
    display: grid;
    // definer gitter kolonne. 3 kolonner med fraktionel bredde 1
    // dvs udfylder tilgængelig plads ligeligt
    grid-template-columns: repeat(3, 1fr); 
    gap: 20px;
    margin-top: 20px;
`;

const ItemCard = styled.div`
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ItemTitle = styled.h4`
    margin-bottom: 5px;
`;

const ItemDetail = styled.p`
    margin: 0;
`;

const ActionButtons = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
`;

const ActionButton = styled.button`
    padding: 6px 12px;
    font-size: 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: ${(props) => (props.$primary ? '#f44336' : '#4CAF50')}; /* Switched primary and secondary colors */
    color: white;
    transition: background-color 0.3s ease;
    margin-right: 5px;

    &:hover {
        background-color: ${(props) => (props.$primary ? '#d32f2f' : '#388E3C')}; /* Adjusted hover colors accordingly */
    }
`;

const MyItems = ({ update, setUpdate, setItem }) => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, [update]);

    useEffect(() => {
        const filtered = items.filter(item =>
            item.title.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            item.id.toString().startsWith(searchQuery)
        );
        setFilteredItems(filtered);
    }, [searchQuery, items]);

    const fetchItems = () => {
        fetch(`${LOCAL_API_BASE_URL}/items/personal/` + sessionStorage.getItem('email'), {
            headers: {
                'Authorization': `Bearer ` + sessionStorage.getItem('token'),
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const sortedItems = data.sort((a, b) => a.id - b.id); // Sort items by ID
                    setItems(sortedItems);
                    setFilteredItems(sortedItems);
                } else {
                    setItems([]);
                    setFilteredItems([]);
                }
            })
            .catch(error => console.error('Error fetching items:', error));
    };

    const handleButton = (event) => {
        if(event.target.name === 'delete') {
            console.log(event.target)
            fetch(`${LOCAL_API_BASE_URL}/items/` + sessionStorage.getItem('email'), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ` + sessionStorage.getItem('token'),
                    'Content-Type': 'application/json',
                },
                body: event.target.id
            }).then(() => {
                setUpdate(!update);
            }).catch(error => {
                console.error('Error deleting item:', error);
            });
        } else if(event.target.name === 'edit') {
            const id = event.target.id;
            const item = items.find(item => item.id.toString() === id);
            console.log(item)
            handleEdit(item);
        }
    };

    const handleEdit = (item) => {
        setItem(item);
    };

    return (
        <Container>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Search items"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </SearchContainer>

            <ItemsContainer onClick={handleButton}>
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <ItemCard key={item.id}>
                            <ItemTitle>{item.title}</ItemTitle>
                            <ItemDetail>ID: {item.id}</ItemDetail>
                            <ItemDetail>Description: {item.description}</ItemDetail>
                            <ItemDetail>Price: {item.price}</ItemDetail>
                            <ItemDetail>Status: {item.status ? "For sale" : "Sold"}</ItemDetail>
                            <ItemDetail>Full Name: {item.fullName}</ItemDetail>
                            <ItemDetail>Phone Number: {item.phoneNr}</ItemDetail>
                            <ItemDetail>Address: {item.address}</ItemDetail>
                            <ItemDetail>Zip Code: {item.postalCode}</ItemDetail>
                            <ActionButtons>
                                <ActionButton name='edit' id={item.id}>Edit</ActionButton>
                                <ActionButton name='delete' $primary id={item.id}>Delete</ActionButton>
                            </ActionButtons>
                        </ItemCard>
                    ))
                ) : (
                    <p>No items found.</p>
                )}
            </ItemsContainer>
        </Container>
    );
};
export default MyItems;
