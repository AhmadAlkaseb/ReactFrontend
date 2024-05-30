import { useEffect, useState } from 'react'
import { getAllItemsForSale } from '../services/apiFacade';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

  const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin: 0 20px;
  `;

  const ContainerChild = styled.div`
    flex-grow: 1;
    flex-basis: 300px;
    padding: 30px 15px;
    text-align: center;
    background-color: #e3e3e3;
    border-radius: 10px;
  `;

  const ItemPhoto = styled.img`
    width: 100%;
    margin-bottom: 10px;
  `;

  const Title = styled.h2`
    font-size: 28px;
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
  `;

  const StyledLink = styled(Link)`
    font-size: 20px;
    background-color: blue;
    color: white;
  `;

const PageHeader = styled.h1`
padding-top: 50px;
text-align: center;
margin-bottom: 20px;
font-size: 100px;
color: #333;
`;

export default function ItemsForSale() {
  const [itemsForSale, setItemsForSale] = useState([]);

  useEffect(() => {
    try {
      getAllItemsForSale()
        .then(data => setItemsForSale(data))
    } catch (error) {
      console.log(error.message)
    }
  }, []);

  return (
    <>
    <PageHeader>Items for sale</PageHeader>
    <Container>
      {itemsForSale && itemsForSale.map((item) => (
        item.status && (
          <ContainerChild key={item.id}>
            <ItemPhoto src="/item-for-sale.jpg" alt="Item for sale" />
            <Title>{item.title}</Title>
            <Desc>{item.description}</Desc>
            <Price>${item.price}</Price>
            <StyledLink to={`/item/${item.id}`}>See item</StyledLink>
          </ContainerChild>
        )
      ))}
    </Container>
  </>
  )
}
