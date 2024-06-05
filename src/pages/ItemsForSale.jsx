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
    max-width: 300px;
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

const ScrollButton = styled.button`
  width: 200px;  
  background-color: #fda085;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 20px;
    &:hover {
        background-color: #f6d365;
    }
    `;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
`;
export default function ItemsForSale() {
  const [itemsForSale, setItemsForSale] = useState([]);

  // useEffect(() => {
  //   try {
  //     getAllItemsForSale()
  //       .then(data => setItemsForSale(data))
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }, []);

    useEffect(() => {
        getAllItemsForSale((data) => {
            setItemsForSale(data);
        })
    }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <h1>Items for sale</h1>
      <Container>
      {itemsForSale.map((item) => (
        <ContainerChild key={item.id}>

          <ItemPhoto src="/item-for-sale.jpg" alt="Item for sale" />
          <Title>{item.title}</Title>
          <Desc>{item.description}</Desc>
          <Price>${item.price}</Price>
          <StyledLink to={`/item/${item.id}`}>See item</StyledLink>

        </ContainerChild>    
      ))}
      </Container>
      <CenteredContainer>
      <ScrollButton onClick={scrollToTop}>Go back up</ScrollButton>
      </CenteredContainer>
    </>
  )
}
