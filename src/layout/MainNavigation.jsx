import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes library

function MainNavigation(loggedIn) {

    return (
        <>
            <ul>
                <li><NavLink to="/home">Home</NavLink></li>
                <li><NavLink to="/hotels">See available hotels</NavLink></li>
                <li style={{ visibility: loggedIn ? 'visible' : 'hidden' }}>
                    <NavLink to="/login">login</NavLink>
                </li>
                <li style={{ visibility: loggedIn ? 'hidden' : 'visible' }}>
                    <NavLink to="/loggedout">Logout</NavLink>
                </li>
            </ul>
        </>
    );
}
export default MainNavigation;
