import { createGlobalStyle } from "styled-components";

const Defaults = createGlobalStyle`
    :root {
      --font-primary: "Montserrat";
    
      --color-background: #f0f4f8;
      --color-background: #060b29;
      --color-element: #ffffff;
      --color-element: #0d1633;
      --color-text: #000000;
      --color-text: #ffffff;
      --color-text: #aebcea;
      --color-accent: #5d55fa;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html {
      font-size: 62.5%;
    }

    body {
      position: relative;
      background-color: var(--color-background);
      overflow-x: hidden;
    }

    ul {
      list-style: none;
    }

    button {
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      background-color: transparent;
      border: none;
      cursor: pointer;
    }

    a {
      color: inherit;
      text-decoration: none;
    }
`;

export default Defaults;
