import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const AppLayout = ({role}) => {
  return (
    <>
    <Header role={role}/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default AppLayout
