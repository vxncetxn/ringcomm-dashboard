import React, { useState, useContext } from "react";
import styled from "styled-components";
import ky from "ky";

import { ToastContext, DataContext } from "./Context";

import Modal from "./components/Modal";
import Input from "./components/Input";
import Upload from "./components/Upload";
import DecisionButton from "./components/DecisionButton";
import Spinner from "./components/Spinner";

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

const AddFinanceModalComp = ({ dismissFunc }) => {
  const setToastInfo = useContext(ToastContext);
  const { transactions, setTransactions } = useContext(DataContext);

  const [changesMade, setChangesMade] = useState(false);
  const [titleField, setTitleField] = useState("");
  const [submitterField, setSubmitterField] = useState("");
  const [detailsField, setDetailsField] = useState("");
  const [amountField, setAmountField] = useState("");
  const [uploadedRefs, setUploadedRefs] = useState([]);

  const [buttonState, setButtonState] = useState("default");

  const addFinance = async () => {
    const newReference = await uploadedRefs.map(d => {
      return {
        data: d.slice(d.indexOf(",") + 1),
        content_type: d.slice(5, d.indexOf(";"))
      };
    });

    setButtonState("loading");
    try {
      await ky.post(`https://rc-inventory.herokuapp.com/finance/insert`, {
        json: {
          finance: {
            title: titleField,
            submitter: submitterField,
            amount: parseFloat(amountField),
            details: detailsField,
            reference: newReference
          }
        }
      });

      setTransactions([
        ...transactions,
        {
          title: titleField,
          submitter: submitterField,
          amount: parseFloat(amountField),
          details: detailsField,
          references: uploadedRefs
        }
      ]);

      dismissFunc();
      setToastInfo({
        triggered: true,
        message: "Successfully added transaction.",
        persistent: false
      });
    } catch (err) {
      console.log(err);
      dismissFunc();
      setToastInfo({
        triggered: true,
        message: "Failed to add transaction.",
        persistent: false
      });
    }
  };

  return (
    <AddFinanceModal dismissFunc={dismissFunc}>
      <div>
        <h3>Add Record</h3>
        <div>
          <label>Title</label>
          <Input
            value={titleField}
            onChange={e => {
              setTitleField(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Submitter</label>
          <Input
            value={submitterField}
            onChange={e => {
              setSubmitterField(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Details</label>
          <Input
            value={detailsField}
            onChange={e => {
              setDetailsField(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>Amount</label>
          <Input
            value={amountField}
            onChange={e => {
              setAmountField(e.target.value);
              setChangesMade(true);
            }}
          />
        </div>
        <div>
          <label>References</label>
        </div>
        <div>
          <Upload
            field={uploadedRefs}
            setField={setUploadedRefs}
            onChange={() => setChangesMade(true)}
          />
        </div>
      </div>
      <div>
        {buttonState === "default" ? (
          <>
            {changesMade ? (
              <DecisionButton onClick={addFinance}>Add Record</DecisionButton>
            ) : (
              <DecisionButton disabled>Add Record</DecisionButton>
            )}
            <DecisionButton onClick={dismissFunc}>Cancel</DecisionButton>
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </AddFinanceModal>
  );
};

export default AddFinanceModalComp;
