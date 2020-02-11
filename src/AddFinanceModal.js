import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ky from "ky";

import Modal from "./components/Modal";
import Input from "./components/Input";
import Upload from "./components/Upload";
import DecisionButton from "./components/DecisionButton";

const AddFinanceModal = styled(Modal)`
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

const ThumbnailGallery = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly !important;
  //   border: 1px solid red;
`;

const Thumbnail = styled.div`
  position: relative;

  & > img {
    width: 75px;
    height: 75px;
  }

  & > span {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(30%, -30%);
    display: block;
    box-sizing: border-box;
    width: 20px;
    height: 20px;
    border-width: 3px;
    border-style: solid;
    border-color: var(--color-element-light);
    border-radius: 100%;
    background: -webkit-linear-gradient(
        -45deg,
        transparent 0%,
        transparent 46%,
        var(--color-accent-main) 46%,
        var(--color-accent-main) 56%,
        transparent 56%,
        transparent 100%
      ),
      -webkit-linear-gradient(45deg, transparent 0%, transparent 46%, var(
              --color-accent-main
            )
            46%, var(--color-accent-main) 56%, transparent 56%, transparent 100%);
    background-color: var(--color-element-light);
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.5);
    // transition: all 0.3s ease;
  }
`;

async function fileListToBase64(fileList) {
  // create function which return resolved promise
  // with data:base64 string
  function getBase64(file) {
    const reader = new FileReader();
    return new Promise(resolve => {
      reader.onload = ev => {
        resolve(ev.target.result);
      };
      reader.readAsDataURL(file);
    });
  }
  // here will be array of promisified functions
  const promises = [];

  // loop through fileList with for loop
  for (let i = 0; i < fileList.length; i++) {
    promises.push(getBase64(fileList[i]));
  }

  // array with base64 strings
  return await Promise.all(promises);
}

const AddFinanceModalComp = ({
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

  const [uploadedRefs, setUploadedRefs] = useState([]);

  console.log(uploadedRefs);

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

  //   const editStock = async () => {
  //     const putResult = await ky.put(
  //       `https://rc-inventory.herokuapp.com/product/update/batch`,
  //       {
  //         json: {
  //           product: [
  //             {
  //               product_id: "0ae22821-d150-42bf-a7ae-d6c4e0a16fb4",
  //               product_name: "SUTD wrist band",
  //               product_size: 8,
  //               product_price: 10,
  //               stock: B8Field.value
  //             },
  //             {
  //               product_id: "222b1dd6-ce67-47b8-b763-52da91581597",
  //               product_name: "SUTD ring",
  //               product_size: 7,
  //               product_price: 15,
  //               stock: R7Field.value
  //             },
  //             {
  //               product_id: "117a72a4-83bd-4539-8cb9-ecc8bbddb3bc",
  //               product_name: "SUTD ring",
  //               product_size: 8,
  //               product_price: 15,
  //               stock: R8Field.value
  //             },
  //             {
  //               product_id: "d75a6df2-1284-4e2f-808b-6e3753718d6d",
  //               product_name: "SUTD ring",
  //               product_size: 9,
  //               product_price: 10,
  //               stock: R9Field.value
  //             },
  //             {
  //               product_id: "ad99a78d-3e2e-4718-9c59-c4913f9d612f",
  //               product_name: "SUTD ring",
  //               product_size: 10,
  //               product_price: 15,
  //               stock: R10Field.value
  //             },
  //             {
  //               product_id: "9d2ed13e-d8dc-45cc-a462-c755a2cd9ff2",
  //               product_name: "SUTD ring",
  //               product_size: 11,
  //               product_price: 10,
  //               stock: R11Field.value
  //             }
  //           ]
  //         }
  //       }
  //     );

  //     if (putResult.status === 200) {
  //       setInventory([
  //         {
  //           size: "B7",
  //           orders: {
  //             Total: 0,
  //             Pending: 0,
  //             Processed: 0,
  //             Collected: 0
  //           },
  //           stock: B8Field.value
  //         },
  //         {
  //           size: "R5",
  //           orders: {
  //             Total: 0,
  //             Pending: 0,
  //             Processed: 0,
  //             Collected: 0
  //           },
  //           stock: R7Field.value
  //         },
  //         {
  //           size: "R6",
  //           orders: {
  //             Total: 0,
  //             Pending: 0,
  //             Processed: 0,
  //             Collected: 0
  //           },
  //           stock: R8Field.value
  //         },
  //         {
  //           size: "R7",
  //           orders: {
  //             Total: 0,
  //             Pending: 0,
  //             Processed: 0,
  //             Collected: 0
  //           },
  //           stock: R9Field.value
  //         },
  //         {
  //           size: "R8",
  //           orders: {
  //             Total: 0,
  //             Pending: 0,
  //             Processed: 0,
  //             Collected: 0
  //           },
  //           stock: R10Field.value
  //         },
  //         {
  //           size: "R9",
  //           orders: {
  //             Total: 0,
  //             Pending: 0,
  //             Processed: 0,
  //             Collected: 0
  //           },
  //           stock: R11Field.value
  //         }
  //       ]);

  //       setLastAction({
  //         action: `edit-inventory`,
  //         obj: {}
  //       });
  //     } else {
  //       // TODO
  //     }
  //   };

  return (
    <AddFinanceModal dismissFunc={dismissFunc}>
      <div>
        <h3>Add Record</h3>
        <div>
          <label>Title</label>
          <Input />
        </div>
        <div>
          <label>Submitter</label>
          <Input />
        </div>
        <div>
          <label>Details</label>
          <Input />
        </div>
        <div>
          <label>Amount</label>
          <Input />
        </div>
        <div>
          <label>References</label>
          {/* <Upload field={uploadedRefs} setField={setUploadedRefs} /> */}
        </div>
        <div>
          <Upload field={uploadedRefs} setField={setUploadedRefs} />
        </div>
      </div>
      <div>
        {changesMade ? (
          <DecisionButton
            onClick={() => {
              //   editStock();
              dismissFunc();
            }}
          >
            Add Record
          </DecisionButton>
        ) : (
          <DecisionButton disabled>Add Record</DecisionButton>
        )}
        <DecisionButton onClick={dismissFunc}>Cancel</DecisionButton>
      </div>
    </AddFinanceModal>
  );
};

export default AddFinanceModalComp;
