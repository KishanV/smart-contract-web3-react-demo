import React = require("react");
import "./index.scss";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { appStore } from "../reducers";
import { HashRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/home";
import { AddCitizen } from "../pages/add-citizen";
import Note from "../pages/note";

export type AppState = {};

class App extends React.Component<any, AppState> {
  state: AppState = {
    isAdded: false,
  };

  render() {
    return (
      <>
        <div className={"app"}>
          <Home />
        </div>
        <Switch>
          <Route path="/add-citizen" component={AddCitizen} />
          <Route path="/note" component={Note} />
        </Switch>
      </>
    );
  }
}

export default hot(() => {
  return (
    <Provider store={appStore}>
      <HashRouter>
        <Route path="/" component={App} />
      </HashRouter>
    </Provider>
  );
});
