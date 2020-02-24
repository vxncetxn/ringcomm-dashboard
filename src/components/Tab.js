import React from "react";
import styled from "styled-components";

const Tab = styled.div`
  font-family: var(--font-primary);
  font-size: 22px;
  //   border-radius: 10px;
  border: 1px solid var(--color-accent-main);

  & > button + button {
    border-left: 1px solid var(--color-accent-main);
  }

  @media (max-width: 1440px) {
    font-size: 16px;
  }

  @media (max-width: 630px) {
    font-size: 14px;
  }
`;

const TabButton = styled.button`
  padding: 5px 10px;
  background-color: ${props =>
    props.tabbed ? "var(--color-accent-main)" : "var(--color-element-dark)"};
  color: ${props =>
    props.tabbed ? "var(--color-element-dark)" : "var(--color-accent-main)"};
`;

const TabComp = ({ options, tabState, setTabState, ...others }) => {
  return (
    <Tab {...others}>
      {options.map(option => (
        <TabButton
          key={option}
          onClick={e => setTabState(e.target.innerText)}
          tabbed={option === tabState ? true : false}
        >
          {option}
        </TabButton>
      ))}
    </Tab>
  );
};

export default TabComp;
