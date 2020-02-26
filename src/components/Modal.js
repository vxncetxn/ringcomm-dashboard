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

const StyledFloater = styled(Floater)`
  margin: 0 20px;
  max-height: calc(100vh - 40px);
  overflow-y: scroll;
`;

const ModalComp = ({ dismissFunc, children, ...others }) => {
  return (
    <Overlay
      id="overlay"
      onClick={e => {
        if (e.target === document.getElementById("overlay")) {
          dismissFunc();
        }
      }}
    >
      <StyledFloater {...others}>{children}</StyledFloater>
    </Overlay>
  );
};

export default ModalComp;
