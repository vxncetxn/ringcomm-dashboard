import React from "react";
import styled from "styled-components";

import setNativeValue from "../helpers/setNativeValue";

const QuantityWrapper = styled.div`
  & > span {
    font-size: 20px;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
  border: none;
  border-bottom: 1px dashed var(--color-accent-main);
  text-align: center;
  margin: 0 5px;
`;

const QuantityComp = ({ value, onChange, ...others }) => {
  return (
    <QuantityWrapper {...others}>
      <button
        onClick={e => {
          const quantityInput = e.target.nextElementSibling;
          if (parseInt(quantityInput.value, 10) > 0) {
            setNativeValue(
              quantityInput,
              parseInt(quantityInput.value, 10) - 1
            );
          }
        }}
      >
        -
      </button>
      <QuantityInput value={value} onChange={onChange} />
      <button
        onClick={e => {
          const quantityInput = e.target.previousElementSibling;
          setNativeValue(quantityInput, parseInt(quantityInput.value, 10) + 1);
        }}
      >
        +
      </button>
    </QuantityWrapper>
  );
};

export default QuantityComp;
