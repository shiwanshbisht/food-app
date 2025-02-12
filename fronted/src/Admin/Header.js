import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <Navbar bg="">
        <Container>
          <Link to="/" className="navbar-brand fs-1 ">
            Home
          </Link>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/menu">
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/Order">
              Order
            </Nav.Link>
            <Nav.Link as={Link} to="/Expense">
              Expense
            </Nav.Link>
            <Nav.Link as={Link} to="/addmember">
              Add Member
            </Nav.Link>
            <Nav.Link as={Link} to="/addmenu">
              Add Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/issue">
              Issue
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
