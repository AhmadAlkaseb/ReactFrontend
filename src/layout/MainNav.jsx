import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import { useState } from "react";

const Nav = styled.nav`
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%); /* Gradient background */
  position: relative;
  height: 60px;
  display: flex;
  justify-content: center; /* Center items horizontally */
  align-items: center;
  padding: 0 20px; /* Adjusted padding */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* Optional: Add a box shadow */

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 0 10px; /* Adjusted padding */
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center; /* Align items to the left */
    align-items: center;
    flex-grow: 1; /* Fill out the entire width */

    @media (max-width: 768px) {
      position: fixed;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, 0.9);
      top: 60px;
      left: ${props => (props.isOpen ? '0' : '-100%')};
      width: 100%;
      height: calc(100vh - 60px);
      transition: left 0.3s ease;
      z-index: 1;
    }
  }

  li {
    flex: 1; /* Equal flex distribution */
    text-align: center; /* Center text horizontally */
    margin: 0 10px; /* Adjusted margin */
    @media (max-width: 768px) {
      width: 100%;
      margin: 10px 0;
    }
  }

  a {
    color: #333; /* Dark text color */
    text-decoration: none;
    background-color: transparent; /* Transparent background */
    border: 2px solid transparent; /* Transparent border */
    transition: all 0.3s ease;
    display: block; /* Make the anchor element a block-level element */
    font-weight: bold; /* Optional: Make the text bold */
    padding: 12px 20px; /* Adjusted padding */
    position: relative; /* Position relative for pseudo-element */
    min-width: 100px; /* Set minimum width to ensure all buttons are at least this wide */
    text-align: center; /* Center text horizontally */

    &:before {
      content: '';
      position: absolute;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
      z-index: -1;
      border-radius: 30px;
      transition: all 0.3s ease;
    }

    &:hover {
      color: #fff; /* Text color on hover */
      background-color: transparent; /* Transparent background on hover */
      border-color: #fff; /* White border color on hover */

      &:before {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
        box-shadow: 0 0 20px rgba(246, 211, 101, 0.5); /* Shiny effect */
      }
    }
  }

  burger {
    display: none;
    cursor: pointer;
    z-index: 2;

    span {
      height: 4px;
      width: 25px;
      background: #333; /* Dark background for burger menu */
      margin: 3px;
      border-radius: 5px;
      transition: 0.3s ease;
    }

    @media (max-width: 768px) {
      display: flex;
      position: fixed;
      top: 15px;
      right: 20px;
    }
  }
`;

const MainNav = ({role}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isAdmin = role && role.includes('admin');
  console.log(isAdmin);
  console.log(role);


  return (
    <Nav isOpen={isOpen}>
      <div className="burger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul>
        <li><NavLink to="/setitemforsale" onClick={closeMenu}>Sell item</NavLink></li>
        <li><NavLink to="/mylisteditems" onClick={closeMenu}>My items</NavLink></li>
        <li><NavLink to="/home" onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/itemsforsale" onClick={closeMenu}>Shop deals</NavLink></li>
        <li><NavLink to="/logout" onClick={closeMenu}>Logout</NavLink></li>
        {isAdmin && <li><NavLink to="/admin" onClick={closeMenu}>Administration</NavLink></li>}
      </ul>
    </Nav>
  );
};

export default MainNav;
