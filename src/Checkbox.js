import React from "react";
import styled from "styled-components";

const CheckboxWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
`;

const CheckboxInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;

  &:checked + div::after {
    content: "";
    position: absolute;
    left: 4px;
    top: 8px;
    background: var(--color-text);
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white,
      4px -6px 0 white, 4px -8px 0 white;
    transform: rotate(45deg);
  }
`;

const Checkbox = styled.div`
  position: relative;
  display: inline-block;
  vertical-align: text-top;
  width: 100%;
  height: 100%;
  border: 1px solid var(--color-accent-main);
  pointer-events: none;
`;

const CheckboxComp = ({ className, style, name, checked, onChange }) => {
  return (
    <CheckboxWrapper className={className} style={style}>
      <CheckboxInput
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onClick={e => e.stopPropagation()}
        onChange={onChange}
      />
      <Checkbox />
    </CheckboxWrapper>
  );
};

export default CheckboxComp;
