import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./NavbarGeneral.css";

const NavbarGeneral = () => {

    return (
        <>
            <Navbar className="navi" fixed="top" bg="dark" variant="dark">
                <Nav className="me-auto">
                    <Nav.Link  href="clientes">Clientes</Nav.Link>
                    <Nav.Link  href="productos">Productos</Nav.Link>
                    <Nav.Link  href="tickets">Tickets</Nav.Link>
                </Nav>
            </Navbar>
        </>
    );
};

export default NavbarGeneral