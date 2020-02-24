import React from "react";
import styled, { keyframes } from "styled-components";

const Spin = keyframes`
  100% {
    transform: rotate(360deg)
  }
`;

const Spinner = styled.div`
  pointer-events: none;
  width: 50px;
  height: 50px;
  border: 0.4em solid transparent;
  border-color: #eee;
  border-top-color: #3e67ec;
  border-radius: 50%;
  animation: ${Spin} 1s linear infinite;
`;

const SpinnerComp = ({ ...others }) => {
  return <Spinner {...others} />;
};

export default SpinnerComp;
