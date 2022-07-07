// import * as React from "react";
// import { formatAmount, formatDate } from "../../utils/format";
// import "./TransactionDetail.css";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export default function TransactionDetail() {
//   const [hasFetched, setHasFetched] = useState(false);
//   const [transaction, setTransacion] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   let { transactionId } = useParams(null);

//   if (transactionId) {
//     null;
//   } else {
//     return (
//       <div className="card-header">
//         <h3>Transaction #{transactionId}</h3>
//         <h1>Not Found</h1>
//       </div>
//     );
//   }

//   useEffect(() => {
//     const fetchTransactionById = async () => {
//       setIsLoading(true);
//       setHasFetched(false);
//       let url = `http://localhost:3001/bank/transactions/` + transactionId;

//       try {
//         let response = await axios.get(url);
//         setTransaction(response.data.transaction);
//       } catch (e) {
//         console.log(e);
//         setError(e);
//         setIsLoading(false);
//         setHasFetched(true);
//       }
//       setIsLoading(false);
//       setHasFetched(true);
//     };

//     fetchTransactionById();
//   }, [transactionId]);

//   return (
//     <div className="transaction-detail">
//       <TransactionCard
//         transaction={transaction}
//         transactionId={transactionId}
//         isLoading={isLoading}
//         hasFetched={hasFetched}
//       />
//     </div>
//   );
// }

// export function TransactionCard({ transaction = {}, transactionId = null }) {
//   return (
//     <div className="transaction-card card">
//       <div className="card-header">
//         <h3>Transaction #{transactionId}</h3>
//         <p className="category">{transaction.category}</p>
//       </div>

//       <div className="card-content">
//         <p className="description">{transaction.description}</p>
//       </div>

//       <div className="card-footer">
//         <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>
//           {formatAmount(transaction.amount)}
//         </p>
//         <p className="date">{formatDate(transaction.postedAt)}</p>
//       </div>
//     </div>
//   ) : (
//     <div className="card-header">
//       <h3>Transaction #{transactionId}</h3>
//       <h1>Not Found</h1>
//     </div>
//   )}
//   </div>

//   ;
// }

import * as React from "react";
import { formatAmount, formatDate } from "../../utils/format";
import "./TransactionDetail.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function TransactionDetail() {
  const [hasFetched, setHasFetched] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let { transactionId } = useParams(null);

  if (transactionId) {
    null;
  } else {
    return (
      <div className="card-header">
        <h3>Transaction #{transactionId}</h3>
        <h1>Not Found</h1>
      </div>
    );
  }

  useEffect(() => {
    const fetchTransactionById = async () => {
      setIsLoading(true);
      setHasFetched(false);
      let url = `http://localhost:3001/bank/transactions/` + transactionId;

      try {
        let response = await axios.get(url);
        setTransaction(response.data.transaction);
      } catch (e) {
        console.log(e);
        setError(e);
        setIsLoading(false);
        setHasFetched(true);
      }
      setIsLoading(false);
      setHasFetched(true);
    };

    fetchTransactionById();
  }, [transactionId]);

  return (
    <div className="transaction-detail">
      <TransactionCard
        transaction={transaction}
        transactionId={transactionId}
        isLoading={isLoading}
        hasFetched={hasFetched}
      />
    </div>
  );
}

export function TransactionCard({ transaction, transactionId = null, error }) {
  return (
    <div>
      {transaction ? (
        <div className="transaction-card card">
          <div className="card-header">
            <h3>Transaction #{transactionId}</h3>
            <p className="category">{transaction.category}</p>
          </div>

          <div className="card-content">
            <p className="description">{transaction.description}</p>
          </div>

          <div className="card-footer">
            <p className={`amount ${transaction.amount < 0 ? "minus" : ""}`}>
              {formatAmount(transaction.amount)}
            </p>
            <p className="date">{formatDate(transaction.postedAt)}</p>
          </div>
        </div>
      ) : (
        <div className="card-header">
          <h3>Transaction #{transactionId}</h3>
          <h1>Not Found</h1>
        </div>
      )}
    </div>
  );
}
