import React from 'react';
import { PRODUCTION_API_BASE_URL } from '../../utils/globalVariables';

const MyItemsInputForm = ({ update, setUpdate, item, setItem }) => {

    const handleChange = (event) => {
        const { id, value } = event.target;
        setItem({ 
            ...item, 
            [id]: id === 'status' ? value === 'For sale' : value 
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = localStorage.getItem('email');
        const url = `${PRODUCTION_API_BASE_URL}/items/${email}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ` + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: item.id,
                title: item.title,
                description: item.description,  
                price: item.price, 
                status: item.status,
                fullName: item.fullName,
                phoneNumber: item.phoneNr,
                address: item.address,
                zipCode: item.postalCode
            })
        })
        .then(response => response.json())
        .then(() => {
            setItem({
                id: '',
                title: '',
                description: '',
                price: '',
                status: '',
                fullName: '',
                phoneNumber: '',
                address: '',
                zipCode: ''
            });
            setUpdate(!update);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleCancel = (event) => {
        event.preventDefault();
        setItem({
            id: '',
            title: '',
            description: '',
            price: '',
            status: '',
            fullName: '',
            phoneNumber: '',
            address: '',
            zipCode: ''
        });
    };

    return (
        <>
            {item.id && (
                <form onSubmit={handleSubmit}>
                    <input disabled
                        type='number' 
                        id='id' 
                        value={item.id || ''} 
                        placeholder='' 
                        onChange={handleChange} 
                    />
                    <input 
                        type='text' 
                        id='title' 
                        value={item.title || ''} 
                        placeholder='Enter title' 
                        onChange={handleChange} 
                    />
                    <input 
                        type='text' 
                        id='description' 
                        value={item.description || ''} 
                        placeholder='Enter description' 
                        onChange={handleChange} 
                    />
                    <input 
                        type='number' 
                        id='price' 
                        value={item.price || ''} 
                        placeholder='Enter price' 
                        onChange={handleChange} 
                    />
                    <select 
                        id='status' 
                        value={item.status ? 'For sale' : 'Sold'} 
                        onChange={handleChange}
                    >
                        <option value='For sale'>For sale</option>
                        <option value='Sold'>Sold</option>
                    </select>
                    <input 
                        type='text' 
                        id='fullName' 
                        value={item.fullName || ''} 
                        placeholder='Enter full name' 
                        onChange={handleChange} 
                    />
                    <input 
                        type='text' 
                        id='phoneNr' 
                        value={item.phoneNr || ''} 
                        placeholder='Enter phone number' 
                        onChange={handleChange} 
                    />
                    <input 
                        type='text' 
                        id='address' 
                        value={item.address || ''} 
                        placeholder='Enter address' 
                        onChange={handleChange} 
                    />
                    <input 
                        type='text' 
                        id='postalCode' 
                        value={item.postalCode || ''} 
                        placeholder='Enter zip code' 
                        onChange={handleChange} 
                    />
                    <button type='submit'>Save edit</button>
                    <button type='button' onClick={handleCancel}>Cancel</button>
                </form>
            )}
        </>
    );
};

export default MyItemsInputForm;