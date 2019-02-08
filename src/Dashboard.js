import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import firebase from "./firebase";
let db = firebase.firestore();

class DashBoard extends React.Component {
  state = {
    data: [],
    isReady: false,
    name: "",
    price: "",
    disabled: false,
    cart: [],
    routeList: ["home"],
    route: "add"
  };

  async componentDidMount() {
    let data = [];
    let result = await db.collection("products").get();
    result.forEach(doc => {
      data.push(doc.data());
    });
    this.setState({ data, isReady: true });
  }

  handleProductAddition = async () => {
    this.setState({ disabled: true });
    let collection = db.collection("products");
    let result = await collection.add({
      name: this.state.name,
      price: Number(this.state.price)
    });
    this.setState({ disabled: false, name: "", price: "" });
    console.log(result);
  };
  handleInputChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  renderBody = () => {
    const { route, data } = this.state;

    switch (route) {
      case "add":
        return <AddProduct />;
      case "list":
        return <ProductList data={data} />;
      default:
        return <ProductList data={data} />;
    }
  };

  render() {
    const { isReady, disabled } = this.state;

    return (
      <div className="container">
        <h2 className="my-4 text-uppercase" style={{ color: "#fff" }}>
          DashBoard
        </h2>
        <div className="row">
          <div className="col-sm-12 mb-4">
            <div
              className="dashconatainer"
              style={{ backgroundColor: "#fff", borderRadius: 3, padding: 15 }}
            >
              <h5 className="text-muted mb-3">Products</h5>
              <div className="form-group">
                <input
                  placeholder="Search"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-row align-items-center">
                <div className="col-xs-1 mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={this.state.name}
                    disabled={disabled}
                    onChange={this.handleInputChange("name")}
                  />
                </div>
                <div className="col-xs-1 mb-3">
                  <input
                    type="number"
                    value={this.state.price}
                    className="form-control"
                    placeholder="Price"
                    value={this.state.price}
                    disabled={disabled}
                    onChange={this.handleInputChange("price")}
                  />
                </div>
                <div className="col-xs-1 mb-3">
                  <input
                    type="button"
                    className="btn btn-primary"
                    value="Add"
                    disabled={disabled}
                    onClick={this.handleProductAddition}
                  />
                </div>
              </div>

              {this.renderBody()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles({})(DashBoard);
