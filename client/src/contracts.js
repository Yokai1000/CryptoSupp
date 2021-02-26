import Web3 from "web3";
import * as Estate from "./contracts/Estate.json";
import Transaction from "./contracts/Transaction.json";

const web3 = new Web3(window.ethereum);

export const estate = new web3.eth.Contract(
  Estate.abi,
  "0xb7f005039dd4d04f2ee00e52f38f704f88259ba6"
);

export const getAccount = async () => (await web3.eth.getAccounts())[0];

export const getTransactions = async () =>
  (await estate.methods.getInstances().call()).map(
    (contract) => new web3.eth.Contract(Transaction.abi, contract)
  );
