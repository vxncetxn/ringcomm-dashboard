import React from "react";
import styled from "styled-components";

import Checkbox from "./Checkbox";

const TableHead = styled.div`
  display: grid;
  grid-template-columns: ${props => props.cols};
  font-family: var(--font-primary);
  font-size: 18px;
  color: var(--color-accent-main);
  border-radius: 10px 10px 0 0;
  background-color: var(--color-element-light);
  transition: background-color 0.5s ease-out;
  min-width: 370px;

  & > div,
  & > button {
    padding: 15px;
    text-align: left;
  }

  & > button:hover {
    color: var(--color-text);
  }

  & > div > p {
    display: inline-block;
  }

  @media (max-width: 1440px) {
    font-size: 16px;
  }

  @media (max-width: 630px) {
    font-size: 14px;

    & > div,
    & > button {
      padding: 7px;
    }
  }
`;

const TableHeadComp = ({ cols, setChecked, children, ...others }) => {
  //   const checkAllOrders = checkedVal => {
  //     if (checkedVal) {
  //       document
  //         .querySelectorAll(".order-item-checkbox")
  //         .forEach(checkbox => (checkbox.checked = true));
  //       setChecked(processedOrders);
  //     } else {
  //       document
  //         .querySelectorAll(".order-item-checkbox")
  //         .forEach(checkbox => (checkbox.checked = false));
  //       setChecked([]);
  //     }
  //   };

  return (
    <TableHead cols={cols} {...others}>
      <div>
        <Checkbox />
      </div>
      {children}
    </TableHead>
  );
};

export default TableHeadComp;
