import React, { useState } from "react";
import styled from "styled-components";

import Toggle from "./components/Toggle";
import Checkbox from "./components/Checkbox";
import Selector from "./components/Selector";

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

  ${props =>
    props.function === `settings`
      ? `
      &:hover {
        height: 100px;
      }

      &:hover > ul {
        // display: block;
        transform: scale(1);
      }
    `
      : null}

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

const SettingsMenu = styled.ul`
  // display: none;
  width: 25vw;
  max-height: 80vh;
  overflow-y: scroll;
  position: absolute;
  top: 99px;
  right: -5vw;
  z-index: 999;
  color: var(--color-accent-main);
  border-radius: 10px;
  border: 1px solid var(--color-accent-main);
  background-color: var(--color-element-dark);
  transform: scale(0);
  transition: transform 0.1s linear, background-color 0.5s ease-out;
  padding: 15px 20px;

  & h3 {
    font-size: inherit;
    font-weight: inherit;
    border-bottom: 1px solid var(--color-text);
    margin-bottom: 20px;
  }

  & > div + div {
    margin-top: 40px;
  }

  & > div > div {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > div > div + div {
    margin-top: 10px;
  }
`;

const NavbarComp = ({
  theme,
  setTheme,
  searchVal,
  setSearchVal,
  searchCriteria,
  setSearchCriteria,
  sortCriteria,
  setSortCriteria
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const toggleTheme = checkedVal => {
    const newTheme = checkedVal ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const checkSearchCriteria = (criteria, checkedVal) => {
    let newSearchCriteria = {
      ...searchCriteria
    };
    newSearchCriteria[`${criteria}`] = checkedVal;
    localStorage.setItem("searchCriteria", JSON.stringify(newSearchCriteria));
    setSearchCriteria(newSearchCriteria);
  };

  const selectSortCriteria = selectedVal => {
    localStorage.setItem("sortCriteria", selectedVal);
    setSortCriteria(selectedVal);
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
      <NavItem className="non-mobile" function="settings">
        <StyledSettingsIcon />
        <SettingsMenu>
          <div>
            <h3>Theme</h3>
            <div>
              <label htmlFor="">Light mode</label>
              <Toggle
                name=""
                checked={theme === "dark" ? false : true}
                onChange={e => toggleTheme(e.target.checked)}
              />
            </div>
          </div>
          <div>
            <h3>Search Criteria</h3>
            <div>
              <label htmlFor="">Name</label>
              <Checkbox
                name=""
                checked={searchCriteria.name}
                onChange={e => checkSearchCriteria("name", e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="">Student ID</label>
              <Checkbox
                name=""
                checked={searchCriteria.studentID}
                onChange={e =>
                  checkSearchCriteria("studentID", e.target.checked)
                }
              />
            </div>
            <div>
              <label htmlFor="">Status</label>
              <Checkbox
                name=""
                checked={searchCriteria.status}
                onChange={e => checkSearchCriteria("status", e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="">Email</label>
              <Checkbox
                name=""
                checked={searchCriteria.email}
                onChange={e => checkSearchCriteria("email", e.target.checked)}
              />
            </div>
          </div>
          <div>
            <h3>Orders Panel</h3>
            <div>
              <label>Sort By</label>
              <Selector
                options={[
                  "No. Ascending",
                  "No. Descending",
                  "Name Ascending",
                  "Name Descending",
                  "ID Ascending",
                  "ID Descending",
                  "Status"
                ]}
                name=""
                value={sortCriteria}
                onChange={e => selectSortCriteria(e.target.value)}
              />
            </div>
          </div>
          <div>
            <h3>Overview Displayed Metrics</h3>
            <div>
              <label htmlFor="">Pending</label>
              <Checkbox name="" />
            </div>
            <div>
              <label htmlFor="">Processed</label>
              <Checkbox name="" />
            </div>
            <div>
              <label htmlFor="">Collected</label>
              <Checkbox name="" />
            </div>
            <div>
              <label htmlFor="">Stock</label>
              <Checkbox name="" />
            </div>
          </div>
        </SettingsMenu>
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
