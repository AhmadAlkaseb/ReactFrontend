import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
`


const AppLayout = ({role}) => {
  return (
    <Container>
    <Header role={role}/>
    <Outlet/>
    <Footer/>
    </Container>
  )
}

export default AppLayout
