import React, { Component } from "react";
import {
  Form,
  Modal,
  Input,
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label
} from "reactstrap";
import { addRest } from "../actions/restaurantAction";

import { connect } from "react-redux";

class RestaurantModal extends Component {
  state = {
    modal: false,
    name: "",
    location: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newRest = {
      name: this.state.name,
      location: this.state.location
    };
    //Add restaurant via ADD_REST sction
    this.props.addRest(newRest);

    //close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Restaurant
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add a new restaurant</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="restaurant">Restaurant</Label>
                <Input
                  type="text"
                  name="name"
                  id="restaurant_name"
                  placeholder="Add Restaurant name"
                  onChange={this.onChange}
                />
                <Label for="Location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="restaurant_location"
                  placeholder="Add Restaurant location"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginBottom: "2rem" }} block>
                  Add Restaurant
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapDispatchToProps = () => dispatch => {
  //addRest;
  return {
    addRest: restaurant => {
      dispatch(addRest(restaurant));
    }
  };
};

export default connect(null, mapDispatchToProps)(RestaurantModal);
