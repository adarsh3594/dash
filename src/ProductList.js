import React from "react";
import Spinner from "./Spinner";

let list = ["#", "Name", "Price", "Qty", "Actions"];

export default class ProductList extends React.Component {
  render() {
    const { data } = this.props;
    if (!data.length) return <Spinner />;
    return (
      <table className="table">
        <thead>
          <tr>
            {list.map(name => {
              return (
                <th key={name} scope="col">
                  {name}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, id) => {
            return (
              <tr key={item.id}>
                <th scope="row" style={{ textTransform: "capitalize" }}>
                  {id + 1}
                </th>
                <td>{item.name}</td>
                <td>Rs {item.price}</td>
                <td>
                  <input
                    style={{ width: 50 }}
                    type="text"
                    className="form-control"
                  />
                </td>
                <td>
                  <button className="btn btn-danger mr-2 mb-2">
                    <i className="fas fa-plus" />
                  </button>
                  <button className="btn btn-success mr-2 mb-2">
                    <i className="fas fa-pen" />
                  </button>
                  <button className="btn btn-info mr-2 mb-2">
                    <i className="fas fa-trash" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
