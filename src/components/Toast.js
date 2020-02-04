import React from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

import DecisionButton from "./DecisionButton";

const Toast = styled.div`
  position: fixed;
  left: calc(50% - 150px);
  bottom: -50px;
  display: flex;
  justify-content: space-between;
  width: 350px;
  transform: translateY(-130px);
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-accent-main);
  border-radius: 20px;
  border: 1px solid var(--color-accent-main);
  background-color: var(--color-element-dark);
  padding: 10px 15px;

  & > * + * {
    margin-left: 10px;
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
        <span style={{ marginRight: "auto" }}>{message}</span>
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
