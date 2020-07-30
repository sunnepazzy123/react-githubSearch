import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import logoImg from "../images/wdt-brandwhite.png";

const Navbar = () => {
  // const { isAuthenticated, loginWithRedirect, logout, user, isLoading} = useAuth0();
  return <Wrapper>
    <img src={logoImg} className=""/>
      <b>Powered By WireDev</b>
  </Wrapper>;
};

const Wrapper = styled.nav`
  padding: 1.5rem;
  margin-bottom: 4rem;
  background: var(--clr-white);
  text-align: center;
  display: grid;
  grid-template-columns: auto auto 100px;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  h4 {
    margin-bottom: 0;
    font-weight: 400;
  }
  b{
    font-size: 16px;
  }
  img {
    width: 50px !important;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
  button {
    background: transparent;
    border: transparent;
    font-size: 1.2rem;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
`;

export default Navbar;
