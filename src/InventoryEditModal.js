import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ky from "ky";
import { useQuery, useMutation, queryCache } from "react-query";

import fetchProduct from "./fetch/fetchProduct";

import { ToastContext } from "./Context";

import Modal from "./components/Modal";
import Quantity from "./components/Quantity";
import DecisionButton from "./components/DecisionButton";
import Spinner from "./components/Spinner";

const InventoryEditModal = styled(Modal)`
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

const InventoryEditModalComp = ({ dismissFunc }) => {
  const { data: fetchProductData } = useQuery("Product", fetchProduct);
  const setToastInfo = useContext(ToastContext);

  const [changesMade, setChangesMade] = useState(false);
  const [B8Field, setB8Field] = useState(0);
  const [R7Field, setR7Field] = useState(0);
  const [R8Field, setR8Field] = useState(0);
  const [R9Field, setR9Field] = useState(0);
  const [R10Field, setR10Field] = useState(0);
  const [R11Field, setR11Field] = useState(0);

  const [editProductMutate, { status: editProductStatus }] = useMutation(
    () =>
      ky.put(`https://rc-inventory.herokuapp.com/product/update/batch`, {
        json: {
          product: [
            {
              product_id: "0ae22821-d150-42bf-a7ae-d6c4e0a16fb4",
              product_name: "SUTD wrist band",
              product_size: 8,
              product_price: 10,
              stock: B8Field
            },
            {
              product_id: "222b1dd6-ce67-47b8-b763-52da91581597",
              product_name: "SUTD ring",
              product_size: 7,
              product_price: 15,
              stock: R7Field
            },
            {
              product_id: "117a72a4-83bd-4539-8cb9-ecc8bbddb3bc",
              product_name: "SUTD ring",
              product_size: 8,
              product_price: 15,
              stock: R8Field
            },
            {
              product_id: "d75a6df2-1284-4e2f-808b-6e3753718d6d",
              product_name: "SUTD ring",
              product_size: 9,
              product_price: 10,
              stock: R9Field
            },
            {
              product_id: "ad99a78d-3e2e-4718-9c59-c4913f9d612f",
              product_name: "SUTD ring",
              product_size: 10,
              product_price: 15,
              stock: R10Field
            },
            {
              product_id: "9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2",
              product_name: "SUTD ring",
              product_size: 11,
              product_price: 10,
              stock: R11Field
            }
          ]
        }
      }),
    {
      onSuccess: async () => {
        await queryCache.refetchQueries("updateID");
        await queryCache.refetchQueries("Product");
        dismissFunc();
        setToastInfo({
          triggered: true,
          message: "Successfully updated inventory.",
          persistent: false,
          otherFuncs: []
        });
      },
      onError: () => {
        dismissFunc();
        setToastInfo({
          triggered: true,
          message: "Failed to update inventory.",
          persistent: false,
          otherFuncs: []
        });
      }
    }
  );

  useEffect(() => {
    if (fetchProductData) {
      setB8Field(fetchProductData[0].stock);
      setR7Field(fetchProductData[1].stock);
      setR8Field(fetchProductData[2].stock);
      setR9Field(fetchProductData[3].stock);
      setR10Field(fetchProductData[4].stock);
      setR11Field(fetchProductData[5].stock);
    }
  }, [fetchProductData]);

  return (
    <InventoryEditModal dismissFunc={dismissFunc}>
      <div>
        <h3>Edit Stock</h3>
        <div>
          <label>Band Size 8</label>
          <Quantity
            value={B8Field}
            onChange={e => {
              setB8Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Ring Size 7</label>
          <Quantity
            value={R7Field}
            onChange={e => {
              setR7Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Ring Size 8</label>
          <Quantity
            value={R8Field}
            onChange={e => {
              setR8Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Ring Size 9</label>
          <Quantity
            value={R9Field}
            onChange={e => {
              setR9Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Ring Size 10</label>
          <Quantity
            value={R10Field}
            onChange={e => {
              setR10Field(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Ring Size 11</label>
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
        {editProductStatus === "loading" ? (
          <Spinner />
        ) : (
          <>
            {changesMade ? (
              <DecisionButton onClick={editProductMutate}>
                Apply Changes
              </DecisionButton>
            ) : (
              <DecisionButton disabled>Apply Changes</DecisionButton>
            )}
            <DecisionButton onClick={dismissFunc}>Cancel</DecisionButton>
          </>
        )}
      </div>
    </InventoryEditModal>
  );
};

export default InventoryEditModalComp;
