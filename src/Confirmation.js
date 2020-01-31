import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Confirmation = styled.div`
  width: 300px;
  height: 150px;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  border-radius: 10px;
  border: 1px solid var(--color-accent-main);
  background-color: var(--color-background);
  padding: 30px;
  text-align: center;

  & > p {
    margin-bottom: 20px;
  }

  & > button + button {
    margin-left: 30px;
  }

  & > button:hover {
    border-bottom: 1px solid var(--color-text);
  }
`;

const ConfirmationComp = ({ message, positiveFunc, negativeFunc }) => {
  return (
    <Overlay>
      <Confirmation>
        <p>{message}</p>
        <button onClick={positiveFunc}>Yes</button>
        <button onClick={negativeFunc}>No</button>
      </Confirmation>
    </Overlay>
  );
};

export default ConfirmationComp;
