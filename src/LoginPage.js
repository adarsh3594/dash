import React from "react";
import { withStyles } from "@material-ui/core/styles";

class LoginPage extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="mx-auto" style={{ width: 400, marginTop: "6rem" }}>
          <h2 style={{ color: "white", textAlign: "center" }} className="mb-4">
            Login to Dash
          </h2>
          <form style={{ backgroundColor: "#fff", padding: 20 }}>
            <div className="form-group">
              <label htmlFor="username">Usernname</label>
              <input type="text" className="form-control" id="username" />
              <small className="form-text text-muted">It is Confidential</small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="remember"
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button className="btn btn-success btn-block">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withStyles({})(LoginPage);
