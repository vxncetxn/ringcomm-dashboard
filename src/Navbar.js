import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useIdentityContext } from "react-netlify-identity";

import { ToastContext } from "./Context";

import SettingsModal from "./SettingsModal";

import { ReactComponent as SettingsIcon } from "./icons/settings.svg";
import { ReactComponent as LogoutIcon } from "./icons/logout.svg";
import { ReactComponent as SearchIcon } from "./icons/search.svg";

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

  & > li:nth-child(1) {
    margin-right: auto;
  }

  @media (max-width: 960px) {
    & > li + li {
      margin-left: 15px;
    }

    & > li:nth-child(1) {
      display: none;
    }

    & > li:nth-child(2) {
      margin-left: 0;
      margin-right: auto;
    }
  }

  @media (max-width: 630px) {
    padding: 0 20px;
  }
`;

const NavItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  font-family: var(--font-primary);
  font-size: 18px;
  color: var(--color-navbar-text);

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
`;

const StyledSettingsIcon = styled(SettingsIcon)`
  fill: var(--color-navbar-text);
  width: 24px;
  height: 24px;
  cursor: pointer;

  @media (max-width: 960px) {
    width: 24px;
    height: 24px;
  }

  @media (max-width: 630px) {
    width: 24px;
    height: 24px;
  }
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  fill: var(--color-navbar-text);
  width: 23px;
  height: 23px;
  cursor: pointer;

  @media (max-width: 960px) {
    width: 23px;
    height: 23px;
  }

  @media (max-width: 630px) {
    width: 23px;
    height: 23px;
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  fill: var(--color-navbar-text);
  position: absolute;
  left: 13px;
  top: 21px;
  width: 17.5px;
`;

const SearchBar = styled.input`
  width: 400px;

  @media (max-width: 630px) {
    width: 200px;
  }
`;

const NavbarComp = ({
  theme,
  setTheme,
  autoReload,
  setAutoReload,
  searchVal,
  setSearchVal,
  searchCriteria,
  setSearchCriteria
}) => {
  const setToastInfo = useContext(ToastContext);
  const { user, logoutUser } = useIdentityContext();
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Navbar>
      <NavItem>
        {user.user_metadata.full_name
          ? `Welcome, ${user.user_metadata.full_name}!`
          : "Welcome to RingDash!"}
      </NavItem>
      <NavItem>
        <StyledSearchIcon />
        <SearchBar
          value={searchVal}
          placeholder="Search"
          onChange={e => setSearchVal(e.target.value)}
        ></SearchBar>
      </NavItem>
      <NavItem>
        <StyledSettingsIcon onClick={() => setSettingsOpen(true)} />
        {settingsOpen &&
          ReactDOM.createPortal(
            <SettingsModal
              dismissFunc={() => setSettingsOpen(false)}
              theme={theme}
              setTheme={setTheme}
              autoReload={autoReload}
              setAutoReload={setAutoReload}
              searchCriteria={searchCriteria}
              setSearchCriteria={setSearchCriteria}
            />,
            document.querySelector("#modal")
          )}
      </NavItem>
      <NavItem>
        <StyledLogoutIcon
          onClick={() => {
            logoutUser()
              .then(() =>
                setToastInfo({
                  triggered: true,
                  message: "Successfully logged out.",
                  persistent: false
                })
              )
              .catch(() =>
                setToastInfo({
                  triggered: true,
                  message: "Log out failed - something went wrong.",
                  persistent: true
                })
              );
          }}
        />
      </NavItem>
    </Navbar>
  );
};

export default NavbarComp;
