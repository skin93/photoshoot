import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const theme = {
  colors: {
    primary: '#731DD8',
    white: '#FFFFFF',
    text: '#050517',
    blue: '#050517',
    honey: '#050517',
  },
};

export const Error = styled.div`
  color: red;
  background: pink;
  border: 1px solid red;
  border-radius: 4px;
  padding: 8px;
  margin: 10px 0;
`;

export const StyledButton = styled.button`
  background: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  font-size: 1em;
  border: 1px solid ${(props) => props.theme.colors.primary};
  &:hover {
    color: #fff;
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

export const PageTitle = styled.h2`
  font-size: 1em;
  color: ${theme.colors.text};
  display: inline-block;
`;

export const GlobalStyle = createGlobalStyle`
  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ul {
    list-style-type: none;
  }
`;
