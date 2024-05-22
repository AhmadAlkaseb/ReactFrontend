import {useState} from 'react';
import {PRODUCTION_API_BASE_URL} from "../utils/globalVariables.js";

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
  // const [tags, setTags] = useState([]);
  // const [tagInput, setTagInput] = useState('');
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

  // const handleTagInputChange = (e) => {
  //   setTagInput(e.target.value);
  // };
  //
  //   const handleAddTag = () => {
  //       if (tagInput.trim() !== '') {
  //           setTags((prevTags) => [...prevTags, tagInput.trim()]);
  //       }
  //       console.log(tags);
  //       setTagInput('');
  //   };
  //
  //   const handleTagDelete = (tagToDelete) => {
  //       setTags((prevTags) => prevTags.filter(tag => tag !== tagToDelete));
  //   };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check for errors before submission
    if (Object.keys(errors).length > 0) {
      console.error('Form has errors:', errors);
      return;
    }

    // Henter emailen fra localStorage
    const userEmail = localStorage.getItem('email');

    // Tilføjer emailen til formData, så jeg kan sende den med i body for at oprette et produkt
    const updatedFormData = { ...formData, user: {email: userEmail}};

    fetch(`${PRODUCTION_API_BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedFormData)
    })
        .then(response => response.json())
        .then(data => {
          console.log('printing response:', data);
          // Der skal lige tilføjes en tekst som fotæller at produktet er tilføjet.

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
                  Description:
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
          {/*<div>*/}
          {/*    <label>*/}
          {/*        Tags:*/}
          {/*        <input*/}
          {/*            type="text"*/}
          {/*            value={tagInput}*/}
          {/*            onChange={handleTagInputChange}*/}
          {/*        />*/}
          {/*        <button type="button" onClick={handleAddTag}>Add Tag</button>*/}
          {/*    </label>*/}
          {/*</div>*/}
          {/*<div>*/}
          {/*    {tags.map((tag, index) => (*/}
          {/*        <div key={index}>*/}
          {/*            {tag}*/}
          {/*            <button type="button" onClick={() => handleTagDelete(tag)}>Remove</button>*/}
          {/*        </div>*/}
          {/*    ))}*/}
          {/*</div>*/}
          <button type="submit">Create Item</button>
      </form>
          {itemCreated && <h1>Item successfully created</h1>}
      </>
  );
}