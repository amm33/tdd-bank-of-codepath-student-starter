import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransactionDetail from "../TransactionDetail/TransactionDetail";
import { useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transfer, setTransfer] = useState([]);
  const [error, setError] = useState("");
  const [filterInputValue, setFilterInputValue] = useState("");

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar
          filterInputValue={filterInputValue}
          setFilterInputValue={setFilterInputValue}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/transactions:transactionId"
              element={<TransactionDetail />}
            ></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
