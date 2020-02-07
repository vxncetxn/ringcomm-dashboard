import { createGlobalStyle } from "styled-components";
import "react-image-lightbox/style.css";

const Defaults = createGlobalStyle`
    :root {
      --font-primary: "Montserrat";

      --color-50: #5058af;

      // --color-10
      --color-background: #101223;

      // --color-15
      --color-element-dark: #181a34;

      // --color-20
      --color-element-light: #202346;

      --color-navbar: #181a34;

      // --color-80
      --color-text: #b9bcdf;
      --color-navbar-text: #b9bcdf;

      // --color-65
      --color-accent-main: #858ac7;

      // --color-30
      --color-shimmer-bg: #303569;

      // --color-40
      --color-shimmer-shine: #40478c;

      --color-accent-pending: #f7bb18;
      --color-accent-processed: #bf18f7;
      --color-accent-collected: #40b11b;
      --color-accent-stock: #184ff7;
      --color-warning: #b11b1b;
    }

    [theme="light"] {    
      // --color-black-97
      --color-background: #f7f7f7;

      // --color-black-100
      --color-element-dark: #ffffff;

      // --color-black-93
      --color-element-light: #eeeef7;

      // --color-50
      --color-navbar: #5058af;

      // --color-30
      --color-text: #303569;

      // --color-90
      --color-navbar-text: #dcdeef;

      // --color-50
      --color-accent-main: #5058af;

      // --color-85
      --color-shimmer-bg: #cbcde7;

      // --color-95
      --color-shimmer-shine: #eeeef7;

      --color-accent-pending: #f5d63d;
      --color-accent-processed: #d477d4;
      --color-accent-collected: #77d477;
      --color-accent-stock: #778fd4;
      --color-warning: #b11b1b;
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
      transition: background-color 0.5s ease-out;
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

    .toast-animation-enter {
      transform: translateY(0);
    }
    .toast-animation-enter-active {
      transform: translateY(-130px);
      transition: transform 200ms;
    }
    .toast-animation-exit {
      transform: translateY(-130px);
    }
    .toast-animation-exit-active {
      transform: translateY(0);
      transition: transform 200ms;
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
