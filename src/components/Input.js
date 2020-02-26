import React from "react";
import styled from "styled-components";

const Input = styled.input`
  background-color: transparent;
  border: 1px solid var(--color-accent-main);
  padding: 5px;

  font-family: inherit;
  font-size: inherit;
  color: inherit;
`;

const InputComp = ({ name, value, onChange, ...others }) => {
  return (
    <Input
      {...others}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputComp;
