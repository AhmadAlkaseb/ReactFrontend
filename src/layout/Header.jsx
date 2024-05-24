import React from 'react'
import MainNav from './MainNav'

const Header = ({role}) => {
  return (
    <>
      <MainNav role={role}/>
    </>
  )
}

export default Header