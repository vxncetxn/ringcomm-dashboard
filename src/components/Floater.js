import React from "react";
import styled from "styled-components";

const Floater = styled.div`
  font-family: var(--font-primary);
  font-size: 18px;
  color: var(--color-accent-main);
  border-radius: 10px;
  border: 1px solid var(--color-accent-main);
  background-color: var(--color-element-dark);
  padding: 25px;

  @media (max-width: 1440px) {
    font-size: 16px;
  }

  @media (max-width: 630px) {
    font-size: 14px;
  }
`;

const FloaterComp = ({ children, ...others }) => {
  return <Floater {...others}>{children}</Floater>;
};

export default FloaterComp;
