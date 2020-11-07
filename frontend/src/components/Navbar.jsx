import React from "react";
import styled from "styled-components";
import Burger from "./NavbarComponents/Burger";

const Nav = styled.nav`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #f1f1f1;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

const Navbar = () => {
  return (
    <Nav>
      <div>
        <img src="https://www.nutnbolt.co/assets/img/logo.svg" alt="logo" />
      </div>
      <Burger />
    </Nav>
  );
};

export default Navbar;
