import React, { useState, useContext } from "react";
import styled from "styled-components";
import ky from "ky";

import { ToastContext, DataContext } from "./Context";

import Modal from "./components/Modal";
import Input from "./components/Input";
import Quantity from "./components/Quantity";
import DecisionButton from "./components/DecisionButton";
import Spinner from "./components/Spinner";

const AddOrderModal = styled(Modal)`
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

  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: end;
    height: 10px;
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

const AddOrderModalComp = ({ dismissFunc }) => {
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

  const [buttonState, setButtonState] = useState("default");

  const addOrder = async () => {
    const newProducts = [];
    if (B8Field) {
      newProducts.push({
        order_id: 99,
        quantity: B8Field,
        product_id: "0ae22821-d150-42bf-a7ae-d6c4e0a16fb4"
      });
    }
    if (R7Field) {
      newProducts.push({
        order_id: 99,
        quantity: R7Field,
        product_id: "222b1dd6-ce67-47b8-b763-52da91581597"
      });
    }
    if (R8Field) {
      newProducts.push({
        order_id: 99,
        quantity: R8Field,
        product_id: "117a72a4-83bd-4539-8cb9-ecc8bbddb3bc"
      });
    }
    if (R9Field) {
      newProducts.push({
        order_id: 99,
        quantity: R9Field,
        product_id: "d75a6df2-1284-4e2f-808b-6e3753718d6d"
      });
    }
    if (R10Field) {
      newProducts.push({
        order_id: 99,
        quantity: R10Field,
        product_id: "ad99a78d-3e2e-4718-9c59-c4913f9d612f"
      });
    }
    if (R11Field) {
      newProducts.push({
        order_id: 99,
        quantity: R11Field,
        product_id: "9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2"
      });
    }

    setButtonState("loading");
    try {
      await ky.post(`https://rc-inventory.herokuapp.com/order/insert`, {
        json: {
          customer: {
            customer_id: IDField,
            full_name: nameField,
            email: emailField
          },
          order: {
            description: "",
            items: newProducts
          }
        }
      });

      setOrders([
        ...orders,
        {
          orderID: 99,
          name: nameField,
          studentID: IDField,
          email: emailField,
          submitDate: new Date(),
          status: ["Pending", "Processed", "Collected"][
            Math.floor(Math.random() * 3)
          ],
          products: {
            "0ae22821-d150-42bf-a7ae-d6c4e0a16fb4": B8Field,
            "222b1dd6-ce67-47b8-b763-52da91581597": R7Field,
            "117a72a4-83bd-4539-8cb9-ecc8bbddb3bc": R8Field,
            "d75a6df2-1284-4e2f-808b-6e3753718d6d": R9Field,
            "ad99a78d-3e2e-4718-9c59-c4913f9d612f": R10Field,
            "9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2": R11Field
          }
        }
      ]);

      dismissFunc();
      setToastInfo({
        triggered: true,
        action: "Successfully added order.",
        persistent: false
      });
    } catch {
      dismissFunc();
      setToastInfo({
        triggered: true,
        action: "Failed to add order.",
        persistent: false
      });
    }
  };

  return (
    <AddOrderModal dismissFunc={dismissFunc}>
      <div>
        <h3>Add Order</h3>
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
      </div>
      <div>
        {buttonState === "default" ? (
          <>
            {changesMade ? (
              <DecisionButton onClick={addOrder}>Add Order</DecisionButton>
            ) : (
              <DecisionButton disabled>Add Order</DecisionButton>
            )}
            <DecisionButton onClick={dismissFunc}>Cancel</DecisionButton>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </AddOrderModal>
  );
};

export default AddOrderModalComp;
