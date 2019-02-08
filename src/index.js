import React from "react";
import ReactDOM from "react-dom";
import LoginPage from "./LoginPage";
import DashBoard from "./Dashboard";
import firebase from "./firebase";

class App extends React.Component {
  render() {
    return <DashBoard />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
