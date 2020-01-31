import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import ky from "ky";
import { format } from "date-fns";

import Checkbox from "./Checkbox";
import Confirmation from "./Confirmation";

import { ReactComponent as MenuDotsIcon } from "./icons/menu-dots.svg";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as EmailIcon } from "./icons/email.svg";
import { ReactComponent as ArchiveIcon } from "./icons/archive.svg";
import { ReactComponent as DeleteIcon } from "./icons/delete.svg";

const OrdersItem = styled.div``;

const OrdersItemTrigger = styled.div`
  display: grid;
  grid-template-columns: 5% 10% 40% 20% 15% 10%;
  font-family: var(--font-primary);
  font-size: 16px;
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

const StatusBadge = styled.span`
  padding: 5px;
  border-radius: 10px;
  font-family: var(--font-primary);
  font-size: 16px;
  color: white;
  background-color: ${props =>
    props.children === "Pending"
      ? "var(--color-accent-pending)"
      : props.children === "Processed"
      ? "var(--color-accent-processed)"
      : "var(--color-accent-collected)"};
`;

const ActionsMenu = styled.ul`
  display: none;
  position: absolute;
  top: 35px;
  right: 25px;
  border-radius: 10px;
  border: 1px solid var(--color-accent-main);
  background-color: var(--color-element-dark);
  transform: scale(0);
  transition: transform 0.1s linear;

  & > li:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  & > li:last-of-type {
    border-radius: 0 0 10px 10px;
  }

  & > li:hover {
    background-color: var(--color-accent-main);
  }

  & > li + li {
    border-top: 1px solid var(--color-accent-main);
  }

  & > li > button {
    width: 100%;
    text-align: left;
    padding: 10px 20px;
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
  border: 1px solid var(--color-accent-main);

  &:hover {
    background-color: var(--color-accent-main);
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
    trigger.style.backgroundColor = "var(--color-element-light)";
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
    menu.style.transform = "scale(0)";
    setTimeout(() => {
      menu.style.display = "none";
    }, 100);
  } else {
    menu.style.display = "block";
    setTimeout(() => {
      menu.style.transform = "scale(1)";
    }, 100);
  }
};

const OrdersItemComp = ({
  order,
  idx,
  orders,
  setOrders,
  checked,
  setChecked
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const checkOrder = (e, order) => {
    const checkedVal = e.target.checked;
    if (checkedVal) {
      setChecked([...checked, order]);
    } else {
      setChecked(checked.filter(o => o.orderID !== order.orderID));
    }
  };

  const deleteOrder = async id => {
    const putResult = await ky.put(
      `https://rc-inventory.herokuapp.com/order/cancelled/${id}`,
      { timeout: 60000 }
    );

    if (putResult.status === 200) {
      setOrders(orders.filter(d => d.orderID !== id));
    } else {
      // TODO
    }
  };

  return (
    <OrdersItem>
      <OrdersItemTrigger
        aria-expanded="false"
        aria-controls={`panel-${idx}`}
        id={`trigger-${idx}`}
        onClick={e => toggleAccordion(e)}
      >
        <p>
          <Checkbox
            className="order-item-checkbox"
            style={{
              pointerEvents: "auto"
            }}
            onChange={e => checkOrder(e, order)}
          />
        </p>
        <p>{order.orderID}</p>
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
            <button onClick={() => setConfirmationOpen(true)}>
              <StyledDeleteIcon />
              Delete
            </button>
            {confirmationOpen &&
              ReactDOM.createPortal(
                <Confirmation
                  message={`Are you sure you want to delete order #${order.orderID}?`}
                  positiveFunc={() => {
                    deleteOrder(order.orderID);
                    setConfirmationOpen(false);
                  }}
                  negativeFunc={() => setConfirmationOpen(false)}
                />,
                document.querySelector("#modal")
              )}
          </li>
        </ActionsMenu>
        <div>
          <span>Order Number: </span>
          <p>{order.orderID}</p>
        </div>
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
          <p>{format(new Date(order.submitDate), "do MMMM yyyy, h:mma")}</p>
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
};

export default OrdersItemComp;
