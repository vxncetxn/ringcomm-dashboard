import React from "react";
import styled from "styled-components";

const SelectorWrapper = styled.span`
  position: relative;
`;

const Selector = styled.select`
  appearance: none;
  background-color: transparent;
  border: none;
  border-bottom: 1px dashed var(--color-accent-main);
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  cursor: pointer;

  & > option {
    padding-right: 30px;
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 400;
    color: black;
  }
`;

const SelectorArrow = styled.span`
  position: absolute;
  right: 0;
  top: 0;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  pointer-events: none;
`;

const SelectorComp = ({ options, name, value, onChange, ...others }) => {
  return (
    <SelectorWrapper {...others}>
      <Selector id={name} name={name} value={value} onChange={onChange}>
        {options.map(o => {
          return (
            <option key={o} value={o}>
              {o}
            </option>
          );
        })}
      </Selector>
      <SelectorArrow>▾</SelectorArrow>
    </SelectorWrapper>
  );
};

export default SelectorComp;
