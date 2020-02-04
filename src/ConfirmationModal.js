import React from "react";
import styled from "styled-components";

import Modal from "./components/Modal";
import DecisionButton from "./components/DecisionButton";

const ConfirmationModal = styled(Modal)`
  width: 300px;
  height: 150px;
  padding: 30px;
  text-align: center;

  & > p {
    margin-bottom: 20px;
  }

  & > button + button {
    margin-left: 30px;
  }
`;

const ConfirmationModalComp = ({ message, positiveFunc, negativeFunc }) => {
  return (
    <ConfirmationModal dismissFunc={negativeFunc}>
      <p>{message}</p>
      <DecisionButton onClick={positiveFunc}>Yes</DecisionButton>
      <DecisionButton onClick={negativeFunc}>No</DecisionButton>
    </ConfirmationModal>
  );
};

export default ConfirmationModalComp;
