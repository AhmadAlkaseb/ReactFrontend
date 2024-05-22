import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        //grey colors
        --color-grey-50: #f9fafb;
        --color-grey-100: #f1f5f9;
        --color-grey-200: #e2e8f0;
        --color-grey-300: #cbd5e1;
        --color-grey-400: #94a3b8;
        --color-grey-500: #64748b;
        --color-grey-600: #475569;
        --color-grey-700: #334155;

        //purple colors
        --color-purple-50: #faf5ff;
        --color-purple-100: #f3e8ff;
        --color-purple-200: #e9d5ff;
        --color-purple-300: #d8b4fe;
        --color-purple-400: #c084fc;


    }


    // i starten sørger vi for at der ingen margin og ingen padding er boxsizing - hvad er box sizing???
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: lightgrey;
        font-family: 'Roboto', 'sans-serif'; //hvis ikke robotic virker så tager den sans-serif
        display: flex;
        justify-content: center;
        align-items: center; /* Tilføjet for at centrere indholdet både vertikalt og horisontalt */
    }

    h1 {
        font-size: 24px;
        text-align: center;
        margin-bottom: 20px;
    }


    ul {
        background-color: black;
        list-style-type: none;
        width: 100vw;
        padding: 0;
        height: 60px;
        display: flex;
        justify-content: end;
        align-items: center;
    }

    li {
        margin-right: 30px;
    }

    a {
        color: #333;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 20px;
        background-color: #f0f0f0;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #c0c0c0;
        }
    }
`;

export default GlobalStyles;