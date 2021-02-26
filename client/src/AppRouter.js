import React from "react";

import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Main from "./pages/Main";
import Contract from "./pages/Contract";
import Loading from "./pages/Loading";

const AppRouter = ({ account, transactions, web3error }) => {
  if (!account || !transactions) {
    return <Loading web3error={web3error} />;
  }

  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Main transactions={transactions} />}
        />
        <Route
          path="/:index"
          render={({
            match: {
              params: { index },
            },
          }) => <Contract transactions={transactions && transactions[index]} />}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
