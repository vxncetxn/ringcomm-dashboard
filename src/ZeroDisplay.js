import React from "react";
import styled from "styled-components";

import { ReactComponent as EmptyIcon } from "./icons/empty.svg";

const ZeroDisplay = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > * + * {
    margin-top: 20px;
  }

  & > p {
    font-family: var(--font-primary);
    font-size: 22px;
    color: var(--color-accent-main);
  }

  @media (max-width: 1440px) {
    & > p {
      font-size: 16px;
    }
  }

  @media (max-width: 630px) {
    & > p {
      font-size: 14px;
    }
  }

  @media (max-width: 520px) {
    & > p {
      font-size: 12px;
    }
  }
`;

const StyledEmptyIcon = styled(EmptyIcon)`
  fill: var(--color-text);
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
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

const ZeroDisplayComp = ({ status }) => {
  console.log("STATUS IN ZERO DISPLAY: ", status);

  return (
    <ZeroDisplay>
      <StyledEmptyIcon />
      <p>Oops, there is nothing here yet. Maybe add something?</p>
      <AddRecordButton>Add Record</AddRecordButton>
    </ZeroDisplay>
  );
};

export default ZeroDisplayComp;
