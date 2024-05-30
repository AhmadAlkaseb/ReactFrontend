import {useState} from 'react';
import {PRODUCTION_API_BASE_URL} from "../utils/globalVariables.js";
import styled from "styled-components";


const Container = styled.div`
    margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PageHeader = styled.h1`
    padding-top: 50px;
    text-align: center;
    margin-bottom: 20px;
    font-size: 100px;
    color: #333;
`;


export default function SetItemForSale () {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    fullName: '',
    address: '',
    zipCode: '',
    phoneNumber: ''
  });
  
  const [errors, setErrors] = useState({});
  const [itemCreated, setItemCreated] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    if (name === 'zipCode' || name === 'phoneNumber') {
      if (!/^\d*$/.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Must be a number'
        });
      } else {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      console.error('Form has errors:', errors);
      return;
    }

    
    const userEmail = sessionStorage.getItem('email');

    
    const updatedFormData = { ...formData, user: {email: userEmail}};

    fetch(`${PRODUCTION_API_BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedFormData)
    })
        .then(response => response.json())
        .then(data => {
          console.log('printing response:', data);
          

          setFormData({
                title: '',
                description: '',
                price: '',
                fullName: '',
                address: '',
                zipCode: '',
              phoneNumber: ''
              }
          )
            setItemCreated(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  };

  return (
    <>
    <PageHeader>Sell items</PageHeader>
      <Container>
      <form onSubmit={handleSubmit}>
          <div>
              <label>
                  Title:
                  <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                  />
              </label>
          </div>
          <div>
              <label>
                  Description:<br/>
                  <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                  />
              </label>
          </div>
          <div>
              <label>
                  Price:
                  <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                  />
              </label>
          </div>
          <div>
              <label>
                  Full Name:
                  <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                  />
              </label>
          </div>
          <div>
              <label>
                  Address:
                  <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                  />
              </label>
          </div>
          <div>
              <label>
                  Zip Code:
                  <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                  />
                  {errors.zipCode && <span>{errors.zipCode}</span>}
              </label>
          </div>
          <div>
              <label>
                  Phone Number:
                  <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                  />
                  {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
              </label>
          </div>
          
          <button type="submit">Create Item</button>
      </form>
          {itemCreated && <h1>Item successfully uploaded</h1>}
      </Container>
      </>
  );
}