import React from "react";
import styled from "styled-components";

const Floater = styled.div`
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-accent-main);
  border-radius: 10px;
  border: 1px solid var(--color-accent-main);
  background-color: var(--color-element-dark);
  padding: 25px;
`;

const FloaterComp = ({ children, ...others }) => {
  return <Floater {...others}>{children}</Floater>;
};

export default FloaterComp;
