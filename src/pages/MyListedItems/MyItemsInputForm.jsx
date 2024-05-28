import { PRODUCTION_API_BASE_URL } from '../../utils/globalVariables';
import styled from 'styled-components';

const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #e9ecef; /* Fallback for older browsers */
    background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Fieldset = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
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
    background-color: ${(props) => (props.$primary ? '#4CAF50' : '#f44336')};
    color: white;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.$primary ? '#388E3C' : '#d32f2f')};
    }
`;

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
        const email = sessionStorage.getItem('email');
        const url = `${PRODUCTION_API_BASE_URL}/items/${email}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ` + sessionStorage.getItem('token'),
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
                <FormContainer onSubmit={handleSubmit}>
                    <Fieldset>
                        <Column>
                            <Title>Item Info</Title>
                            <Label htmlFor='id'>ID</Label>
                            <Input disabled
                                type='number' 
                                id='id' 
                                value={item.id || ''} 
                                placeholder='' 
                                onChange={handleChange} 
                            />
                            
                            <Label htmlFor='title'>Title</Label>
                            <Input 
                                type='text' 
                                id='title' 
                                value={item.title || ''} 
                                placeholder='Enter title' 
                                onChange={handleChange} 
                            />
                            
                            <Label htmlFor='description'>Description</Label>
                            <Input 
                                type='text' 
                                id='description' 
                                value={item.description || ''} 
                                placeholder='Enter description' 
                                onChange={handleChange} 
                            />
                            
                            <Label htmlFor='price'>Price</Label>
                            <Input 
                                type='number' 
                                id='price' 
                                value={item.price || ''} 
                                placeholder='Enter price' 
                                onChange={handleChange} 
                            />
                            
                            <Label htmlFor='status'>Status</Label>
                            <Select 
                                id='status' 
                                value={item.status ? 'For sale' : 'Sold'} 
                                onChange={handleChange}
                            >
                                <option value='For sale'>For sale</option>
                                <option value='Sold'>Sold</option>
                            </Select>
                        </Column>
                        <Column>
                            <Title>Contact Info</Title>
                            <Label htmlFor='fullName'>Full Name</Label>
                            <Input 
                                type='text' 
                                id='fullName' 
                                value={item.fullName || ''} 
                                placeholder='Enter full name' 
                                onChange={handleChange} 
                            />
                            
                            <Label htmlFor='phoneNr'>Phone Number</Label>
                            <Input 
                                type='text' 
                                id='phoneNr' 
                                value={item.phoneNr || ''} 
                                placeholder='Enter phone number' 
                                onChange={handleChange} 
                            />
                            
                            <Label htmlFor='address'>Address</Label>
                            <Input 
                                type='text' 
                                id='address' 
                                value={item.address || ''} 
                                placeholder='Enter address' 
                                onChange={handleChange} 
                            />
                            
                            <Label htmlFor='postalCode'>Zip Code</Label>
                            <Input 
                                type='text' 
                                id='postalCode' 
                                value={item.postalCode || ''} 
                                placeholder='Enter zip code' 
                                onChange={handleChange} 
                            />
                        </Column>
                    </Fieldset>
                    <ButtonContainer>
                        <Button type='button' onClick={handleCancel}>Cancel</Button>
                        <Button $primary type='submit'>Save edit</Button>
                    </ButtonContainer>
                </FormContainer>
            )}
        </>
    );
};

export default MyItemsInputForm;
