<<<<<<< Updated upstream
import React from 'react';
import Header from "./Header.jsx";
import {Outlet} from "react-router-dom";

function AppLayout() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}

export default AppLayout;
=======
import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    </>
  )
}

export default AppLayout
>>>>>>> Stashed changes
