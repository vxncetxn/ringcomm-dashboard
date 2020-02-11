import React from "react";
import styled from "styled-components";

import Overview from "./Overview";
import Accounts from "./Accounts";

const Main = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 70px 50px 50px 50px;
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

const MainComp = () => {
  return (
    <Main>
      <Accounts />
      <Overview />
    </Main>
  );
};

export default MainComp;
