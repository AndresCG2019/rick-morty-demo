import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from "reactstrap";

function Example(args) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark={true} expand={"md"} {...args}>
        <NavbarBrand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Prueba Técnica
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink target="_blank" href="https://github.com/AndresCG2019">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Andrés Castillo</NavbarText>
        </Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default Example;
