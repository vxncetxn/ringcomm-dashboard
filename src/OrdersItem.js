import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import ky from "ky";
import { format } from "date-fns";

import { DataContext } from "./Context";

import productMap from "./helpers/productMap";

import OrderEditModal from "./OrderEditModal";
import ConfirmationModal from "./ConfirmationModal";

import { ReactComponent as MenuDotsIcon } from "./icons/menu-dots.svg";
import { ReactComponent as EmailIcon } from "./icons/email.svg";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as DeleteIcon } from "./icons/delete.svg";

import TableRow from "./components/TableRow";

const StatusBadge = styled.span`
  padding: 5px;
  border-radius: 10px;
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

const StyledEmailIcon = styled(EmailIcon)`
  fill: var(--color-text);
  width: 13px;
  height: 13px;
`;

const StyledEditIcon = styled(EditIcon)`
  fill: var(--color-text);
  width: 13px;
  height: 13px;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  fill: var(--color-text);
  width: 13px;
  height: 13px;
`;

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

const OrdersItemComp = ({ order, id, checked, setChecked }) => {
  const { orders, setOrders, setLastAction } = useContext(DataContext);

  const [orderEditOpen, setOrderEditOpen] = useState(false);
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const checkOrder = e => {
    const checkedVal = e.target.checked;
    if (checkedVal) {
      setChecked([...checked, order]);
    } else {
      setChecked(checked.filter(o => o.orderID !== order.orderID));
    }
  };

  const deleteOrder = async id => {
    const deleteResult = await ky.delete(
      `https://rc-inventory.herokuapp.com/order/cancelled/${id}`,
      { timeout: 60000 }
    );

    if (deleteResult.status === 200) {
      setOrders(orders.filter(d => d.orderID !== id));
      setLastAction({ action: "delete", obj: {} });
    } else {
      // TODO
    }
  };

  return (
    <TableRow
      id={id}
      cols="5% 15% 30% 20% 20% 10%"
      checkFunc={checkOrder}
      triggerChildren={
        <>
          <p>{order.orderID}</p>
          <p>{order.name}</p>
          <p>{order.studentID}</p>
          <p>
            <StatusBadge>{order.status}</StatusBadge>
          </p>
        </>
      }
      panelChildren={
        <>
          <button>
            <StyledMenuDotsIcon
              onClick={() => toggleActionsMenu(`${id}-action-menu`)}
            />
          </button>
          <ActionsMenu id={`${id}-action-menu`}>
            <li>
              <button>
                <StyledEmailIcon />
                Send Email
              </button>
            </li>
            <li>
              <button onClick={() => setOrderEditOpen(true)}>
                <StyledEditIcon />
                Edit
              </button>
              {orderEditOpen &&
                ReactDOM.createPortal(
                  <OrderEditModal
                    order={order}
                    dismissFunc={() => setOrderEditOpen(false)}
                  />,
                  document.querySelector("#modal")
                )}
            </li>
            <li>
              <button onClick={() => setConfirmationOpen(true)}>
                <StyledDeleteIcon />
                Delete
              </button>
              {confirmationOpen &&
                ReactDOM.createPortal(
                  <ConfirmationModal
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
            <span>Products: </span>
            <p>
              {Object.entries(order.products)
                .filter(entry => entry[1] > 0)
                .map((entry, idx, arr) => {
                  return `${productMap(entry[0]).name} x${entry[1]}${
                    idx !== arr.length - 1 ? `, ` : ``
                  }`;
                })}
            </p>
          </div>
          <div>
            <span>Status: </span>
            <p>
              <StatusBadge>{order.status}</StatusBadge>
            </p>
          </div>
        </>
      }
    />
  );
};

export default OrdersItemComp;
