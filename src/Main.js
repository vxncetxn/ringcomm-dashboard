import React from "react";
import styled from "styled-components";

import Overview from "./Overview";
import Orders from "./Orders";

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;

  @media (max-width: 960px) {
    flex-direction: column-reverse;
  }

  @media (max-width: 480px) {
    padding: 50px 20px;
  }
`;

const MainComp = ({
  orders,
  setOrders,
  processedOrders,
  processedInventory,
  sortCriteria,
  setSortCriteria
}) => {
  return (
    <Main>
      <Orders
        orders={orders}
        setOrders={setOrders}
        processedOrders={processedOrders}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
      />
      <Overview processedInventory={processedInventory} />
    </Main>
  );
};

export default MainComp;
