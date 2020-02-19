import React, { Component } from "react";
import {
  Form,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { updateReview } from "../actions/reviewAction";
import StarRatingComponent from "react-star-rating-component";

class UpdateReview extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      user: "",
      restaurantName: "",
      BathroomQuality: null,
      StaffKindness: null,
      Cleanliness: null,
      DriveThruQuality: null,
      DeliverySpeed: null,
      FoodQuality: null,
      picture: "",
      _id: null
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
    const { user, isAuthenticated } = this.props.auth;
    const {
      rates,
      restaurantName,
      stringDate,
      _id,
      picture,
      averageRate
    } = this.props.review;
    const {
      BathroomQuality,
      StaffKindness,
      Cleanliness,
      DriveThruQuality,
      DeliverySpeed,
      FoodQuality
    } = rates;
    if (isAuthenticated) {
      this.setState({
        user: user
      });
      this.setState({
        modal: !this.state.modal
      });

      this.setState({ restaurantName: restaurantName });
      this.setState({ _id: _id });
      this.setState({ BathroomQuality: BathroomQuality });
      this.setState({ StaffKindness: StaffKindness });
      this.setState({ Cleanliness: Cleanliness });
      this.setState({ DriveThruQuality: DriveThruQuality });
      this.setState({ DeliverySpeed: DeliverySpeed });
      this.setState({ FoodQuality: FoodQuality });
      this.setState({ picture: picture });
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const averageRate = Math.floor(
      (this.state.BathroomQuality +
        this.state.StaffKindness +
        this.state.Cleanliness +
        this.state.DriveThruQuality +
        this.state.DeliverySpeed +
        this.state.FoodQuality) /
        6
    );
    const newReview = {
      user: this.state.user,
      restaurantName: this.state.restaurantName,
      BathroomQuality: this.state.BathroomQuality,
      StaffKindness: this.state.StaffKindness,
      Cleanliness: this.state.Cleanliness,
      DriveThruQuality: this.state.DriveThruQuality,
      DeliverySpeed: this.state.DeliverySpeed,
      FoodQuality: this.state.FoodQuality,
      picture: this.state.picture,
      averageRate: averageRate,
      _id: this.state._id
    };

    this.props.updateReview(newReview);

    //close modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button color="warning" onClick={this.toggle}>
          Edit Review
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Hi {this.state.user}, Update your Review
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <h4>{this.state.restaurantName}</h4>
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

                <Button color="warning" style={{ marginBottom: "2rem" }} block>
                  Update Review
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
  return {
    updateReview: review => {
      dispatch(updateReview(review));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateReview);
