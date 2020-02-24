import React from "react";
import styled, { keyframes } from "styled-components";

const SpinOne = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

const SpinTwo = keyframes`
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
`;

const SpinThree = keyframes`
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
`;

const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;

  & > div:nth-child(1) {
    left: 15px;
    animation: ${SpinOne} 0.6s infinite;
  }

  & > div:nth-child(2) {
    left: 15px;
    animation: ${SpinTwo} 0.6s infinite;
  }

  & > div:nth-child(3) {
    left: 39px;
    animation: ${SpinTwo} 0.6s infinite;
  }

  & > div:nth-child(4) {
    left: 63px;
    animation: ${SpinThree} 0.6s infinite;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-text);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

const SpinnerComp = ({ ...others }) => {
  return (
    <Spinner {...others}>
      <Dots />
      <Dots />
      <Dots />
      <Dots />
    </Spinner>
  );
};

export default SpinnerComp;
