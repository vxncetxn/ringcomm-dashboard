import React from "react";
import styled from "styled-components";

import Overview from "./Overview";
import Orders from "./Orders";

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;
`;

const MainComp = () => {
  return (
    <Main>
      <Orders />
      <Overview />
    </Main>
  );
};

export default MainComp;
