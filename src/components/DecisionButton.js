import React from "react";
import styled from "styled-components";

const DecisionButton = styled.button`
  font-family: var(--font-primary);
  font-size: 18px;
  color: var(--color-text);
  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid var(--color-text);
  }

  &:disabled {
    color: #40478c;
    cursor: not-allowed;

    &:hover {
      border-bottom: 1px solid transparent;
    }
  }

  @media (max-width: 1440px) {
    font-size: 16px;
  }

  @media (max-width: 630px) {
    font-size: 14px;
  }
`;

const DecisionButtonComp = ({ children, ...others }) => {
  return <DecisionButton {...others}>{children}</DecisionButton>;
};

export default DecisionButtonComp;
