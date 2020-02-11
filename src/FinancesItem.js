import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import ky from "ky";
import { format } from "date-fns";

import ConfirmationModal from "./ConfirmationModal";

import { ReactComponent as MenuDotsIcon } from "./icons/menu-dots.svg";
import { ReactComponent as EmailIcon } from "./icons/email.svg";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import { ReactComponent as DeleteIcon } from "./icons/delete.svg";

import References from "./References";
import TableRow from "./components/TableRow";

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

const FinancesItemComp = ({
  transaction,
  id,
  checked,
  setChecked,
  setLastAction
}) => {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const checkTransaction = e => {
    const checkedVal = e.target.checked;
    if (checkedVal) {
      setChecked([...checked, transaction]);
    } else {
      setChecked(
        checked.filter(d => d.transactionID !== transaction.transactionID)
      );
    }
  };

  //   const deleteOrder = async id => {
  //     const putResult = await ky.put(
  //       `https://rc-inventory.herokuapp.com/order/cancelled/${id}`,
  //       { timeout: 60000 }
  //     );

  //     if (putResult.status === 200) {
  //       setOrders(orders.filter(d => d.orderID !== id));
  //       setLastAction({ action: "delete", obj: {} });
  //     } else {
  //       // TODO
  //     }
  //   };

  return (
    <TableRow
      id={id}
      cols="5% 30% 20% 20% 15% 10%"
      checkFunc={checkTransaction}
      checked={checked}
      setChecked={setChecked}
      triggerChildren={
        <>
          <p>{transaction.title}</p>
          <p>{transaction.submitter}</p>
          <p>{format(new Date(transaction.submitDate), "do MMMM yyyy")}</p>
          <p style={{ color: transaction.amount >= 0 ? "#40b11b" : "red" }}>
            {transaction.amount >= 0
              ? `+${transaction.amount}`
              : transaction.amount}
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
                <StyledEditIcon />
                Edit
              </button>
            </li>
            <li>
              <button onClick={() => setConfirmationOpen(true)}>
                <StyledDeleteIcon />
                Delete
              </button>
              {/* {confirmationOpen &&
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
                )} */}
            </li>
          </ActionsMenu>
          <div>
            <span>Title: </span>
            <p>{transaction.title}</p>
          </div>
          <div>
            <span>Handler: </span>
            <p>{transaction.submitter}</p>
          </div>
          <div>
            <span>Transaction Submission Date: </span>
            <p>{format(new Date(transaction.submitDate), "do MMMM yyyy")}</p>
          </div>
          <div>
            <span>Details: </span>
            <p>{transaction.details}</p>
          </div>
          <div>
            <span>Amount: </span>
            <p style={{ color: transaction.amount >= 0 ? "#40b11b" : "red" }}>
              {transaction.amount >= 0
                ? `+${transaction.amount}`
                : transaction.amount}
            </p>
          </div>
          <div>
            <span>References: </span>
            <References
              images={transaction.references}
              referenceContext={transaction.title}
            />
            {/* <button onClick={() => setLightboxOpen(true)}>TEMPORARY</button>
            {lightboxOpen && (
              <BetterLightbox
                images={transaction.references}
                clickedIdx={0}
                dismissFunc={() => setLightboxOpen(false)}
              />
            )} */}
          </div>
        </>
      }
    />
  );
};

export default FinancesItemComp;
