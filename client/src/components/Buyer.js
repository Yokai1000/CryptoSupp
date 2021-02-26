import React, { useState, useEffect } from "react";
import "./Buyer.scss";
import Button from "./Button";
import { getAccount } from "../contracts";

const Buyer = ({ transactions, contractState }) => {
  const [pricing, setPricing] = useState({});
  const [attributes, setAddr] = useState({});
  useEffect(() => {
    (async () => {
      if (transactions) {
        const price = await transactions.methods.price().call();
        const addrEstate = await transactions.methods.homeAddress().call();
        setPricing({ price });
        setAddr({ addrEstate });
      }
    })();
  }, [transactions]);
  const sign = async () => {
    const from = await getAccount();
    transactions.methods.buyerSignContractAndPay().send({ from });
  };
  return (
    <div className="Buyer">
      {contractState == null && <p>Loading...</p>}
      {contractState != null && contractState === 1 && (
        <>
          <p>Sign estate and pay</p>
          <div>
            <Button className="Buyer-signBtn" onClick={() => sign()}>
              Sign
            </Button>
          </div>
        </>
      )}
      {contractState != null && contractState > 1 && <p>Deposit is payed</p>}
      <p>price: {pricing.price || "-"} eth</p>
      <p> Address : {attributes.addrEstate || "-"}</p>
    </div>
  );
};

export default Buyer;
