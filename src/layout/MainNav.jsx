import React from 'react'
import { NavLink } from 'react-router-dom'
const MainNav = () => {
  return (
    <>
    <ul>
      <li><NavLink to="/home">Home</NavLink> </li>
      <li><NavLink to="/itemsforsale">Items for sale</NavLink> </li>
      <li><NavLink to="/setitemforsale">Set item for sale</NavLink> </li>
      <li><NavLink to="/mylisteditems">My listed items</NavLink> </li>
      <li><NavLink to="/createitem">Create item</NavLink></li>
      <li><NavLink to="/logout">Log out</NavLink> </li>
    </ul>
    </>
  )
}

export default MainNav