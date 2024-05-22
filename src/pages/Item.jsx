import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemById } from '../services/apiFacade';

export default () => {
  let params = useParams();
  const [item, setItem] = useState({});

  useEffect(() => {
    try {
        getItemById(params.itemid)
            .then(data => setItem(data))
    } catch (error) {
        console.log(error.message)
    }
  }, [])

  return (
    <>
      <h1>{item.title}</h1>
      <p>Price: ${item.price}</p>
      <img src="/item-for-sale.jpg" alt="Item for sale" />
      <h2>Item description:</h2>
      <p>{item.description}</p>
      <h2>Contact info:</h2>
      <p>
        Name: {item.fullName} <br />
        Address: {item.address} <br />
        Zip: {item.zipCode} <br />
        Phone: {item.phoneNumber} <br />
        Email: {item.userEmail}
      </p>
    </>
  )
}
