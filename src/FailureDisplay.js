import React from "react";
import styled from "styled-components";

import { ReactComponent as ExclamationIcon } from "./icons/exclamation.svg";

const FailureDisplay = styled.div`
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
    font-size: 18px;
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
`;

const StyledExclamationIcon = styled(ExclamationIcon)`
  fill: var(--color-text);
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
`;

const ReloadButton = styled.button`
  font-family: var(--font-primary);
  font-size: 18px;
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
`;

const FailureDisplayComp = () => {
  return (
    <FailureDisplay>
      <StyledExclamationIcon />
      <p>Oops, something went wrong. Maybe try reloading?</p>
      <ReloadButton onClick={() => window.location.reload()}>
        Reload
      </ReloadButton>
    </FailureDisplay>
  );
};

export default FailureDisplayComp;
