import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from "./styles/globalStyles.js";
import GlobalFormStyle from "./styles/GlobalFormStyle.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalStyles/>
        <GlobalFormStyle/>
        <App/>
    </React.StrictMode>,
)