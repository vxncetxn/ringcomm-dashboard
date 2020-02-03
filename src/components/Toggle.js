import React from "react";
import styled from "styled-components";

const ToggleWrapper = styled.div`
  position: relative;
  width: 42px;
  height: 20px;
`;

const ToggleInput = styled.input`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 3;

  &:checked + div {
    left: 24px;
    background-color: #40b11b;
  }
`;

const ToggleKnob = styled.div`
  position: absolute;
  left: 4px;
  background-color: grey;
  z-index: 2;
  top: 4px;
  padding: 6px 4px;
  transition: 0.3s ease all;
  width: 14px;
`;

const ToggleBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  border: 1px solid var(--color-accent-main);
  transition: 0.3s ease all;
  z-index: 1;
`;

const ToggleComp = ({ name, checked, onChange, ...others }) => {
  return (
    <ToggleWrapper {...others}>
      <ToggleInput
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <ToggleKnob></ToggleKnob>
      <ToggleBackground></ToggleBackground>
    </ToggleWrapper>
  );
};

export default ToggleComp;
