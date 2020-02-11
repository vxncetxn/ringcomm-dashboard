import React, { useState, useContext } from "react";
import styled from "styled-components";

import { DataContext, SortCriteriaContext } from "./Context";

import TableHead from "./components/TableHead";
import FinancesItem from "./FinancesItem";
import OrdersItemShimmer from "./OrdersItemShimmer";

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
`;

// const OrdersHead = styled.div`
//   display: grid;
//   grid-template-columns: 5% 15% 30% 20% 20% 10%;
//   font-family: var(--font-primary);
//   font-size: 22px;
//   color: var(--color-accent-main);
//   border-radius: 10px 10px 0 0;
//   background-color: var(--color-element-light);
//   transition: background-color 0.5s ease-out;

//   // border-bottom: 1px solid var(--color-accent-main);

//   & > div,
//   & > button {
//     padding: 15px;
//     text-align: left;
//   }

//   & > button:hover {
//     color: var(--color-text);
//   }

//   & > div > p {
//     display: inline-block;
//   }

//   @media (max-width: 1440px) {
//     font-size: 16px;
//   }

//   @media (max-width: 630px) {
//     font-size: 14px;

//     & > div,
//     & > button {
//       padding: 12px;
//     }
//   }

//   @media (max-width: 520px) {
//     font-size: 12px;

//     & > div,
//     & > button {
//       padding: 7px;
//     }
//   }
// `;

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

const FinancesComp = () => {
  const { processedTransactions } = useContext(DataContext);
  const { financesSortCriteria, setFinancesSortCriteria } = useContext(
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
      <TableHead cols="5% 30% 20% 20% 15% 10%" setChecked={setChecked}>
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
          <span>Submitter</span>
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
          <span>Amount</span>
          <StyledSortIcon />
        </button>
        <div></div>
      </TableHead>
      <OrdersList>
        {processedTransactions ? (
          processedTransactions
            .slice(
              0 + (currentPage - 1) * numEntries,
              numEntries + (currentPage - 1) * numEntries
            )
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
