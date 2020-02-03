import React from "react";
import styled from "styled-components";

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

const QuantityComp = ({ field, setField, onChange, ...others }) => {
  return (
    <QuantityWrapper {...others}>
      <button
        onClick={() => {
          setField({ value: field.value - 1, changes: true });
          onChange();
        }}
      >
        -
      </button>
      <QuantityInput
        value={field.value}
        onChange={e => {
          setField({ value: e.target.value, changes: true });
          onChange();
        }}
      />
      <button
        onClick={() => {
          setField({ value: field.value + 1, changes: true });
          onChange();
        }}
      >
        +
      </button>
    </QuantityWrapper>
  );
};

export default QuantityComp;
