import React, { useState } from "react";
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

const NavbarComp = () => {
  const [searchVal, setSearchVal] = useState("");

  const updateSearchVal = query => {
    setSearchVal(query);
  };

  return (
    <Navbar>
      <NavItem style={{ marginRight: "auto" }}>LogoPlaceholder</NavItem>
      <NavItem className="non-mobile">
        <svg
          id="search-icon"
          fill="var(--color-text)"
          enable-background="new 0 0 512 512"
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m310 190c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10z" />
          <path d="m500.281 443.719-133.48-133.48c21.745-32.754 33.199-70.684 33.199-110.239 0-110.28-89.72-200-200-200s-200 89.72-200 200 89.72 200 200 200c39.556 0 77.486-11.455 110.239-33.198l36.895 36.895.016.016 96.568 96.568c7.558 7.557 17.601 11.719 28.282 11.719s20.724-4.162 28.278-11.716c7.559-7.553 11.722-17.597 11.722-28.284s-4.163-20.731-11.719-28.281zm-194.745-97.992c0 .001-.001.001-.002.002-30.867 22.42-67.359 34.271-105.534 34.271-99.252 0-180-80.748-180-180s80.748-180 180-180 180 80.748 180 180c0 38.175-11.851 74.667-34.272 105.535-11.217 15.453-24.739 28.976-40.192 40.192zm20.98 9.066c10.35-8.467 19.811-17.928 28.277-28.277l28.371 28.371c-8.628 10.183-18.094 19.65-28.277 28.277zm159.623 131.346c-3.78 3.78-8.801 5.861-14.139 5.861s-10.359-2.081-14.139-5.861l-88.795-88.795c10.127-8.691 19.587-18.15 28.277-28.277l88.798 88.798c3.778 3.774 5.859 8.793 5.859 14.135s-2.081 10.361-5.861 14.139z" />
          <path d="m200 40c-88.225 0-160 71.775-160 160s71.775 160 160 160 160-71.775 160-160-71.775-160-160-160zm0 300c-77.196 0-140-62.804-140-140s62.804-140 140-140 140 62.804 140 140-62.804 140-140 140z" />
          <path d="m312.065 157.073c-8.611-22.412-23.604-41.574-43.36-55.413-20.226-14.17-43.984-21.66-68.705-21.66-5.522 0-10 4.478-10 10s4.478 10 10 10c41.099 0 78.631 25.818 93.396 64.247 1.528 3.976 5.317 6.416 9.337 6.416 1.192 0 2.405-.215 3.584-.668 5.155-1.981 7.729-7.766 5.748-12.922z" />
        </svg>
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
        <svg
          id="hamburger-icon"
          fill="var(--color-text)"
          viewBox="0 0 30 25.7"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path d="m15 4.28h-12.78a2.12 2.12 0 0 1 -2.09-2.93 2 2 0 0 1 2.02-1.35h25.62a2.11 2.11 0 0 1 2.11 2.87 2 2 0 0 1 -2 1.41z"></path>
          <path d="m15 15h-12.78a2.13 2.13 0 0 1 -2.08-3 2 2 0 0 1 2-1.32h25.54a3.33 3.33 0 0 1 .89.1 2.05 2.05 0 0 1 1.43 2.41 2 2 0 0 1 -2.09 1.81z"></path>
          <path d="m15 25.7h-12.81a2.13 2.13 0 0 1 -2-3.05 2 2 0 0 1 2-1.23h25.57a2 2 0 0 1 2.14 1.47 2.11 2.11 0 0 1 -2.15 2.81z"></path>
        </svg>
      </NavItem>
    </Navbar>
  );
};

export default NavbarComp;
