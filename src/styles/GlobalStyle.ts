import { createGlobalStyle } from 'styled-components';

export const theme = {
  palette: {
    primary: '#731DD8',
    white: '#FFFFFF',
    text: '#050517',
    blue: '#050517',
    honey: '#050517',
  },
};

export const GlobalStyle = createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
`;
