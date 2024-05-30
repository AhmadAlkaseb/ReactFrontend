import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getItemById } from '../services/apiFacade';
import styled from 'styled-components';

  const Container = styled.div`
    margin: 20px auto;
    padding: 30px 15px;
    background-color: #e3e3e3;
    border-radius: 10px;
  `;

  const ItemPhoto = styled.img`
    width: 100%;
    max-width: 400px;
    margin-bottom: 10px;
  `;

  const Desc = styled.p`
    font-size: 20px;
    margin-bottom: 10px;
  `;

  const Price = styled.p`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
  `;

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
      <Container>
        <h1>{item.title}</h1>
        <Price>Price: ${item.price}</Price>
        <ItemPhoto src="/item-for-sale.jpg" alt="Item for sale" />
        <h2>Item description:</h2>
        <Desc>{item.description}</Desc>
        <h2>Contact info:</h2>
        <Desc>
          Name: {item.fullName} <br />
          Address: {item.address} <br />
          Zip code: {item.postalCode} <br />
          Private Phonenumber: {item.phoneNr} <br />
          Email: {item.userEmail}
        </Desc>
      </Container>
    </>
  )
}
