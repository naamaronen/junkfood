import React, { Component } from "react";
import {
  Form,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  FormGroup
} from "reactstrap";
import { connect } from "react-redux";
import { addReview } from "../actions/reviewAction";
import StarRatingComponent from "react-star-rating-component";

class ReviewModal extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      userReview: "",
      restaurantReview: null,
      restaurantName: "",
      BathroomQuality: null,
      StaffKindness: null,
      Cleanliness: null,
      DriveThruQuality: null,
      DeliverySpeed: null,
      FoodQuality: null,
      picture: ""
    };
  }

  componentDidUpdate() {
    StarRatingComponent;
  }

  onStarClick1(nextValue, prevValue, name) {
    this.setState({ BathroomQuality: nextValue });
  }
  onStarClick2(nextValue, prevValue, name) {
    this.setState({ StaffKindness: nextValue });
  }
  onStarClick3(nextValue, prevValue, name) {
    this.setState({ Cleanliness: nextValue });
  }
  onStarClick4(nextValue, prevValue, name) {
    this.setState({ DriveThruQuality: nextValue });
  }
  onStarClick5(nextValue, prevValue, name) {
    this.setState({ DeliverySpeed: nextValue });
  }
  onStarClick6(nextValue, prevValue, name) {
    this.setState({ FoodQuality: nextValue });
  }

  toggle = () => {
    const { user } = this.props.auth;
    this.setState({
      userReview: user
    });
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const averageRate =
      (this.state.BathroomQuality +
        this.state.StaffKindness +
        this.state.Cleanliness +
        this.state.DriveThruQuality +
        this.state.DeliverySpeed +
        this.state.FoodQuality) /
      6;
    const newReview = {
      userReview: this.state.userReview,
      restaurantReview: null,
      restaurantName: "mcdonalds", ///how to attach the restaurnat name
      BathroomQuality: this.state.BathroomQuality,
      StaffKindness: this.state.StaffKindness,
      Cleanliness: this.state.Cleanliness,
      DriveThruQuality: this.state.DriveThruQuality,
      DeliverySpeed: this.state.DeliverySpeed,
      FoodQuality: this.state.FoodQuality,
      picture: this.state.picture,
      averageRate: averageRate
    };
    //Add restaurant via ADD_REVIEW sction
    this.props.addReview(newReview);

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
          Add Review
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Hi {this.state.userReview}, Add a new Review
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <h2>{this.state.restaurantName}</h2>
                <h5>Bathroom Quality: {this.state.BathroomQuality}</h5>
                <StarRatingComponent
                  name="BathroomQuality"
                  starCount={5}
                  value={this.state.BathroomQuality}
                  onStarClick={this.onStarClick1.bind(this)}
                />
                <h5>Staff Kindness: {this.state.StaffKindness}</h5>
                <StarRatingComponent
                  name="StaffKindness"
                  starCount={5}
                  value={this.state.StaffKindness}
                  onStarClick={this.onStarClick2.bind(this)}
                />
                <h5>Cleanliness: {this.state.Cleanliness}</h5>
                <StarRatingComponent
                  name="Cleanliness"
                  starCount={5}
                  value={this.state.Cleanliness}
                  onStarClick={this.onStarClick3.bind(this)}
                />
                <h5>DriveThru Quality: {this.state.DriveThruQuality}</h5>
                <StarRatingComponent
                  name="DriveThruQuality"
                  starCount={5}
                  value={this.state.DriveThruQuality}
                  onStarClick={this.onStarClick4.bind(this)}
                />
                <h5>Delivery Speed: {this.state.DeliverySpeed}</h5>
                <StarRatingComponent
                  name="DeliverySpeed"
                  starCount={5}
                  value={this.state.DeliverySpeed}
                  onStarClick={this.onStarClick5.bind(this)}
                />
                <h5>Food Quality: {this.state.FoodQuality}</h5>
                <StarRatingComponent
                  name="FoodQuality"
                  starCount={5}
                  value={this.state.FoodQuality}
                  onStarClick={this.onStarClick6.bind(this)}
                />

                <Button color="dark" style={{ marginBottom: "2rem" }} block>
                  Add Review
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = () => dispatch => {
  //addReview;
  return {
    addReview: review => {
      dispatch(addReview(review));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewModal);
