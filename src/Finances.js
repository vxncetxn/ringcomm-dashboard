import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useQuery } from "react-query";

import fetchFinance from "./fetch/fetchFinance";

import { SettingsContext } from "./Context";

import TableHead from "./components/TableHead";
import FinancesItem from "./FinancesItem";
import OrdersItemShimmer from "./OrdersItemShimmer";
import ZeroDisplay from "./ZeroDisplay";
import FailureDisplay from "./FailureDisplay";

import { ReactComponent as SortIcon } from "./icons/sort.svg";

const Finances = styled.div`
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

  @media (max-width: 630px) {
    overflow-x: scroll;
    max-width: calc(100vw - 40px);
  }
`;

const OrdersFoot = styled.div`
  font-family: var(--font-primary);
  font-size: 18px;
  color: var(--color-accent-main);
  border-radius: 0 0 10px 10px;
  background-color: var(--color-element-light);
  padding: 15px 15px 15px calc(5% + 15px);
  margin-top: auto;
  transition: background-color 0.5s ease-out;
  min-width: 370px;

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
`;

const OrdersList = styled.ul`
  overflow-x: hidden;
  height: 100%;
  overflow-y: scroll;
  min-width: 370px;

  @media (max-width: 960px) {
    min-height: calc(100vh - 100px - 100px);
  }
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
`;

const FinancesComp = () => {
  const { status: fetchFinanceStatus, data: fetchFinanceData } = useQuery(
    "Finance",
    fetchFinance
  );

  const { financesSortCriteria, setFinancesSortCriteria } = useContext(
    SettingsContext
  );

  const [numEntries, setNumEntries] = useState(10);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState([]);

  const processFinance = raw => {
    const processed = raw.slice();

    switch (financesSortCriteria) {
      case "Date Recent First":
        processed.sort((a, b) => a.submitDate - b.submitDate);
        break;
      case "Date Recent Last":
        processed.sort((a, b) => b.submitDate - a.submitDate);
        break;
      case "Title Ascending":
        processed.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Title Descending":
        processed.sort((a, b) => -a.title.localeCompare(b.title));
        break;
      case "POC Ascending":
        processed.sort((a, b) => a.submitter.localeCompare(b.submitter));
        break;
      case "POC Descending":
        processed.sort((a, b) => -a.submitter.localeCompare(b.submitter));
        break;
      case "Amount Ascending":
        processed.sort((a, b) => a.amount - b.amount);
        break;
      default:
        processed.sort((a, b) => b.amount - a.amount);
    }

    return processed;
  };

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

  // const checkAllOrders = checkedVal => {
  //   if (checkedVal) {
  //     document
  //       .querySelectorAll(".order-item-checkbox")
  //       .forEach(checkbox => (checkbox.checked = true));
  //     setChecked(processedOrders);
  //   } else {
  //     document
  //       .querySelectorAll(".order-item-checkbox")
  //       .forEach(checkbox => (checkbox.checked = false));
  //     setChecked([]);
  //   }
  // };

  // useEffect(() => {
  //   processedOrders
  //     ? setNumPages(Math.ceil(processedOrders.length / numEntries))
  //     : setNumPages(1);
  // }, [processedOrders, numEntries]);

  return (
    <Finances>
      <TableHead cols="5% 25% 20% 20% 20% 10%" setChecked={setChecked}>
        <button
          onClick={() =>
            financesSortCriteria === "Title Ascending"
              ? setFinancesSortCriteria("Title Descending")
              : setFinancesSortCriteria("Title Ascending")
          }
        >
          <span>Title</span>
          <StyledSortIcon />
        </button>
        <button
          onClick={() =>
            financesSortCriteria === "Submitter Ascending"
              ? setFinancesSortCriteria("Submitter Descending")
              : setFinancesSortCriteria("Submitter Ascending")
          }
        >
          <span>POC</span>
          <StyledSortIcon />
        </button>
        <button
          onClick={() =>
            financesSortCriteria === "Date Most Recent First"
              ? setFinancesSortCriteria("Date Most Recent Last")
              : setFinancesSortCriteria("Date Most Recent First")
          }
        >
          <span>Date</span>
          <StyledSortIcon />
        </button>
        <button
          onClick={() =>
            financesSortCriteria === "Amount Ascending"
              ? setFinancesSortCriteria("Amount Descending")
              : setFinancesSortCriteria("Amount Ascending")
          }
        >
          <span>Amt.</span>
          <StyledSortIcon />
        </button>
        <div></div>
      </TableHead>
      <OrdersList>
        {fetchFinanceStatus === "success" ? (
          fetchFinanceData.length ? (
            processFinance(fetchFinanceData)
              // .slice(
              //   0 + (currentPage - 1) * numEntries,
              //   numEntries + (currentPage - 1) * numEntries
              // )
              .map((transaction, idx) => {
                return (
                  <FinancesItem
                    key={idx}
                    transaction={transaction}
                    id={`finances-item-${idx}`}
                    checked={checked}
                    setChecked={setChecked}
                  />
                );
              })
          ) : (
            <ZeroDisplay />
          )
        ) : fetchFinanceStatus === "error" ? (
          <FailureDisplay />
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
            // max={Math.min(processedOrders?.length, 50)}
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
    </Finances>
  );
};

export default FinancesComp;
