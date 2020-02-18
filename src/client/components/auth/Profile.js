import React, { Component, Fragment } from "react";
import Dropzone from 'react-dropzone';
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
import { updateProfile } from "../../actions/userActions";
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
    newPicture: null,
    loadedPicture: null
  };

  componentDidMount() {
    const { userProfile } = this.props.user;
    const { fullName, reviews, location, username, picture } = userProfile;
    this.setState({
      userProfile: userProfile,
      fullName: fullName,
      location: location,
      username: username,
      picture: picture.imageData,
      reviews: reviews,
      newFullName: fullName,
      newLocation: location,
      newPicture: null });
  }

  onChange = e => {
    console.log(e);
    this.setState({ [e.target.name]: e.target.value });
  };

  loadImage = e => {
    console.log(e);
    this.setState({
      loadedPicture: URL.createObjectURL(e[0]),
      newPicture: e[0]
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let userData = new FormData();
    userData.append("username", this.state.username);
    userData.append("imageData", this.state.newPicture);
    userData.append("fullName", this.state.newFullName);
    userData.append("location", this.state.newLocation);
    //Update user
    this.props.updateProfile(userData);
  };


  render() {
    console.log(this.state);
    return (
      <div className="App">
        <AppNavBar />
        <div>
          <Jumbotron>
            <h3 className="profile">{`Hello, ${this.state.username}`}</h3>
            <img src={this.state.picture}/>
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

                <img src={this.state.loadedPicture}/>
                <Dropzone name="newPicture" accept="image/*" onDrop={this.loadImage}>
                  {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()} style={{ border: '1px solid black', width: 400, color: 'black', padding: 20 }}>
                        <input {...getInputProps()} />
                        <p>Drag image here, or click to select file</p>
                      </div>
                    </section>
                )}</Dropzone>
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
                    date,
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
                              <small className="text-muted">{`review date: ${date}`}</small>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
