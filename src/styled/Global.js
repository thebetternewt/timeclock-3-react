import { createGlobalStyle } from 'styled-components';
import { GRAY3 } from './utilities';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
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
  }

  h1.title {
    text-transform: uppercase;
    opacity: 0.6;
    margin: 0  0 1em;
    font-size: 1rem;
    font-weight: 500;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;
