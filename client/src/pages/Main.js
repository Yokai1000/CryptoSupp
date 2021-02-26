import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Main.scss";
import { estate, getAccount } from "../contracts";
import Button from "../components/Button";

const Transaction = ({ transaction, index, form }) => {
  console.log("transaction", transaction);
  return (
    <Link to={`/${index}`} key={index}>
      <div className="Contract">
        <div className="Contract-content">
          <div className="Contract-contentTitle">{`Estate N- #${index}`}</div>
          <span className="Contract-contentObject">
            {transaction.options.address}
          </span>
        </div>
        <span className="Contract-addr">{transaction.options.address}</span>
      </div>
    </Link>
  );
};

const Main = ({ contracts, transactions }) => {
  const [form, setForm] = useState({});

  const createContract = async () => {
    const from = await getAccount();
    estate.methods
      .create(form.address, form.zip, form.city, form.price, form.buyer)
      .send({ from });
  };

  return (
    <div className="Main">
      <h1>Crypto Sup</h1>
      <h1 className="Main-title">Estate</h1>{" "}
      <div>
        <p>Enter the home details of the estate</p>
        <div class="Contract-form">
          <input
            className="Contract-formInput"
            placeholder="Address"
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            value={form.address}
          />
          <input
            className="Contract-formInput"
            placeholder="Zip"
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
            value={form.zip}
          />
          <input
            className="Contract-formInput"
            placeholder="City"
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            value={form.city}
          />
          <input
            className="Contract-formInput"
            placeholder="Price"
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            value={form.price}
          />
          <input
            className="Contract-formInput"
            placeholder="Buyer address"
            onChange={(e) => setForm({ ...form, buyer: e.target.value })}
            value={form.buyer}
          />
        </div>
        <Button className="Contract-createBtn" onClick={() => createContract()}>
          Create contract
        </Button>
      </div>
      <div className="Contracts">
        {transactions &&
          transactions.map((transaction, index) => (
            <Transaction transaction={transaction} index={index} />
          ))}
      </div>
    </div>
  );
};

export default Main;
