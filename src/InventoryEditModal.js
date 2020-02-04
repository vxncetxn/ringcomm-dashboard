import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ky from "ky";

import Modal from "./components/Modal";
import Quantity from "./components/Quantity";
import DecisionButton from "./components/DecisionButton";

const InventoryEditModal = styled(Modal)`
  width: 600px;

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
    margin-top: 10px;
  }

  & > div > button + button {
    margin-left: 30px;
  }
`;

const InventoryEditModalComp = ({
  setInventory,
  processedInventory,
  setLastAction,
  dismissFunc
}) => {
  const [changesMade, setChangesMade] = useState(false);
  const [B8Field, setB8Field] = useState({ value: 0, changes: false });
  const [R7Field, setR7Field] = useState({ value: 0, changes: false });
  const [R8Field, setR8Field] = useState({ value: 0, changes: false });
  const [R9Field, setR9Field] = useState({ value: 0, changes: false });
  const [R10Field, setR10Field] = useState({ value: 0, changes: false });
  const [R11Field, setR11Field] = useState({ value: 0, changes: false });

  useEffect(() => {
    if (processedInventory) {
      setB8Field({ value: processedInventory[0].stock, changes: false });
      setR7Field({ value: processedInventory[1].stock, changes: false });
      setR8Field({ value: processedInventory[2].stock, changes: false });
      setR9Field({ value: processedInventory[3].stock, changes: false });
      setR10Field({ value: processedInventory[4].stock, changes: false });
      setR11Field({ value: processedInventory[5].stock, changes: false });
    }
  }, [processedInventory]);

  const editStock = async () => {
    // const putResult = await ky.put(
    //   `https://rc-inventory.herokuapp.com/product/update`,
    //   { timeout: 60000 }
    // );

    setLastAction({
      action: `edit-inventory`,
      obj: {}
    });

    if (B8Field.changes) {
      await ky.put(`https://rc-inventory.herokuapp.com/product/update`, {
        json: {
          product: {
            product_id: "0ae22821-d150-42bf-a7ae-d6c4e0a16fb4",
            product_name: "SUTD wrist band",
            product_size: 8,
            product_price: 10,
            stock_on_hand: B8Field.value,
            stock_reserved: 0,
            stock_available: 0
          }
        }
      });
    }

    if (R7Field.changes) {
      await ky.put(`https://rc-inventory.herokuapp.com/product/update`, {
        json: {
          product: {
            product_id: "222b1dd6-ce67-47b8-b763-52da91581597",
            product_name: "SUTD ring",
            product_size: 7,
            product_price: 15,
            stock_on_hand: R7Field.value,
            stock_reserved: 0,
            stock_available: 0
          }
        }
      });
    }

    if (R8Field.changes) {
      await ky.put(`https://rc-inventory.herokuapp.com/product/update`, {
        json: {
          product: {
            product_id: "117a72a4-83bd-4539-8cb9-ecc8bbddb3bc",
            product_name: "SUTD ring",
            product_size: 8,
            product_price: 15,
            stock_on_hand: R8Field.value,
            stock_reserved: 0,
            stock_available: 0
          }
        }
      });
    }

    if (R9Field.changes) {
      await ky.put(`https://rc-inventory.herokuapp.com/product/update`, {
        json: {
          product: {
            product_id: "d75a6df2-1284-4e2f-808b-6e3753718d6d",
            product_name: "SUTD ring",
            product_size: 9,
            product_price: 10,
            stock_on_hand: R9Field.value,
            stock_reserved: 0,
            stock_available: 0
          }
        }
      });
    }

    if (R10Field.changes) {
      await ky.put(`https://rc-inventory.herokuapp.com/product/update`, {
        json: {
          product: {
            product_id: "ad99a78d-3e2e-4718-9c59-c4913f9d612f",
            product_name: "SUTD ring",
            product_size: 10,
            product_price: 15,
            stock_on_hand: R10Field.value,
            stock_reserved: 0,
            stock_available: 0
          }
        }
      });
    }

    if (R11Field.changes) {
      await ky.put(`https://rc-inventory.herokuapp.com/product/update`, {
        json: {
          product: {
            product_id: "9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2",
            product_name: "SUTD ring",
            product_size: 11,
            product_price: 10,
            stock_on_hand: R11Field.value,
            stock_reserved: 0,
            stock_available: 0
          }
        }
      });
    }

    setInventory([
      {
        size: "B7",
        orders: {
          Total: 0,
          Pending: 0,
          Processed: 0,
          Collected: 0
        },
        stock: B8Field.value
      },
      {
        size: "R5",
        orders: {
          Total: 0,
          Pending: 0,
          Processed: 0,
          Collected: 0
        },
        stock: R7Field.value
      },
      {
        size: "R6",
        orders: {
          Total: 0,
          Pending: 0,
          Processed: 0,
          Collected: 0
        },
        stock: R8Field.value
      },
      {
        size: "R7",
        orders: {
          Total: 0,
          Pending: 0,
          Processed: 0,
          Collected: 0
        },
        stock: R9Field.value
      },
      {
        size: "R8",
        orders: {
          Total: 0,
          Pending: 0,
          Processed: 0,
          Collected: 0
        },
        stock: R10Field.value
      },
      {
        size: "R9",
        orders: {
          Total: 0,
          Pending: 0,
          Processed: 0,
          Collected: 0
        },
        stock: R11Field.value
      }
    ]);

    // if (putResult.status === 200) {
    //   // setOrders(orders.filter(d => d.orderID !== id));
    // } else {
    //   // TODO
    // }
  };

  return (
    <InventoryEditModal dismissFunc={dismissFunc}>
      <div>
        <h3>Edit Stock</h3>
        <div>
          <label>Band Size 8</label>
          <Quantity
            field={B8Field}
            setField={setB8Field}
            onChange={() => setChangesMade(true)}
          />
        </div>
        <div>
          <label>Ring Size 7</label>
          <Quantity
            field={R7Field}
            setField={setR7Field}
            onChange={() => setChangesMade(true)}
          />
        </div>
        <div>
          <label>Ring Size 8</label>
          <Quantity
            field={R8Field}
            setField={setR8Field}
            onChange={() => setChangesMade(true)}
          />
        </div>
        <div>
          <label>Ring Size 9</label>
          <Quantity
            field={R9Field}
            setField={setR9Field}
            onChange={() => setChangesMade(true)}
          />
        </div>
        <div>
          <label>Ring Size 10</label>
          <Quantity
            field={R10Field}
            setField={setR10Field}
            onChange={() => setChangesMade(true)}
          />
        </div>
        <div>
          <label>Ring Size 11</label>
          <Quantity
            field={R11Field}
            setField={setR11Field}
            onChange={() => setChangesMade(true)}
          />
        </div>
      </div>
      <div>
        {changesMade ? (
          <DecisionButton
            onClick={() => {
              editStock();
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
    </InventoryEditModal>
  );
};

export default InventoryEditModalComp;
