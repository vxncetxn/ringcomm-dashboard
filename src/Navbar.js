import React, { useState } from "react";
import styled from "styled-components";

import { ReactComponent as SearchIcon } from "./icons/search.svg";
import { ReactComponent as HamburgerIcon } from "./icons/hamburger.svg";

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

  @media (max-width: 480px) {
    padding: 0 20px;
  }
`;

const NavItem = styled.li`
  position: relative;
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

  & > input {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: transparent;
    border: 1px solid var(--color-text);
    // border-bottom: 1px solid var(--color-text);
    padding: 5px 10px 5px 45px;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  fill: var(--color-text);
  position: absolute;
  left: 13px;
  top: 7.5px;
  width: 17.5px;
`;

const StyledHamburgerIcon = styled(HamburgerIcon)`
  display: none;
  fill: var(--color-text);
  width: 20px;

  @media (max-width: 960px) {
    display: block;
  }
`;

const NavbarComp = () => {
  const [searchVal, setSearchVal] = useState("");

  const updateSearchVal = query => {
    setSearchVal(query);
  };

  return (
    <Navbar>
      <NavItem style={{ marginRight: "auto" }}>LogoPlaceholder</NavItem>
      <NavItem className="non-mobile">
        <StyledSearchIcon />
        <input
          value={searchVal}
          placeholder="Search"
          onChange={e => setSearchVal(e.target.value)}
        ></input>
      </NavItem>
      <NavItem className="non-mobile">Main</NavItem>
      <NavItem className="non-mobile">Inventory</NavItem>
      <NavItem className="non-mobile">Settings</NavItem>
      <NavItem className="non-mobile">
        <img src={require("./profile.jpg")} alt="Profile" />
      </NavItem>
      <NavItem>
        <StyledHamburgerIcon />
      </NavItem>
    </Navbar>
  );
};

export default NavbarComp;
