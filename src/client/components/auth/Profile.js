import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";
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
  CardBody,
  CardText,
  Container,
  Row,
  UncontrolledCarousel,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { updateProfile } from "../../actions/userActions";
import AppNavBar from "../AppNavBar";
import StarRatingComponent from "react-star-rating-component";
import { deleteReview } from "../../actions/reviewAction";
import ReviewModal from "../ReviewModal";
import {clearErrors} from "../../actions/errorActions";
import LocationAutocomplete from "../LocationAutocomplete";


export class Profile extends Component {
  state = {
    //userProfile: null,
    username: "",
    fullName: "",
    location: "",
    picture: null,
    reviews: [],
    loadedPicture: null,
    error: null,
    updateSuccess: null
  };

  onlocChange = address => {
    this.setState({ location: address});
  };

  componentDidMount() {
    console.log("profile mounted");
    console.log(this.props.user);
    const { userProfile } = this.props.user;
    const { fullName, reviews, location, username, picture } = userProfile;
    this.setState({
      //userProfile: userProfile,
      fullName: fullName,
      location: location,
      username: username,
      picture: picture ? picture.imageData : null,
      reviews: reviews ? reviews : []
    });
  }

  componentDidUpdate(prevProps) {
    const error = this.props.error;
    const { userProfile } = this.props.user;
    console.log(userProfile);
    // Error with updating the profile
    if (error !== prevProps.error) {
      this.setState({
        error: error.msg
      });
    }
    if (this.props != prevProps) {
      const { fullName, reviews, location, username, picture } = userProfile;
      this.setState({
        //userProfile: userProfile,
        fullName: fullName,
        location: location,
        username: username,
        picture: picture ? picture.imageData : null,
        reviews: reviews ? reviews : [],
        updateSuccess: true
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loadImage = e => {
    this.setState({
      loadedPicture: URL.createObjectURL(e[0]),
      picture: e[0]
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.clearErrors();
    this.setState({
      updateSuccess: null
    });
    let userData = new FormData();
    userData.append("username", this.state.username);
    userData.append("imageData", this.state.picture);
    userData.append("fullName", this.state.fullName);
    userData.append("location", this.state.location);
    console.log("submitting");
    console.log(this.state);
    //Update user
    this.props.updateProfile(userData);
  };

  onDeleteReview = e => {
    let revIdToDelete = e.target.value;
    this.props.deleteReview(revIdToDelete);
    let reviews = this.state.reviews;
    reviews = reviews.filter(rev=>rev._id!=revIdToDelete);
    this.setState({reviews:reviews});
  };

  render() {
    return (
      <div className="App" style={{"background-color":"#FFFFCC"}}>
        <AppNavBar />
        <div>
          <Jumbotron style={{"background-color":"#FFFF99"}}>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>

            <Container>
              <Row>
              <Col>
            <h3 className="profile">{`Hello, ${this.state.username}`}</h3>
            <p>you can watch and edit your profile here!</p>
                <Label for="fullName">Full Name</Label>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder={`${this.state.fullName}`}
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="location">Location</Label>
                <LocationAutocomplete class={"profile-autocomplete"} value={this.state.location} onChange={this.onlocChange}/>

              </Col>
              <Col>
                <img src={this.state.loadedPicture?this.state.loadedPicture:this.state.picture} style={{width: 300}}/>
                <p></p>
                <p>Edit profile picture:</p>
              <Dropzone name="newPicture" accept="image/*" onDrop={this.loadImage}>
                {({getRootProps, getInputProps}) => (
                    <section>
                      <div {...getRootProps()} style={{ border: '1px solid black', width: 300, color: 'black', padding: 20 }}>
                        <input {...getInputProps()} />
                        <p>Drag image here, {"\n"}or click to select file</p>
                      </div>
                    </section>
                )}</Dropzone>
                <p></p>
              </Col></Row></Container>
            <Button color="dark" style={{ marginBottom: "2rem" }} block>
              Save Changes
            </Button>

                {this.state.error ? (
                  <Alert color="danger">{this.state.error}</Alert>
                ) : (
                  ""
                )}
                {this.state.updateSuccess ? (
                  <Alert color="success">
                    {"Profile updated successfully"}
                  </Alert>
                ) : (
                  ""
                )}
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
                    pictures,
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
                    const review = {
                      rates,
                      restaurantName,
                      stringDate,
                      _id,
                      pictures,
                      averageRate
                    };
                    const reviewImages = pictures.map(pic => {
                      return { key: pic._id, src: pic.imageData };
                    });
                    return (
                      <Col sm="4" key={_id}>
                        <Card
                          key={_id}
                          outline
                          color="danger"
                          className="text-center"
                          style={{"background-color":"#FFFF99"}}
                        >
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
                              <UncontrolledCarousel
                                items={reviewImages}
                                indicators={false}
                              />
                            </Row>
                            <Col>
                              <ReviewModal review={review} type="Update" />
                            </Col>
                            <Col>
                              <Button
                                color="danger"
                                value={_id}
                                onClick={this.onDeleteReview}
                              >
                                Delete Review
                              </Button>
                            </Col>
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
  user: state.user,
  error: state.error
});

const mapDispatchToProps = () => dispatch => {
  return {
    updateProfile: user => {
      dispatch(updateProfile(user));
    },
    deleteReview: id => {
      dispatch(deleteReview(id));
    },
    clearErrors: () => {
      dispatch(clearErrors());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
