import React from "react";
import styled from "styled-components";

import Floater from "./Floater";

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

const ModalComp = ({ children, ...others }) => {
  return (
    <Overlay>
      <Floater {...others}>{children}</Floater>
    </Overlay>
  );
};

export default ModalComp;
