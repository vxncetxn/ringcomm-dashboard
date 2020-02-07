import React from "react";
import styled from "styled-components";

import Overview from "./Overview";
import Orders from "./Orders";
import Finances from "./Finances";

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
  height: calc(100vh - 60px);
  max-width: 1920px;
  margin: 0 auto;

  @media (max-width: 960px) {
    height: auto;
    flex-direction: column-reverse;
  }

  @media (max-width: 520px) {
    padding: 50px 20px;
  }
`;

const MainComp = ({
  orders,
  setOrders,
  setInventory,
  processedOrders,
  processedInventory,
  sortCriteria,
  setSortCriteria,
  setLastAction,
  transactions
}) => {
  return (
    <Main>
      {/* <Orders
        orders={orders}
        setOrders={setOrders}
        processedOrders={processedOrders}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        setLastAction={setLastAction}
      /> */}
      <Finances
        transactions={transactions}
        setOrders={setOrders}
        processedOrders={processedOrders}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        setLastAction={setLastAction}
      />
      <Overview
        setInventory={setInventory}
        processedInventory={processedInventory}
        setLastAction={setLastAction}
      />
    </Main>
  );
};

export default MainComp;
