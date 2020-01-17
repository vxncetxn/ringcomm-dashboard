import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as MenuDotsIcon } from "./icons/menu-dots.svg";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as EmailIcon } from "./icons/email.svg";
import { ReactComponent as ArchiveIcon } from "./icons/archive.svg";
import { ReactComponent as DeleteIcon } from "./icons/delete.svg";

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
  grid-template-columns: 5% 50% 20% 15% 10%;
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
  grid-template-columns: 5% 50% 20% 15% 10%;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  width: 100%;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: #152351;
  }

  & input[type="checkbox"]:checked {
    background-color: #152351;
  }

  & > p {
    padding: 15px;
    pointer-events: none;
  }
`;

const OrdersItemPanel = styled.div`
  position: relative;
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

  & > div:first-of-type {
    margin-top: 20px;
  }

  & > div:last-of-type {
    margin-bottom: 20px;
  }

  & > div > span {
    color: #5d79d5;
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

const ActionsMenu = styled.ul`
  display: none;
  position: absolute;
  top: 35px;
  right: 25px;
  border-radius: 10px;
  border: 1px solid #5d79d5;
  background-color: var(--color-element);

  & > li:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  & > li:last-of-type {
    border-radius: 0 0 10px 10px;
  }

  & > li:hover {
    background-color: #5d79d5;
  }

  & > li + li {
    border-top: 1px solid #5d79d5;
  }

  & > li > button {
    width: 100%;
    text-align: left;
    padding: 5px 10px;
  }

  & svg {
    margin-right: 10px;
  }
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  border-radius: 10px;
  font-family: var(--font-primary);
  font-size: 16px;
  color: var(--color-text);
  border: 1px solid #5d79d5;

  &:hover {
    background-color: #5d79d5;
  }
`;

const DeleteButton = styled(ActionButton)`
  &:hover {
    border: 1px solid var(--color-warning);
    background-color: var(--color-warning);
  }
`;

const StyledMenuDotsIcon = styled(MenuDotsIcon)`
  position: absolute;
  top: 10px;
  right: 30px;
  fill: var(--color-text);
  width: 20px;
  height: 20px;
`;

const StyledEditIcon = styled(EditIcon)`
  fill: var(--color-text);
  width: 13px;
  height: 13px;
`;

const StyledEmailIcon = styled(EmailIcon)`
  fill: var(--color-text);
  width: 13px;
  height: 13px;
`;

const StyledArchiveIcon = styled(ArchiveIcon)`
  fill: var(--color-text);
  width: 13px;
  height: 13px;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  fill: var(--color-text);
  width: 13px;
  height: 13px;
`;

const toggleAccordion = e => {
  const trigger = e.target;
  const panel = document.getElementById(e.target.getAttribute("aria-controls"));
  const arrow = trigger.lastChild;

  if (trigger.getAttribute("aria-expanded") === "false") {
    trigger.setAttribute("aria-expanded", "true");
    trigger.style.backgroundColor = "#152351";
    panel.style.display = "flex";
    setTimeout(() => {
      panel.style.maxHeight = "300px";
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

const toggleActionsMenu = menuID => {
  const menu = document.getElementById(menuID);

  if (menu.style.display === "block") {
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
  }
};

const OrdersComp = ({ ordersData }) => {
  const [numEntries, setNumEntries] = useState(10);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    console.log("checked: ", checked);
  }, [checked]);

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
      setChecked(ordersData);
    } else {
      document
        .querySelectorAll(".order-item-checkbox")
        .forEach(checkbox => (checkbox.checked = false));
      setChecked([]);
    }
  };

  const checkOrder = (e, order) => {
    e.stopPropagation();
    const checkedVal = e.target.checked;
    if (checkedVal) {
      setChecked([...checked, order]);
    } else {
      setChecked(checked.filter(o => o.orderID !== order.orderID));
    }
  };

  useEffect(() => {
    setNumPages(Math.ceil(ordersData.length / numEntries));
  }, [numEntries]);

  return (
    <Orders>
      <OrdersHead>
        <p>
          <input
            type="checkbox"
            onClick={e => checkAllOrders(e.target.checked)}
          ></input>
        </p>
        <p>Name</p>
        <p>Student ID</p>
        <p>Status</p>
        <p></p>
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
                  <p>
                    <input
                      type="checkbox"
                      className="order-item-checkbox"
                      style={{
                        pointerEvents: "auto"
                      }}
                      onClick={e => checkOrder(e, order)}
                    ></input>
                  </p>
                  <p>{order.name}</p>
                  <p>{order.studentID}</p>
                  <p>
                    <StatusBadge>{order.status}</StatusBadge>
                  </p>
                  <p
                    style={{
                      textAlign: "center",
                      transition: "transform 0.5s ease-out"
                    }}
                  >
                    ▾
                  </p>
                </OrdersItemTrigger>
                <OrdersItemPanel
                  id={`panel-${idx}`}
                  role="region"
                  aria-labelledby={`trigger-${idx}`}
                >
                  <button>
                    <StyledMenuDotsIcon
                      onClick={() => toggleActionsMenu(`action-menu-${idx}`)}
                    />
                  </button>
                  <ActionsMenu id={`action-menu-${idx}`}>
                    <li>
                      <button>
                        <StyledEditIcon />
                        Edit
                      </button>
                    </li>
                    <li>
                      <button>
                        <StyledEmailIcon />
                        Send Email
                      </button>
                    </li>
                    <li>
                      <button>
                        <StyledArchiveIcon />
                        Archive
                      </button>
                    </li>
                    <li>
                      <button>
                        <StyledDeleteIcon />
                        Delete
                      </button>
                    </li>
                  </ActionsMenu>
                  <div>
                    <span>Name: </span>
                    <p>{order.name}</p>
                  </div>
                  <div>
                    <span>Student ID: </span>
                    <p>{order.studentID}</p>
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
