import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Orders = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-element);
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 70%;
  height: calc(100vh - 100px - 60px);

  & > li:last-child {
    border-bottom: 1px solid #152351;
  }

  @media (max-width: 960px) {
    width: 100%;
    margin-top: 50px;
  }
`;

const OrdersHead = styled.div`
  display: grid;
  grid-template-columns: 5% 40% 20% 15% 15%;
  font-family: var(--font-primary);
  font-size: 16px;
  color: #5d79d5;
  border-radius: 10px 10px 0 0;
  background-color: #152351;
  //   border: 1px solid white;

  & > p {
    padding: 15px;
  }

  & > p + p {
    // border-left: 1px solid #2d3a8c;
  }
`;

const OrdersFoot = styled.div`
  font-family: var(--font-primary);
  font-size: 16px;
  color: #5d79d5;
  border-radius: 0 0 10px 10px;
  background-color: #152351;
  padding: 15px 15px 15px calc(5% + 15px);
  margin-top: auto;

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
    border-bottom: 1px dashed #5d79d5;
  }
`;

const OrdersList = styled.ul`
  overflow-y: scroll;
`;

const OrdersItem = styled.div``;

const OrdersItemTrigger = styled.div`
  display: grid;
  grid-template-columns: 5% 40% 20% 15% 15%;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #152351;
  }

  & > p {
    padding: 15px;
    pointer-events: none;
  }
`;

const OrdersItemPanel = styled.div`
  max-height: 0;
  overflow: hidden;
  display: none;
  flex-direction: column;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  padding: 0 calc(5% + 15px);
  transition: max-height 0.5s ease-out;

  & > div + div {
    margin-top: 20px;
  }

  & > div:first-child {
    margin-top: 20px;
  }

  & > div:last-child {
    margin-bottom: 20px;
  }

  & > div > span {
    color: #5d79d5;
  }

  & > div > p {
    display: inline;
  }
`;

const StatusBadge = styled.span`
  padding: 5px;
  border-radius: 10px;
  font-family: var(--font-primary);
  font-size: 16px;
  color: white;
  background-color: ${props =>
    props.children === "Pending"
      ? "var(--color-accent-pending)"
      : "var(--color-accent-collected)"};
`;

const toggleAccordion = e => {
  const trigger = e.target;
  const panel = document.getElementById(e.target.getAttribute("aria-controls"));
  const arrow = trigger.firstChild;

  if (trigger.getAttribute("aria-expanded") === "false") {
    trigger.setAttribute("aria-expanded", "true");
    trigger.style.backgroundColor = "#152351";
    panel.style.display = "flex";
    setTimeout(() => {
      panel.style.maxHeight = "300px";
      arrow.style.transform = "rotate(-180deg)";
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

const OrdersComp = ({ ordersData }) => {
  const [numEntries, setNumEntries] = useState(10);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setNumPages(Math.ceil(ordersData.length / numEntries));
  }, [numEntries]);

  return (
    <Orders>
      <OrdersHead>
        <p></p>
        <p>Name</p>
        <p>Student ID</p>
        <p>Size</p>
        <p>Status</p>
      </OrdersHead>
      <OrdersList>
        {ordersData
          .slice(
            0 + (currentPage - 1) * numEntries,
            numEntries + (currentPage - 1) * numEntries
          )
          .map((order, idx) => {
            return (
              <OrdersItem key={idx}>
                <OrdersItemTrigger
                  aria-expanded="false"
                  aria-controls={`panel-${idx}`}
                  id={`trigger-${idx}`}
                  onClick={e => toggleAccordion(e)}
                >
                  <p
                    style={{
                      textAlign: "center",
                      transition: "transform 0.5s ease-out"
                    }}
                  >
                    ▾
                  </p>
                  <p>{order.name}</p>
                  <p>{order.id}</p>
                  <p>{order.size}</p>
                  <p>
                    <StatusBadge>{order.status}</StatusBadge>
                  </p>
                </OrdersItemTrigger>
                <OrdersItemPanel
                  id={`panel-${idx}`}
                  role="region"
                  aria-labelledby={`trigger-${idx}`}
                >
                  <div>
                    <span>Name: </span>
                    <p>{order.name}</p>
                  </div>
                  <div>
                    <span>Student ID: </span>
                    <p>{order.id}</p>
                  </div>
                  <div>
                    <span>Email: </span>
                    <p>{order.email}</p>
                  </div>
                  <div>
                    <span>Order Submission Date: </span>
                    <p>{order.submitDate}</p>
                  </div>
                  <div>
                    <span>Size: </span>
                    <p>{order.size}</p>
                  </div>
                  <div>
                    <span>Status: </span>
                    <p>
                      <StatusBadge>{order.status}</StatusBadge>
                    </p>
                  </div>
                </OrdersItemPanel>
              </OrdersItem>
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
            max={Math.min(ordersData.length, 50)}
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
