import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ky from "ky";

import { ToastContext, DataContext } from "./Context";

import Modal from "./components/Modal";
import Input from "./components/Input";
import Quantity from "./components/Quantity";
// import Selector from "./components/Selector";
import DecisionButton from "./components/DecisionButton";

const OrderEditModal = styled(Modal)`
  width: 400px;

  & h3 {
    font-size: inherit;
    font-weight: inherit;
    border-bottom: 1px solid var(--color-text);
    margin-bottom: 20px;
  }

  & > div + div {
    margin-top: 40px;
  }

  & > div > div {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  & > div > div + div {
    margin-top: 15px;
  }

  & > div > button + button {
    margin-left: 30px;
  }
`;

const OrderEditModalComp = ({ order, dismissFunc }) => {
  const setToastInfo = useContext(ToastContext);
  const { orders, setOrders } = useContext(DataContext);

  const [changesMade, setChangesMade] = useState(false);
  const [nameField, setNameField] = useState("");
  const [IDField, setIDField] = useState("");
  const [emailField, setEmailField] = useState("");

  const [B8Field, setB8Field] = useState(0);
  const [R7Field, setR7Field] = useState(0);
  const [R8Field, setR8Field] = useState(0);
  const [R9Field, setR9Field] = useState(0);
  const [R10Field, setR10Field] = useState(0);
  const [R11Field, setR11Field] = useState(0);

  //   const [statusField, setStatusField] = useState("");

  useEffect(() => {
    if (order) {
      setNameField(order.name);
      setIDField(order.studentID);
      setEmailField(order.email);

      setB8Field(order.products["0ae22821-d150-42bf-a7ae-d6c4e0a16fb4"]);
      setR7Field(order.products["222b1dd6-ce67-47b8-b763-52da91581597"]);
      setR8Field(order.products["117a72a4-83bd-4539-8cb9-ecc8bbddb3bc"]);
      setR9Field(order.products["d75a6df2-1284-4e2f-808b-6e3753718d6d"]);
      setR10Field(order.products["ad99a78d-3e2e-4718-9c59-c4913f9d612f"]);
      setR11Field(order.products["9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2"]);

      //   setStatusField(order.status);
    }
  }, [order]);

  const editOrder = async () => {
    const newProducts = [];
    if (B8Field) {
      newProducts.push({
        order_id: order.orderID,
        quantity: B8Field,
        product_id: "0ae22821-d150-42bf-a7ae-d6c4e0a16fb4"
      });
    }
    if (R7Field) {
      newProducts.push({
        order_id: order.orderID,
        quantity: R7Field,
        product_id: "222b1dd6-ce67-47b8-b763-52da91581597"
      });
    }
    if (R8Field) {
      newProducts.push({
        order_id: order.orderID,
        quantity: R8Field,
        product_id: "117a72a4-83bd-4539-8cb9-ecc8bbddb3bc"
      });
    }
    if (R9Field) {
      newProducts.push({
        order_id: order.orderID,
        quantity: R9Field,
        product_id: "d75a6df2-1284-4e2f-808b-6e3753718d6d"
      });
    }
    if (R10Field) {
      newProducts.push({
        order_id: order.orderID,
        quantity: R10Field,
        product_id: "ad99a78d-3e2e-4718-9c59-c4913f9d612f"
      });
    }
    if (R11Field) {
      newProducts.push({
        order_id: order.orderID,
        quantity: R11Field,
        product_id: "9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2"
      });
    }

    try {
      await ky.put(`https://rc-inventory.herokuapp.com/order/update`, {
        json: {
          order_id: order.orderID,
          description: "",
          customer: {
            customer_id: IDField,
            full_name: nameField,
            email: emailField
          },
          items: newProducts
        }
      });

      setOrders(
        orders.map(d => {
          if (d.orderID === order.orderID) {
            return {
              orderID: d.orderID,
              name: nameField,
              studentID: IDField,
              email: emailField,
              submitDate: d.submitDate,
              status: "Processed",
              //   status: statusField,
              products: {
                "0ae22821-d150-42bf-a7ae-d6c4e0a16fb4": B8Field,
                "222b1dd6-ce67-47b8-b763-52da91581597": R7Field,
                "117a72a4-83bd-4539-8cb9-ecc8bbddb3bc": R8Field,
                "d75a6df2-1284-4e2f-808b-6e3753718d6d": R9Field,
                "ad99a78d-3e2e-4718-9c59-c4913f9d612f": R10Field,
                "9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2": R11Field
              }
            };
          } else {
            return d;
          }
        })
      );

      setToastInfo({
        triggered: true,
        message: "Successfully updated order.",
        persistent: false
      });
    } catch {
      setToastInfo({
        message: "Failed to update order.",
        persistent: false
      });
    }
  };

  return (
    <OrderEditModal dismissFunc={dismissFunc}>
      <div>
        <h3>Edit Order</h3>
        <div>
          <label>Name</label>
          <Input
            value={nameField}
            onChange={e => {
              setNameField(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Student ID</label>
          <Input
            value={IDField}
            onChange={e => {
              setIDField(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Email</label>
          <Input
            value={emailField}
            onChange={e => {
              setEmailField(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Products</label>
        </div>
        <div>
          <label>SUTD Band Size 8</label>
          <Quantity
            value={B8Field}
            onChange={e => {
              setB8Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>SUTD Ring Size 7</label>
          <Quantity
            value={R7Field}
            onChange={e => {
              setR7Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>SUTD Ring Size 8</label>
          <Quantity
            value={R8Field}
            onChange={e => {
              setR8Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>SUTD Ring Size 9</label>
          <Quantity
            value={R9Field}
            onChange={e => {
              setR9Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>SUTD Ring Size 10</label>
          <Quantity
            value={R10Field}
            onChange={e => {
              setR10Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>SUTD Ring Size 11</label>
          <Quantity
            value={R11Field}
            onChange={e => {
              setR11Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        {/* <div>
          <label>Status</label>
          <Selector
            options={["Pending", "Processed", "Collected"]}
            name=""
            value={statusField}
            onChange={e => {
              setChangesMade(true);
              setStatusField(e.target.value);
            }}
          />
        </div> */}
      </div>
      <div>
        {changesMade ? (
          <DecisionButton
            onClick={() => {
              editOrder();
              dismissFunc();
            }}
          >
            Apply Changes
          </DecisionButton>
        ) : (
          <DecisionButton disabled>Apply Changes</DecisionButton>
        )}
        <DecisionButton onClick={dismissFunc}>Cancel</DecisionButton>
      </div>
    </OrderEditModal>
  );
};

export default OrderEditModalComp;
