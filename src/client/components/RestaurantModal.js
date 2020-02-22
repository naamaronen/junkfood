import React, { Component } from "react";
import {
  Form,
  Modal,
  Input,
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label, Alert
} from "reactstrap";
import {addRest, clearRestSuccessStatus} from "../actions/restaurantAction";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { connect } from "react-redux";

class RestaurantModal extends Component {
  state = {
    modal: false,
    name: "",
    location: "",
    error:""
  };
  //autocomplete = new google.maps.places.Autocomplete();
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
    this.props.clearStatus();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onlocChange = address => {
    this.setState({ location: address});
    /*geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => this.setState({geoLocation:latLng }))
        .catch(error =>  this.setState({error:error }));
        */
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
    //this.toggle();
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
                <PlacesAutocomplete onChange={this.onlocChange} value={this.state.location}>
                  {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <input
                            {...getInputProps({
                              placeholder: 'Add Restaurant location',
                              className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {className}, style)}
                                >
                                  <span>{suggestion.description}</span>
                                </div>
                            );})}</div></div>
                  )}
                </PlacesAutocomplete>
                <Button color="dark" style={{ marginBottom: "2rem" }} block>
                  Add Restaurant
                </Button>
              </FormGroup>
            </Form>
            {this.props.error ? (
                <Alert color="danger">{this.props.error}</Alert>
            ) : ""}
            {this.props.success ? (
                <Alert color="success">{"Restaurant added successfully"}</Alert>
            ) : ""}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.restaurant.error,
    success: state.restaurant.addSuccess
  }
}

const mapDispatchToProps = () => dispatch => {
  //addRest;
  return {
    addRest: restaurant => {
      dispatch(addRest(restaurant));
    },
    clearStatus: () => {
      dispatch(clearRestSuccessStatus());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantModal);
