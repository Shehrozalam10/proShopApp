import React from "react";
import { Navbar, Nav, Container, NavbarBrand } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
export const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand='md' collapseOnSelect>
        <Container>
          {/* <LinkContainer to="/"> */}
          <Navbar.Brand >
            <img src={logo} alt="ProShop"  />
            ProShop</Navbar.Brand>
          <Navbar.Toggle id="basic-navbar-nav" />
          <Navbar.Collapse id="basic_navbar_nav">
            <Nav className="ms-auto">
              {/* <LinkContainer to="/cart"> */}
              <Nav.Link >
                <FaShoppingCart />Cart
              </Nav.Link>
              {/* </LinkContainer> */}
              <Nav.Link href="/login"><FaUser />Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {/* </LinkContainer> */}
        </Container>
      </Navbar>
    </header>
  );
};
export default Header;
