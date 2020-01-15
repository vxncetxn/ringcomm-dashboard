import React from "react";
import styled from "styled-components";

const Navbar = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 50px;
  background-color: var(--color-element);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 100%;
  height: 60px;

  & > li + li {
    margin-left: 30px;
  }
`;

const NavItem = styled.li`
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  //   text-transform: uppercase;
  transform: translateY(3px);

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
`;

const NavbarComp = () => {
  return (
    <Navbar>
      <NavItem style={{ marginLeft: "auto" }}>Main</NavItem>
      <NavItem>Inventory</NavItem>
      <NavItem>Settings</NavItem>
      {/* <NavItem>Profile</NavItem> */}
      <NavItem>
        <img src={require("./profile.jpg")} />
      </NavItem>
    </Navbar>
  );
};

export default NavbarComp;
