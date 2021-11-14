import { Fragment } from 'react';
import { useLogout } from 'hooks/useLogout';
import { useAuthContext } from 'hooks/useAuthContext';
import Picture from 'assets/icons8-picture.svg';
import { Logo, NavItems, StyledLink, StyledNavbar } from './Navbar.styled';
import { StyledButton } from 'styles/GlobalStyle';

const Navbar = () => {
  const { state: user } = useAuthContext();
  const { isPending, logout } = useLogout();
  return (
    <StyledNavbar>
      <NavItems>
        <Logo>
          <img src={Picture} alt='Logo' />
          <span>PhotoShoot</span>
        </Logo>
        {!user && (
          <Fragment>
            <li>
              <StyledLink to='/login'>Login</StyledLink>
            </li>
            <li>
              <StyledLink to='/signup'>Signup</StyledLink>
            </li>
          </Fragment>
        )}
        {user && (
          <li>
            {!isPending && <StyledButton onClick={logout}>Logout</StyledButton>}
            {isPending && <StyledButton disabled>Loading...</StyledButton>}
          </li>
        )}
      </NavItems>
    </StyledNavbar>
  );
};

export default Navbar;
