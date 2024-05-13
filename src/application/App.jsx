import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "../layout/AppLayout.jsx";
import {Home} from "../pages/Home.jsx";
import {Hotels} from "../pages/hotel/Hotels.jsx";
import {Login} from "../pages/authentication/Login.jsx";
import {LoggedIn} from "../pages/authentication/LoggedIn.jsx";
import {useState} from "react";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route element={<AppLayout loggedIn={loggedIn} />}>
              <Route index element={<Navigate to="home"/>}/>
              <Route path="/home" element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
              <Route path="/loggedin" element={<LoggedIn />} />
              <Route path="/loggedout" element={<h1>Loggedout</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
