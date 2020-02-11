import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import SettingsModal from "./SettingsModal";

import { ReactComponent as SettingsIcon } from "./icons/settings.svg";
import { ReactComponent as SearchIcon } from "./icons/search.svg";
import { ReactComponent as HamburgerIcon } from "./icons/hamburger.svg";

const Navbar = styled.ul`
  display: flex;
  align-items: center;
  padding: 0 50px;
  background-color: var(--color-navbar);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 100%;
  height: 60px;
  transition: background-color 0.5s ease-out;

  & > li + li {
    margin-left: 30px;
  }

  @media (max-width: 520px) {
    padding: 0 20px;
  }
`;

const NavItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  font-family: var(--font-primary);
  font-size: 22px;
  color: var(--color-navbar-text);

  // border: 1px solid red;

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
    border: 1px solid var(--color-navbar-text);
    // border-bottom: 1px solid var(--color-navbar-text);
    padding: 5px 10px 5px 45px;
  }

  @media (max-width: 1440px) {
    font-size: 16px;
  }

  @media (max-width: 630px) {
    font-size: 14px;
  }

  @media (max-width: 520px) {
    font-size: 12px;
  }
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  fill: var(--color-navbar-text);
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const StyledSearchIcon = styled(SearchIcon)`
  fill: var(--color-navbar-text);
  position: absolute;
  left: 13px;
  top: 21px;
  width: 17.5px;
`;

const StyledHamburgerIcon = styled(HamburgerIcon)`
  display: none;
  fill: var(--color-navbar-text);
  width: 20px;

  @media (max-width: 960px) {
    display: block;
  }
`;

const NavbarComp = ({
  theme,
  setTheme,
  searchVal,
  setSearchVal,
  searchCriteria,
  setSearchCriteria
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

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
      <NavItem className="non-mobile">
        <StyledSettingsIcon onClick={() => setSettingsOpen(true)} />
        {settingsOpen &&
          ReactDOM.createPortal(
            <SettingsModal
              dismissFunc={() => setSettingsOpen(false)}
              theme={theme}
              setTheme={setTheme}
              searchCriteria={searchCriteria}
              setSearchCriteria={setSearchCriteria}
            />,
            document.querySelector("#modal")
          )}
      </NavItem>
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
