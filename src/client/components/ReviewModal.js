import React, { Component } from "react";
import {
  Form,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Alert,
  Col
} from "reactstrap";
import { connect } from "react-redux";
import { addReview, updateReview } from "../actions/reviewAction";
import StarRatingComponent from "react-star-rating-component";
import Dropzone from "react-dropzone";

class ReviewModal extends Component {
  constructor() {
    super();
    this.state = {
      modal: false,
      user: "",
      restaurantName: "",
      BathroomQuality: 5,
      StaffKindness: 5,
      Cleanliness: 5,
      DriveThruQuality: 5,
      DeliverySpeed: 5,
      FoodQuality: 5,
      pictures: []
    };
  }

  /*componentDidUpdate() {
    StarRatingComponent;
  }*/

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
    if (isAuthenticated) {
      this.setState({
        user: user,
        modal: !this.state.modal
      });

      switch (this.props.type) {
        case "Add":
          this.setState({ restaurantName: this.props.rest_name });
          break;
        case "Update":
          const rates = this.props.review.rates;
          this.setState({
            _id: this.props.review._id,
            BathroomQuality: rates.BathroomQuality,
            StaffKindness: rates.StaffKindness,
            Cleanliness: rates.Cleanliness,
            DriveThruQuality: rates.DriveThruQuality,
            DeliverySpeed: rates.DeliverySpeed,
            FoodQuality: rates.FoodQuality,
            pictures: this.props.review.pictures,
            restaurantName: this.props.review.restaurantName
          });
          break;
      }
    } else {
      this.sendData();
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  loadImages = (files) => {
    this.setState({pictures: files})
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
    let newReview = new FormData();
    newReview.append("user", this.state.user);
    newReview.append("restaurantName", this.state.restaurantName);
    newReview.append("BathroomQuality", this.state.BathroomQuality);
    newReview.append("StaffKindness", this.state.StaffKindness);
    newReview.append("Cleanliness", this.state.Cleanliness);
    newReview.append("DriveThruQuality", this.state.DriveThruQuality);
    newReview.append("DeliverySpeed", this.state.DeliverySpeed);
    newReview.append("FoodQuality", this.state.FoodQuality);
    newReview.append("averageRate", averageRate.toString());
    for (const img of this.state.pictures) {
      newReview.append("pictures", img);
    }
    //Add restaurant via ADD_REVIEW sction
    switch (this.props.type) {
      case "Add":
        this.props.addReview(newReview);
        break;
      case "Update":
        this.props.updateReview(newReview);
        break;
    }

    //close modal
    this.toggle();
  };

  sendData = () => {
    this.props.parentCallback();
  };

  render() {
    const images = this.state.pictures.map(file => (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ));
    return (
      <div>
        <Button
          color="warning"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          {this.props.type} Review
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Hi {this.state.user}, {this.props.type} your Review
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
                <Dropzone
                  name="picture"
                  accept="image/*"
                  onDrop={this.loadImages}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div
                        {...getRootProps()}
                        style={{
                          border: "1px solid black",
                          width: 300,
                          color: "black",
                          padding: 20
                        }}
                      >
                        <input {...getInputProps()} />
                        <p>Drag images here, or click to select files</p>
                      </div>
                    </section>
                  )}
                </Dropzone>
                <aside>
                  <ul>{images}</ul>
                </aside>
                <Button color="warning" style={{ marginBottom: "2rem" }} block>
                  {this.props.type} Review
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
    addReview: review => {
      dispatch(addReview(review));
    },
    updateReview: review => {
      dispatch(updateReview(review));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewModal);
