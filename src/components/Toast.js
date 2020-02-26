import React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import DecisionButton from "./DecisionButton";

const Toast = styled.div`
  position: fixed;
  left: 0;
  bottom: -50px;
  display: flex;
  justify-content: space-between;
  transform: translate(calc(50vw - 50%), -130px);
  font-family: var(--font-primary);
  font-size: 18px;
  color: var(--color-accent-main);
  border-radius: 20px;
  border: 1px solid var(--color-accent-main);
  background-color: var(--color-element-dark);
  padding: 10px 15px;
  margin-right: 40px;

  & > span + button {
    margin-left: 50px;
  }

  & > button + button {
    margin-left: 10px;
  }

  @media (max-width: 1440px) {
    font-size: 16px;
  }

  @media (max-width: 630px) {
    font-size: 14px;
    padding: 5px 10px;

    & > span + button {
      margin-left: 20px;
    }
  }
`;

const ToastComp = ({
  toastDisplayed,
  message,
  undoFunc,
  dismissFunc,
  ...others
}) => {
  return (
    <CSSTransition
      in={toastDisplayed}
      timeout={200}
      classNames="toast-animation"
      unmountOnExit
    >
      <Toast {...others} id="toast">
        <span>{message}</span>
        {undoFunc ? (
          <DecisionButton
            onClick={() => {
              undoFunc();
            }}
          >
            Undo
          </DecisionButton>
        ) : null}
        <DecisionButton
          onClick={() => {
            dismissFunc();
          }}
        >
          Dismiss
        </DecisionButton>
      </Toast>
    </CSSTransition>
  );
};

export default ToastComp;
