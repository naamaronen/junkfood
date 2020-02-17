import React, { Component, Fragment } from "react";
import {
  Jumbotron,
  Button,
  FormGroup,
  Form,
  Col,
  CardDeck,
  Card,
  Label,
  Input,
  CardImg,
  CardBody,
  CardText,
  Container,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import { updateProfile, uploadPicture } from "../../actions/userActions";
import AppNavBar from "../AppNavBar";
import StarRatingComponent from "react-star-rating-component";

export class Profile extends Component {
  state = {
    userProfile: null,
    username: "",
    fullName: "",
    location: "",
    picture: null,
    reviews: [],
    newFullName: "",
    newLocation: "",
    newPicture: null
  };

  componentDidMount() {
    const { userProfile } = this.props.user;
    const { fullName, reviews, location, username, picture } = userProfile;
    this.setState({ userProfile: userProfile });
    this.setState({ fullName: fullName });
    this.setState({ location: location });
    this.setState({ username: username });
    this.setState({ picture: picture });
    this.setState({ reviews: reviews });
    this.setState({ newFullName: fullName });
    this.setState({ newLocation: location });
    this.setState({ newPicture: picture });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      username,
      picture,
      fullName,
      location,
      newLocation,
      newFullName,
      newPicture
    } = this.state;
    var user = { username, picture, fullName, location };
    if (fullName != newFullName) user.fullName = newFullName;
    if (location != newLocation) user.location = newLocation;
    if (picture != newPicture) { user.picture = newPicture;
    };
    //Update user
    this.props.updateProfile(user);
  };

  uploadImage = e => {
    let pic = new FormData();
    pic.append("imageData", e.target.files[0]);
    this.props.uploadPicture(pic);
    this.setState({ newPicture: URL.createObjectURL(e.target.files[0])});
  };

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <AppNavBar />
        <div>
          <Jumbotron>
            <h3 className="profile">{`Hello, ${this.state.username}`}</h3>
            <p>you can watch and edit your profile here!</p>

            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="fullName">Full Name</Label>
                <Input
                  type="text"
                  name="newFullName"
                  id="fullName"
                  placeholder={`${this.state.fullName}`}
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="newLocation"
                  id="location"
                  placeholder={`${this.state.location}`}
                  className="mb-3"
                  onChange={this.onChange}
                />

                <img src={this.state.newPicture}/>
                <Input
                  type="file"
                  name="newPicture"
                  id="picture"
                  accept="image/*"
                  onChange={this.uploadImage}
                />
                <Button color="dark" style={{ marginBottom: "2rem" }} block>
                  Save Changes
                </Button>
              </FormGroup>
            </Form>
          </Jumbotron>

          <div>
            <div>
              <h3>Your Reviews</h3>
            </div>
            <Container>
              <CardDeck className="reviews-list">
                {this.state.reviews.map(
                  ({
                    rates,
                    restaurantName,
                    stringDate,
                    _id,
                    picture,
                    averageRate
                  }) => {
                    const {
                      BathroomQuality,
                      StaffKindness,
                      Cleanliness,
                      DriveThruQuality,
                      DeliverySpeed,
                      FoodQuality
                    } = rates;
                    return (
                      <Col sm="4" key={_id}>
                        <Card
                          key={_id}
                          outline
                          color="danger"
                          className="text-center"
                        >
                          <CardImg top width="100%" src={picture} />
                          <CardBody>
                            <h5 className="card-title">{restaurantName}</h5>
                            <CardText></CardText>
                            <CardText>
                              <small className="text-muted">{`review date: ${stringDate}`}</small>
                            </CardText>
                            <Row>
                              <Col>
                                <h6>Average Score</h6>
                              </Col>
                              <Col>
                                <StarRatingComponent
                                  name="average"
                                  starCount={5}
                                  editing={false}
                                  value={averageRate}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h6>BathroomQuality</h6>
                              </Col>
                              <Col>
                                <StarRatingComponent
                                  name="BathroomQuality"
                                  starCount={5}
                                  editing={false}
                                  value={BathroomQuality}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h6>StaffKindness</h6>
                              </Col>
                              <Col>
                                <StarRatingComponent
                                  name="StaffKindness"
                                  starCount={5}
                                  editing={false}
                                  value={StaffKindness}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h6>Cleanliness</h6>
                              </Col>
                              <Col>
                                <StarRatingComponent
                                  name="Cleanliness"
                                  starCount={5}
                                  editing={false}
                                  value={Cleanliness}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h6>DriveThruQuality</h6>
                              </Col>
                              <Col>
                                <StarRatingComponent
                                  name="DriveThruQuality"
                                  starCount={5}
                                  editing={false}
                                  value={DriveThruQuality}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h6>DeliverySpeed</h6>
                              </Col>
                              <Col>
                                <StarRatingComponent
                                  name="DeliverySpeed"
                                  starCount={5}
                                  editing={false}
                                  value={DeliverySpeed}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <h6>FoodQuality</h6>
                              </Col>
                              <Col>
                                <StarRatingComponent
                                  name="FoodQuality"
                                  starCount={5}
                                  editing={false}
                                  value={FoodQuality}
                                />
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </Col>
                    );
                  }
                )}
              </CardDeck>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = () => dispatch => {
  return {
    updateProfile: user => {
      dispatch(updateProfile(user));
    },
    uploadPicture: pic => {
      dispatch(uploadPicture(pic));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
