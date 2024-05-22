import { NavLink } from 'react-router-dom'
import styled from "styled-components";
import {useState} from "react";

const Nav = styled.nav`
  ul {
    background-color: black;
    list-style-type: none;
    width: 100vw;
    padding: 0;
    height: 60px;
    display: flex;
    justify-content: end;
    align-items: center;
    position: relative;

    @media (max-width: 768px) {
      position: fixed;
      top: 0;
      left: -100%;
      height: 100vh;
      width: 100%;
      background: rgba(0, 0, 0, 0.9); /* Gør baggrunden lidt gennemsigtig */
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: left 0.3s ease;
      z-index: 1; /* Sørg for at menuen ligger over andre elementer */
    }

    &.active {
      left: 0;
    }

    li {
      margin-right: 30px;

      @media (max-width: 768px) {
        margin: 15px 0;
      }
    }

    a {
      color: #fff; /* Gør teksten hvid, så den er synlig på den sorte baggrund */
      text-decoration: none;
      padding: 8px 16px;
      border-radius: 20px;
      background-color: #333;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: #555;
      }
    }
  }

  .burger {
    display: none;
    flex-direction: column;
    cursor: pointer;
    z-index: 2; /* Sørg for at burger-ikonet ligger over menuen */

    span {
      height: 4px;
      width: 25px;
      background: #333;
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

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };


  return (
      <Nav>
        <div className="burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={isOpen ? 'active' : ''}>
          <li><NavLink to="/home" onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/itemsforsale" onClick={closeMenu}>Items for sale</NavLink></li>
          <li><NavLink to="/setitemforsale" onClick={closeMenu}>Set item for sale</NavLink></li>
          <li><NavLink to="/mylisteditems" onClick={closeMenu}>My listed items</NavLink></li>
          <li><NavLink to="/logout" onClick={closeMenu}>Log out</NavLink></li>
        </ul>
      </Nav>
  )
}

export default MainNav