import React from "react";
let mapping = {
  name: "Name",
  price: "Price",
  quantity: "Qty",
  id: "Id"
};

const calcTotal = arr => {
  let sum = arr.reduce((acc, val) => {
    return val.price * val.quantity + acc;
  }, 0);
  return sum;
};
export default class ReceiptTable extends React.Component {
  render() {
    const { cart } = this.props;
    if (!cart.length) return <p>Please add some items to generate Receipt</p>;
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              {Object.keys(cart[0]).map(name => {
                return (
                  <th key={name} scope="col">
                    {mapping[name]}
                  </th>
                );
              })}
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => {
              return (
                <tr key={item.name}>
                  <th scope="row">{item.name}</th>
                  <td>Rs {item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button className="btn btn-info">
                      <i className="fas fa-trash" />
                    </button>
                  </td>
                </tr>
              );
            })}
            <tr className="bg-primary" style={{ color: "#fff" }}>
              <th scope="row">Total</th>
              <td />
              <td />
              <th className="bg-primary">Rs {calcTotal(cart)}</th>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-block btn-success">Order</button>
      </React.Fragment>
    );
  }
}
