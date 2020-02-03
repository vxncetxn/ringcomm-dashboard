import React from "react";
import styled from "styled-components";

const DecisionButton = styled.button`
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid var(--color-text);
  }

  &:disabled {
    color: #40478c;
    cursor: not-allowed;

    &:hover {
      border-bottom: none;
    }
  }
`;

const DecisionButtonComp = ({ children, ...others }) => {
  return <DecisionButton {...others}>{children}</DecisionButton>;
};

export default DecisionButtonComp;
