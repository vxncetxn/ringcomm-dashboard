import { createGlobalStyle } from "styled-components";

const Defaults = createGlobalStyle`
    :root {
      --font-primary: "Montserrat";
    
      --color-background: #060b29;
      --color-element: #0d1633;
      --color-text: #aebcea;
      --color-accent-pending: #bf18f7;
      --color-accent-collected: #f7bb18;
      --color-accent-stock: #184ff7;
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

    .non-mobile {
      @media (max-width: 960px) {
        display: none;
      }
    }

    #search-icon {
      position: absolute;
      left: 13px;
      top: 7.5px;
      width: 17.5px;
    }

    #hamburger-icon {
      width: 20px;
      display: none;

      @media (max-width: 960px) {
        display: block;
      }
    }
`;

export default Defaults;
