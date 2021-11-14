import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavbar = styled.nav`
  width: 100%;
  padding: 30px 0;
  box-sizing: border-box;
  margin-bottom: 80px;
`;

export const NavItems = styled.ul`
  display: flex;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-end;
`;

export const Logo = styled.li`
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  margin-right: auto;
  & > img {
    margin-right: 10px;
    filter: invert(25%);
    width: 36px;
    margin-top: -8px;
  }
`;

export const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  margin-right: 20px;
`;
