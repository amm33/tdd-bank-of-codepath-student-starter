import * as React from "react";
import AddTransaction from "../AddTransaction/AddTransaction";
import BankActivity from "../BankActivity/BankActivity";
import "./Home.css";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

// export default function Home({
//   transactions,
//   setTransactions,
//   transfers,
//   setTransfers,
//   error,
//   setError,
//   isLoading,
//   setIsLoading,
//   filterInputValue,
// }) {
//   useEffect(async () => {
//     setIsLoading(true);

//     //fetching the transactions
//     const fetch_transactions = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/bank/transactions`);
//         setTransactions([...transactions, ...response.data.transactions]); //confused on this
//       } catch (e) {
//         console.log("Transaction error: " + e);
//         setError(e);
//       }
//     };

//     //fetching the transfers
//     const fetch_transfers = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/bank/transfers`);
//         setTransfers(response.data.transfers);
//       } catch (e) {
//         console.log("Transfer error: " + e);
//         setError(e);
//       }
//     };

//     await fetch_transactions();
//     await fetch_transfers();
//     setIsLoading(false);
//   }, []);

//   // let filteredTransactions = transactions;
//   // if (filterInputValue !== "") {
//   //   filteredTransactions = transactions.filter((transaction) => {
//   //     return transaction.description
//   //       .toLowerCase()
//   //       .includes(filterInputValue.toLowerCase());
//   //   });
//   // }

//   let filteredTransactions = transactions;

//   if (filterInputValue !== "") {
//     filteredTransactions = transactions.filter((transaction) => {
//       return transaction.description
//         .toLowerCase()
//         .includes(filterInputValue.toLowerCase());
//     });
//   }

//   return (
//     <div className="home">
//       <AddTransaction />
//       <BankActivity transactions={filteredTransactions} transfers={transfers} />
//     </div>
//   );
// }

export default function Home(props) {
  const filteredTransactions = props.transactions
    ? props.transactions.filter((datum) => {
        return props.filterInputValue.length
          ? datum.description
              .toLowerCase()
              .includes(props.filterInputValue?.toLowerCase())
          : props.transactions;
      })
    : null;

  useEffect(() => {
    props.setIsLoading(true);

    const getTransactions = async () => {
      let transactionUrl = `http://localhost:3001/bank/transactions`;

      try {
        let transactResponse = await axios.get(transactionUrl);

        props.setTransactions(transactResponse.data.transactions);
      } catch (e) {
        console.log(e);
        props.setError(e);
      }
    };

    const getTransfers = async () => {
      let transferUrl = `http://localhost:3001/bank/transfers`;

      try {
        let transferResponse = await axios.get(transferUrl);

        props.setTransfers(transferResponse.data.transfers);
      } catch (e) {
        console.log(e);
        props.setError(e);
      }
    };
    getTransactions();
    getTransfers();
    props.setIsLoading(false);
  }, []);

  const handleOnCreateTransaction = async () => {
    props.setIsCreating(true);
    try {
      let response = await axios.post(
        "http://localhost:3001/bank/transactions",
        ...props.newTransactionForm
      );
      let responseData = response.data.transaction;
      console.log(responseData);
      console.log(props.transactions);
      props.setTransactions(props.transactions.push(responseData));
      props.setNewTransactionForm({
        category: "",
        description: "",
        amount: 0,
      });
      console.log(props.transactions);
    } catch (error) {
      props.setError(error);
      props.setIsCreating(false);
    }

    props.setIsCreating(false);
  };

  return (
    <div className="home">
      <AddTransaction
        setNewTransactionForm={props.setNewTransactionForm}
        setTransactions={props.setTransacions}
        setError={props.setError}
        handleOnSubmit={handleOnCreateTransaction}
        setForm={props.setNewTransactionForm}
        form={props.newTransactionForm}
        isCreating={props.isCreating}
        setIsCreating={props.setIsCreating}
      />
      {props.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <BankActivity
          transactions={filteredTransactions}
          transfers={props.transfers}
        />
      )}

      {props.error ? <h2 className="error">{props.error}</h2> : null}
    </div>
  );
}
