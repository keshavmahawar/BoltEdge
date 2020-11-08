import React from "react";
import styled from "styled-components";
import Burger from "./NavbarComponents/Burger";
import { Link } from "react-router-dom";

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
                <Link to="/">
                    <img
                        src="https://www.nutnbolt.co/assets/img/logo.svg"
                        alt="logo"
                    />
                </Link>
            </div>
            <Burger />
        </Nav>
    );
};

export default Navbar;
