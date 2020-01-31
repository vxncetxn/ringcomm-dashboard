import React, { useState, useEffect } from "react";
import styled from "styled-components";

import OrdersItem from "./OrdersItem";
import Checkbox from "./Checkbox";

import { ReactComponent as SortIcon } from "./icons/sort.svg";

const Orders = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-element-dark);
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 70%;
  height: calc(100vh - 100px - 60px);
  transition: background-color 0.5s ease-out;

  & > li:last-child {
    border-bottom: 1px solid var(--color-element-light);
  }

  @media (max-width: 960px) {
    width: 100%;
    margin-top: 50px;
  }
`;

const OrdersHead = styled.div`
  display: grid;
  grid-template-columns: 5% 10% 40% 20% 15% 10%;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-accent-main);
  border-radius: 10px 10px 0 0;
  background-color: var(--color-element-light);
  transition: background-color 0.5s ease-out;

  // border-bottom: 1px solid var(--color-accent-main);

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
`;

const OrdersFoot = styled.div`
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-accent-main);
  border-radius: 0 0 10px 10px;
  background-color: var(--color-element-light);
  padding: 15px 15px 15px calc(5% + 15px);
  margin-top: auto;
  transition: background-color 0.5s ease-out;

  & > p {
    display: inline;
  }

  & input {
    width: 50px;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: transparent;
    border: none;
    border-bottom: 1px dashed var(--color-accent-main);
  }
`;

const OrdersList = styled.ul`
  overflow-y: scroll;
`;

const StyledSortIcon = styled(SortIcon)`
  margin-left: 10px;
  display: inline-block;
  fill: var(--color-text);
  width: 12px;
  height: 12px;
`;

const OrdersComp = ({
  orders,
  setOrders,
  processedOrders,
  sortCriteria,
  setSortCriteria
}) => {
  const [numEntries, setNumEntries] = useState(10);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState([]);

  const changePage = option => {
    if (option === "next") {
      if (currentPage !== numPages) {
        setCurrentPage(currentPage + 1);
      }
    } else {
      if (currentPage !== 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const checkAllOrders = checkedVal => {
    if (checkedVal) {
      document
        .querySelectorAll(".order-item-checkbox")
        .forEach(checkbox => (checkbox.checked = true));
      setChecked(processedOrders);
    } else {
      document
        .querySelectorAll(".order-item-checkbox")
        .forEach(checkbox => (checkbox.checked = false));
      setChecked([]);
    }
  };

  useEffect(() => {
    setNumPages(Math.ceil(processedOrders.length / numEntries));
  }, [processedOrders, numEntries]);

  return (
    <Orders>
      <OrdersHead>
        <div>
          <Checkbox onChange={e => checkAllOrders(e.target.checked)} />
        </div>
        <button
          onClick={() =>
            sortCriteria === "No. Ascending"
              ? setSortCriteria("No. Descending")
              : setSortCriteria("No. Ascending")
          }
        >
          <span>No.</span>
          <StyledSortIcon />
        </button>
        <button
          onClick={() =>
            sortCriteria === "Name Ascending"
              ? setSortCriteria("Name Descending")
              : setSortCriteria("Name Ascending")
          }
        >
          <span>Name</span>
          <StyledSortIcon />
        </button>
        <button
          onClick={() =>
            sortCriteria === "ID Ascending"
              ? setSortCriteria("ID Descending")
              : setSortCriteria("ID Ascending")
          }
        >
          <span>Student ID</span>
          <StyledSortIcon />
        </button>
        <button onClick={() => setSortCriteria("Status")}>
          <span>Status</span>
          <StyledSortIcon />
        </button>
        <div></div>
      </OrdersHead>
      <OrdersList>
        {processedOrders
          .slice(
            0 + (currentPage - 1) * numEntries,
            numEntries + (currentPage - 1) * numEntries
          )
          .map((order, idx) => {
            return (
              <OrdersItem
                key={idx}
                order={order}
                idx={idx}
                orders={orders}
                setOrders={setOrders}
                checked={checked}
                setChecked={setChecked}
              />
            );
          })}
      </OrdersList>
      <OrdersFoot>
        <p>
          Showing{" "}
          <input
            type="number"
            value={numEntries}
            min="1"
            max={Math.min(processedOrders.length, 50)}
            onChange={e => {
              setNumEntries(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
          ></input>{" "}
          {numEntries > 1 ? "entries" : "entry"}
        </p>
        <p style={{ marginLeft: "20px" }}>
          <button
            onClick={() => {
              changePage("back");
            }}
          >
            {"<"}
          </button>{" "}
          {currentPage} of {numPages}{" "}
          <button
            onClick={() => {
              changePage("next");
            }}
          >
            {">"}
          </button>
        </p>
      </OrdersFoot>
    </Orders>
  );
};

export default OrdersComp;
