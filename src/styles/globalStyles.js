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

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
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

    @media (max-width: 768px) {
        ul {
            position: fixed;
            top: 0;
            left: -100%;
            height: 100vh;
            width: 100%;
            background: black;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: left 0.3s ease;
        }

        ul.active {
            left: 0;
        }

        li {
            margin: 15px 0;
        }

        .burger {
            display: flex;
            position: fixed;
            top: 15px;
            right: 20px;
        }
    }

    @media (max-width: 480px) {
        h1 {
            font-size: 18px;
        }

        a {
            padding: 6px 12px;
            font-size: 14px;
        }

        ul {
            padding: 5px 0;
        }
    }
`;

export default GlobalStyles;