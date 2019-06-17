import { createGlobalStyle } from 'styled-components';
import { GRAY3 } from './utilities';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 65px 0 0;
    font-family: "Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${GRAY3};
    color: #fff;
    width: 100%;
  }

  .divider {
    width: 100%;
    height: 2px;
    background-color: #fff;
    opacity: 0.2;
    margin: 4rem 0 3rem;
  }

  h1.title {
    margin: 0 0 1em;
    font-size: 2rem;
    font-weight: 500;
  }

  h2.section-title {
    margin: 0 0 1em;
    font-size: 1.6rem;
    font-weight: 400;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
