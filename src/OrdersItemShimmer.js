import React from "react";
import styled from "styled-components";

import Shimmer from "./components/Shimmer";
import Checkbox from "./components/Checkbox";

const OrdersItemShimmer = styled.div`
  display: grid;
  grid-template-columns: 5% 15% 30% 20% 20% 10%;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  width: 100%;
  text-align: left;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    pointer-events: none;
  }

  @media (max-width: 630px) {
    font-size: 14px;

    & > div {
      padding: 12px;
    }
  }
`;

const ShimmerStandard = styled(Shimmer)`
  width: 100%;
  height: 60%;
  border-radius: 10px;
`;

const OrdersItemShimmerComp = () => {
  return (
    <OrdersItemShimmer>
      <div>
        <Checkbox disabled />
      </div>
      <div>
        <ShimmerStandard />
      </div>
      <div>
        <ShimmerStandard />
      </div>
      <div>
        <ShimmerStandard />
      </div>
      <div>
        <ShimmerStandard />
      </div>
      <div>▾</div>
    </OrdersItemShimmer>
  );
};

export default OrdersItemShimmerComp;
