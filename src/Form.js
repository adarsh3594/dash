import React from "react";
import firebase from "./firebase";
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Button,
  Chip,
  Avatar,
  InputAdornment as IA
} from "@material-ui/core";

import "./styles.css";

let db = firebase.database();

let productRef = db.ref("/products/");
let storageRef = firebase.storage().ref();
let imageRef = storageRef.child("images");

let initialState = {
  name: "",
  brand: "",
  price: 1,
  mrp: 1,
  size: "",
  sizes: [],
  image: "",
  availability: 1,
  infos: [{ name: "About", value: "some about text" }],
  infoName: "",
  infoVal: ""
};

class Form extends React.Component {
  state = initialState;
  handleDelete = data => {
    let sizes = [...this.state.sizes];
    sizes.splice(sizes.indexOf(data), 1);
    this.setState({ sizes });
  };
  addInfo = () => {
    let info = { name: this.state.infoName, value: this.state.infoVal };
    let { infos } = this.state;
    infos = [...infos, info];
    // let newInfos = infos.slice().push(info);
    this.setState({ infos, infoName: "", infoVal: "" });
  };

  handleSubmit = async () => {
    try {
      let imgRef = imageRef.child("img" + Date.now() + ".png");
      let uploadTask = await imgRef.putString(this.state.image, "data_url");
      let imageURL = await uploadTask.ref.getDownloadURL();
      console.log(imageURL);
      //   let result = await productRef.set({
      //     ...this.state,
      //     image: ""
      //   });
      //   console.log(result);
      this.resetState();
    } catch (e) {
      console.log(e);
    }
  };
  resetState = () => {
    this.setState(initialState);
  };
  handleSizeAddition = () => {
    let sizes = [
      ...this.state.sizes,
      {
        availability: this.state.availability,
        size: this.state.size,
        key: this.state.sizes.length,
        price: this.state.price,
        mrp: this.state.mrp
      }
    ];
    this.setState({ sizes, size: "", availability: 0, mrp: 0, price: 0 });
  };
  handleInfoDelete = info => {
    let infos = [...this.state.infos];
    infos.splice(infos.indexOf(info), 1);
    this.setState({ infos });
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleFile = e => {
    let image = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = e => {
      this.setState({ image: e.target.result });
    };
    fileReader.readAsDataURL(image);
  };

  render() {
    const {
      infoVal,
      size,
      name,
      brand,
      price,
      mrp,
      availability,
      infoName
    } = this.state;

    return (
      <form
        style={{ marginBottom: 20, padding: "0 50px", maxWidth: 600 }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Name"
          onChange={this.handleChange("name")}
          value={name}
          fullWidth
          margin="normal"
        />
        <TextField
          value={brand}
          onChange={this.handleChange("brand")}
          label="Brand"
          fullWidth
          margin="normal"
        />

        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            style={{ marginRight: 10 }}
            label="Size"
            value={size}
            onChange={this.handleChange("size")}
            margin="normal"
            onKeyUp={e => {
              e.preventDefault();
              if (e.keyCode === 13) {
                this.handleSizeAddition();
              }
            }}
          />
          <TextField
            style={{ marginRight: 10 }}
            label="Availability"
            type="number"
            margin="normal"
            value={availability}
            onChange={this.handleChange("availability")}
            onKeyUp={e => {
              e.preventDefault();
              if (e.keyCode === 13) {
                this.handleSizeAddition();
              }
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            style={{ marginRight: 10 }}
            label="Price"
            type="number"
            margin="normal"
            value={price}
            onChange={this.handleChange("price")}
            onKeyUp={e => {
              e.preventDefault();
              if (e.keyCode === 13) {
                this.handleSizeAddition();
              }
            }}
          />
          <TextField
            style={{ marginRight: 10 }}
            label="MRP"
            type="number"
            margin="normal"
            value={mrp}
            onChange={this.handleChange("mrp")}
            onKeyUp={e => {
              e.preventDefault();
              if (e.keyCode === 13) {
                this.handleSizeAddition();
              }
            }}
          />
          <Button
            onClick={e => {
              this.handleSizeAddition();
            }}
            variant="outlined"
            color="primary"
          >
            Add Size
          </Button>
        </div>
        {this.state.sizes.map(size => {
          return (
            <Chip
              key={size.key}
              label={size.size}
              color="primary"
              onDelete={this.handleDelete}
              avatar={<Avatar>{size.availability}</Avatar>}
            />
          );
        })}

        <div>
          <TextField
            label="Info Name"
            type="text"
            fullWidth
            margin="normal"
            value={infoName}
            onChange={this.handleChange("infoName")}
          />
          <TextField
            id="standard-multiline-flexible"
            label="Info"
            multiline
            rows="4"
            value={infoVal}
            onChange={this.handleChange("infoVal")}
            margin="normal"
            fullWidth
          />
          <Button
            onClick={e => {
              e.preventDefault();
              this.addInfo();
            }}
            variant="outlined"
            color="primary"
          >
            Add Info
          </Button>
          {this.state.infos.map(info => {
            return (
              <div key={info.name}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography variant="h5">{info.name}</Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={e => {
                      e.preventDefault();
                      this.handleInfoDelete(info);
                    }}
                  >
                    Delete
                  </Button>
                </div>
                <Typography variant="subtitle2">{info.value}</Typography>
              </div>
            );
          })}
        </div>
        <TextField
          label="Image"
          onChange={this.handleFile}
          fullWidth
          type="file"
          margin="normal"
        />
        {
          //   <FormControl fullWidth>
          //   <InputLabel htmlFor="price">Price</InputLabel>
          //   <Input
          //     id="price"
          //     onChange={this.handleChange("price")}
          //     type="number"
          //     startAdornment={<IA position="start">$</IA>}
          //   />
          // </FormControl>
        }
        <Button variant="outlined" onClick={this.handleSubmit} color="primary">
          Submit
        </Button>
      </form>
    );
  }
}

export default Form;
