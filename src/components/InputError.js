import React from "react";
import styled from "styled-components";

const InputError = styled.p`
  font-family: inherit;
  font-size: inherit;
  color: var(--color-warning);
  height: 10px;
`;

const InputErrorComp = ({ children, ...others }) => {
  return <InputError {...others}>{children}</InputError>;
};

export default InputErrorComp;
