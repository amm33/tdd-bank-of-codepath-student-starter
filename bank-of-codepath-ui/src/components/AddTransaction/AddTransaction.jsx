import * as React from "react";
import "./AddTransaction.css";
import { axios } from "axios";

export default function AddTransaction(props) {
  //handleOnFormFieldChange function
  const handleOnFormFieldChange = (change) => {
    var targ = change.target;
    props.setForm({ ...props.form, [targ.name]: targ.value });
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        isCreating={props.isCreating}
        handleOnSubmit={props.handleOnSubmit}
        handleOnFormFieldChange={handleOnFormFieldChange}
        form={props.form}
      />
    </div>
  );
}

export function AddTransactionForm(props) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input
            name="description"
            onChange={props.handleOnFormFieldChange}
            type="text"
            value={props.form ? props.form.description : ""}
          />
        </div>
        <div className="field">
          <label>Category</label>
          <input
            name="category"
            onChange={props.handleOnFormFieldChange}
            type="text"
            value={props.form ? props.form.category : ""}
          />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input
            name="amount"
            onChange={props.handleOnFormFieldChange}
            type="number"
            value={props.form ? props.form.amount : 0}
          />
        </div>

        <button
          className="btn add-transaction"
          type="submit"
          onClick={props.handleOnSubmit}
        >
          Add
        </button>
      </div>
    </div>
  );
}
