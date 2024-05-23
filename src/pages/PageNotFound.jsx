import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Gif src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif" alt="Page Not Found" />
      <Message>Page not found.</Message>
      <ButtonContainer>
        <Button onClick={() => navigate(-1)}>Go back</Button>
        <Button onClick={() => navigate('/')}>Go back to home</Button>
      </ButtonContainer>
    </Container>
  );
};

export default PageNotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 95vh;
  text-align: center;
`;

const Gif = styled.img`
  max-width: 800px;
  width: 200%;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #ff6347; /* Tomato color */
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #003f7f;
  }
`;
