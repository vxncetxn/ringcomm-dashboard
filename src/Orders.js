import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { DataContext, SortCriteriaContext } from "./Context";

import TableHead from "./components/TableHead";
import OrdersItem from "./OrdersItem";
// import Checkbox from "./components/Checkbox";
import OrdersItemShimmer from "./OrdersItemShimmer";

import { ReactComponent as SortIcon } from "./icons/sort.svg";

const Orders = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-element-dark);
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: background-color 0.5s ease-out;

  & > li:last-child {
    border-bottom: 1px solid var(--color-element-light);
  }

  @media (max-width: 960px) {
    width: 100%;
    margin-top: 50px;
  }
`;

const OrdersFoot = styled.div`
  font-family: var(--font-primary);
  font-size: 22px;
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

const OrdersList = styled.ul`
  overflow-y: scroll;
`;

const StyledSortIcon = styled(SortIcon)`
  margin-left: 10px;
  display: inline-block;
  fill: var(--color-text);
  width: 0.8vw;
  height: 0.8vw;

  @media (max-width: 1400px) {
    width: 12px;
    height: 12px;
  }

  @media (max-width: 630px) {
    margin-left: 5px;
    width: 10px;
    height: 10px;
  }

  @media (max-width: 520px) {
    width: 8px;
    height: 8px;
  }
`;

const OrdersComp = () => {
  const { ordersFetchStatus, processedOrders } = useContext(DataContext);
  const { ordersSortCriteria, setOrdersSortCriteria } = useContext(
    SortCriteriaContext
  );

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
    processedOrders
      ? setNumPages(Math.ceil(processedOrders.length / numEntries))
      : setNumPages(1);
  }, [processedOrders, numEntries]);

  return (
    <Orders>
      <TableHead cols="5% 15% 30% 20% 20% 10%" setChecked={setChecked}>
        {/* <div>
          <Checkbox onChange={e => checkAllOrders(e.target.checked)} />
        </div> */}
        <button
          onClick={() =>
            ordersSortCriteria === "No. Ascending"
              ? setOrdersSortCriteria("No. Descending")
              : setOrdersSortCriteria("No. Ascending")
          }
        >
          <span>No.</span>
          <StyledSortIcon />
        </button>
        <button
          onClick={() =>
            ordersSortCriteria === "Name Ascending"
              ? setOrdersSortCriteria("Name Descending")
              : setOrdersSortCriteria("Name Ascending")
          }
        >
          <span>Name</span>
          <StyledSortIcon />
        </button>
        <button
          onClick={() =>
            ordersSortCriteria === "ID Ascending"
              ? setOrdersSortCriteria("ID Descending")
              : setOrdersSortCriteria("ID Ascending")
          }
        >
          <span>ID</span>
          <StyledSortIcon />
        </button>
        <button onClick={() => setOrdersSortCriteria("Status")}>
          <span>Status</span>
          <StyledSortIcon />
        </button>
        <div></div>
      </TableHead>
      <OrdersList>
        {ordersFetchStatus !== "fetching" ? (
          processedOrders
            .slice(
              0 + (currentPage - 1) * numEntries,
              numEntries + (currentPage - 1) * numEntries
            )
            .map((order, idx) => {
              return (
                <OrdersItem
                  key={idx}
                  order={order}
                  id={`orders-item-${idx}`}
                  checked={checked}
                  setChecked={setChecked}
                />
              );
            })
        ) : (
          <>
            <OrdersItemShimmer />
            <OrdersItemShimmer />
            <OrdersItemShimmer />
            <OrdersItemShimmer />
            <OrdersItemShimmer />
          </>
        )}
      </OrdersList>
      <OrdersFoot>
        <p>
          Showing{" "}
          <input
            type="number"
            value={numEntries}
            min="1"
            max={Math.min(processedOrders?.length, 50)}
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
