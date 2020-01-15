import React from "react";
import styled from "styled-components";

const Orders = styled.ul`
  background-color: var(--color-element);
  border-radius: 10px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  width: 70%;
  height: calc(100vh - 100px - 60px);
  overflow-y: scroll;

  & > li:last-child {
    border-bottom: 1px solid #152351;
  }
`;

const OrdersHead = styled.li`
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

const OrdersItem = styled.div``;

const OrdersItemTrigger = styled.button`
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

  & span {
    color: #5d79d5;
  }

  & p {
    display: inline;
  }
`;

const toggleAccordion = e => {
  const trigger = e.target;
  const panel = document.getElementById(e.target.getAttribute("aria-controls"));

  if (trigger.getAttribute("aria-expanded") === "false") {
    trigger.setAttribute("aria-expanded", "true");
    panel.style.display = "flex";
    setTimeout(() => {
      panel.style.maxHeight = "300px";
    }, 100);
  } else {
    trigger.setAttribute("aria-expanded", "false");
    panel.style.maxHeight = "0px";
    setTimeout(() => {
      panel.style.display = "none";
    }, 500);
  }
};

const OrdersComp = () => {
  return (
    <Orders>
      <OrdersHead>
        <p></p>
        <p>Name</p>
        <p>Student ID</p>
        <p>Size</p>
        <p>Status</p>
      </OrdersHead>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
        return (
          <OrdersItem>
            <OrdersItemTrigger
              aria-expanded="false"
              aria-controls={`panel-${idx}`}
              id={`trigger-${idx}`}
              onClick={e => toggleAccordion(e)}
            >
              <p style={{ textAlign: "center" }}>▾</p>
              <p>Jonathan Kin Fong</p>
              <p>1003147</p>
              <p>8</p>
              <p>*</p>
            </OrdersItemTrigger>
            <OrdersItemPanel
              id={`panel-${idx}`}
              role="region"
              aria-labelledby={`trigger-${idx}`}
            >
              <div>
                <span>Name: </span>
                <p>Jonathan Kin Fong</p>
              </div>
              <div>
                <span>Student ID: </span>
                <p>1003147</p>
              </div>
              <div>
                <span>Email: </span>
                <p>jonathan_kin@mymail.sutd.edu.sg</p>
              </div>
              <div>
                <span>Order Submission Date: </span>
                <p>23rd January 2020</p>
              </div>
              <div>
                <span>Size: </span>
                <p>8</p>
              </div>
              <div>
                <span>Status: </span>
                <p>Star</p>
              </div>
            </OrdersItemPanel>
          </OrdersItem>
        );
      })}
    </Orders>
  );
};

export default OrdersComp;
