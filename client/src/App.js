import React, { useState, useEffect } from "react";

import AppRouter from "./AppRouter.js";
import { getAccount, getTransactions } from "./contracts";

import "./App.css";

const App = () => {
  const [state, setState] = useState({
    account: null,
    transactions: null,
    web3error: null,
  });
  useEffect(() => {
    const exec = async () => {
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
      } catch (error) {
        console.error("FAIL");
      }

      try {
        const account = await getAccount();
        const transactions = await getTransactions();
        setState({ transactions, account });
      } catch (e) {
        setState({ web3error: e });
      }
    };

    exec();
  }, []);

  const { account, transactions, web3error } = state;

  return (
    <AppRouter
      account={account}
      transactions={transactions}
      web3error={web3error}
    />
  );
};

export default App;
