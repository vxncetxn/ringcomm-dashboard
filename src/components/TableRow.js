import React from "react";
import styled from "styled-components";

import Checkbox from "./Checkbox";

const TableRow = styled.div`
  overflow-x: hidden;
  font-family: var(--font-primary);
  font-size: 22px;

  @media (max-width: 1440px) {
    font-size: 16px;
  }

  @media (max-width: 630px) {
    font-size: 14px;
  }

  @media (max-width: 520px) {
    font-size: 12px;
  }
`;

const TableRowTrigger = styled.div`
  display: grid;
  grid-template-columns: ${props => props.cols};
  color: var(--color-text);

  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: var(--color-element-light);
  }

  & input[type="checkbox"]:checked {
    background-color: var(--color-element-light);
  }

  & > p {
    padding: 18px;
    pointer-events: none;
  }

  @media (max-width: 1440px) {
    & > p {
      padding: 15px;
    }
  }

  @media (max-width: 630px) {
    & > p {
      padding: 12px;
    }
  }

  @media (max-width: 520px) {
    & > p {
      padding: 7px;
    }
  }
`;

const TableRowPanel = styled.div`
  position: relative;
  max-height: 0;
  overflow: hidden;
  display: none;
  flex-direction: column;
  color: var(--color-text);
  padding: 0 calc(5% + 15px);
  transition: max-height 0.5s ease-out;

  & > div + div {
    margin-top: 20px;
  }

  & > div:first-of-type {
    margin-top: 20px;
  }

  & > div:last-of-type {
    margin-bottom: 20px;
  }

  & > div > span {
    color: var(--color-accent-main);
  }

  & > div > p {
    display: inline;
  }

  & > div > button > svg {
    margin-right: 10px;
  }

  & > div > button + button {
    margin-left: 20px;
  }
`;

const toggleAccordion = e => {
  const trigger = e.target;
  const panel = document.getElementById(e.target.getAttribute("aria-controls"));
  const arrow = trigger.lastChild;

  if (trigger.getAttribute("aria-expanded") === "false") {
    trigger.setAttribute("aria-expanded", "true");
    trigger.style.backgroundColor = "var(--color-element-light)";
    panel.style.display = "flex";
    setTimeout(() => {
      panel.style.maxHeight = "60vh";
      arrow.style.transform = "rotate(180deg)";
    }, 100);
  } else {
    trigger.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = "0px";
    arrow.style.transform = "rotate(0deg)";
    setTimeout(() => {
      trigger.style.backgroundColor = "";
      panel.style.display = "none";
    }, 500);
  }
};

const TableRowComp = ({
  id,
  cols,
  checkFunc,
  triggerChildren,
  panelChildren
}) => {
  return (
    <TableRow>
      <TableRowTrigger
        aria-expanded="false"
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        onClick={e => toggleAccordion(e)}
        cols={cols}
      >
        <p>
          <Checkbox
            className="order-item-checkbox"
            style={{
              pointerEvents: "auto"
            }}
            onChange={e => checkFunc(e)}
          />
        </p>
        {triggerChildren}
        <p
          style={{
            textAlign: "center",
            transition: "transform 0.5s ease-out"
          }}
        >
          ▾
        </p>
      </TableRowTrigger>
      <TableRowPanel
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
      >
        {panelChildren}
      </TableRowPanel>
    </TableRow>
  );
};

export default TableRowComp;
