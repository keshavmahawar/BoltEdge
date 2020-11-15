import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    li {
        padding: 18px 10px;
    }
    .linkStyle {
        text-decoration: none;
        font-size: medium;
    }
    button {
        border: 0;
        background-color: #00fa9a;
        padding: 8px 13px;
        margin-top: -4px;
        font-size: bolder;
    }
    .line {
        padding-bottom: 8px;
        border-bottom: 3px solid #00fa9a;
    }
    @media (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: white;
        position: fixed;
        transform: ${({ open }) =>
        open ? "translateX(0)" : "translateX(100%)"};
        top: 0;
        right: 0;
        height: 100vh;
        width: 50%;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;
        li {
            color: #fff;
            text-decoration: none;
        }
    }
`;

const NavLinks = ({ open }) => {
    return (
        <Ul open={open}>
            <li>
                {" "}
                <Link
                    to="/login"
                    className="linkStyle line"
                    style={{ color: "grey" }}
                >
                    Login
                </Link>
            </li>
            <li>
                {" "}
                <button>
                    <Link
                        to="/signup"
                        className="linkStyle"

                        style={{ color: "white" }}
                    >
                        Sign Up
                    </Link>
                </button>
            </li>
        </Ul>
    );
};

export default NavLinks;
