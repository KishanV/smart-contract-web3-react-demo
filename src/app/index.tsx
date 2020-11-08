import React = require("react");
import "./index.scss";
import { hot } from "react-hot-loader/root";
import { Provider } from "react-redux";
import { appStore } from "../reducers";
import { HashRouter, Route, Switch } from "react-router-dom"; 

export type AppState = {};

class App extends React.Component<any, AppState> {
  state: AppState = {
    isAdded: false,
  };

  render() {
    return (
      <>
        <div className={"app"}>
          
        </div>
         
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
