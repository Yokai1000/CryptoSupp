import React, { useState, useEffect } from "react";
import { Route, Link, useParams } from "react-router-dom";
import cx from "classnames";
import "./Contract.scss";
import Seller from "../components/Seller";
import Buyer from "../components/Buyer";

const timeline = [
  { text: "Contract created" },
  { text: "Seller sign contract" },
  { text: "Buyer sign and pay" },
];

export default function Contract({ transactions }) {
  const { index } = useParams();
  const [progress, setProgress] = useState(10);
  const [contractState, setContractState] = useState(null);
  const [timelineProgress, setTimelineProgress] = useState(1);

  const updateProgress = (index) => {
    const percent = index / timeline.length;

    setProgress(Math.min(percent * 100, 100));
    setTimelineProgress(index);
  };

  useEffect(() => {
    (async () => {
      if (transactions) {
        const res = await transactions.methods.contractState().call();
        setContractState(parseInt(res, 10));
      }
    })();
  }, [transactions]);

  useEffect(() => {
    updateProgress(parseInt(contractState, 10) + 1);
  }, [contractState]);

  return (
    <div className="ContractPage">
      <div className="ContractPage-body">
        <h1>Estate</h1>
        <span className="ContractPage-addr">
          {transactions && transactions.options.address}
        </span>
        <Route
          exact
          path="/:addr"
          render={() => (
            <div className="Contract-tabs">
              <Link to={`/${index}/buyer`}>Buyer</Link>
              <Link to={`/${index}/seller`}>Seller</Link>
              <Link to={`/${index}/coop`}>Co-op</Link>
            </div>
          )}
        />
        <Route
          path="/:addr/buyer"
          render={() => (
            <Buyer transactions={transactions} contractState={contractState} />
          )}
        />
        <Route
          path="/:addr/seller"
          render={() => (
            <Seller contractState={contractState} instance={transactions} />
          )}
        />
        <div className="Timeline">
          {timeline.map((point, i) => (
            <div
              className={cx("Timeline-point", {
                done: timelineProgress > i,
                "in-progress": timelineProgress === i,
                reject: contractState === 5,
              })}
            >
              {i + 1}. {point.text}
            </div>
          ))}
          {contractState === 5 && (
            <div className={cx("Timeline-point failed")}>
              Contract rejected.
            </div>
          )}
        </div>
        <div className="ProgressBar-container">
          <div className="ProgressBar-background"></div>
          <div
            className={cx("ProgressBar-progress", {
              reject: contractState === 5,
            })}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
