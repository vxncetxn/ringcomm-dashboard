import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Tab from "./components/Tab";

import Orders from "./Orders";
import Finances from "./Finances";
import AddOrderModal from "./AddOrderModal";
import AddFinanceModal from "./AddFinanceModal";

const AccountsHead = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  top: 0;
  transform: translateY(calc(-100% - 10px));

  & > * + * {
    margin-left: 20px;
  }
`;

const Accounts = styled.div`
  position: relative;
  width: 70%;
  height: 100%;
`;

const AddRecordButton = styled.button`
  font-family: var(--font-primary);
  font-size: 22px;
  color: var(--color-accent-main);
  border: 1px solid var(--color-accent-main);
  background-color: var(--color-element-dark);
  padding: 5px 10px;

  &:hover {
    color: var(--color-element-dark);
    background-color: var(--color-accent-main);
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

const AccountsComp = () => {
  const [tabState, setTabState] = useState("Orders");
  const [addRecordOpen, setAddRecordOpen] = useState(false);

  return (
    <Accounts>
      <AccountsHead>
        <Tab
          options={["Orders", "Finances"]}
          tabState={tabState}
          setTabState={setTabState}
        />
        <AddRecordButton onClick={() => setAddRecordOpen(true)}>
          Add Record
        </AddRecordButton>
        {addRecordOpen &&
          ReactDOM.createPortal(
            tabState === "Orders" ? (
              <AddOrderModal dismissFunc={() => setAddRecordOpen(false)} />
            ) : (
              <AddFinanceModal dismissFunc={() => setAddRecordOpen(false)} />
            ),
            document.querySelector("#modal")
          )}
      </AccountsHead>
      {tabState === "Orders" ? (
        <Orders setAddRecordOpen={setAddRecordOpen} />
      ) : (
        <Finances />
      )}
    </Accounts>
  );
};

export default AccountsComp;
