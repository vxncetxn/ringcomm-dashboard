import React from "react";
import styled from "styled-components";

import Modal from "./components/Modal";
import DecisionButton from "./components/DecisionButton";
import Toggle from "./components/Toggle";
import Checkbox from "./components/Checkbox";
import Selector from "./components/Selector";

const SettingsModal = styled(Modal)`
  width: 600px;
  overflow-y: scroll;
  transition: background-color 0.5s ease-out;

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

const SettingsModalComp = ({
  dismissFunc,
  theme,
  setTheme,
  searchCriteria,
  setSearchCriteria,
  sortCriteria,
  setSortCriteria
}) => {
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
    <SettingsModal dismissFunc={dismissFunc}>
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
            onChange={e => checkSearchCriteria("studentID", e.target.checked)}
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
          <label>Default Sort</label>
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
      {/* <div>
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
      </div> */}
      <div>
        <DecisionButton onClick={() => dismissFunc()}>Close</DecisionButton>
      </div>
    </SettingsModal>
  );
};

export default SettingsModalComp;
