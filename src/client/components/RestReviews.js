import React, { Component, Fragment } from "react";
import {
  Jumbotron,
  Button,
  FormGroup,
  Col,
  CardDeck,
  Card,
  CardBody,
  CardText,
  Container,
  Row,
  CustomInput,
  UncontrolledCarousel,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import AppNavBar from "./AppNavBar";
import StarRatingComponent from "react-star-rating-component";
import { getRest } from "../actions/restaurantAction";
import { sortByDate, sortByField } from "../actions/reviewAction";
import ReviewModal from "./ReviewModal";
import {updateUserGeoLocation} from "../actions/userActions";
import {calcDistance} from "../helpFunctions";


export class RestReviews extends Component {
  constructor() {
    super();
    this.state = {
      sortTime: "",
      sortField: "",
      isSorted: false,
      showSorted: false,
      name: "",
      alert: false,
      distance:"",
      restGeoLoc:false
    };
  }

  componentDidMount() {
    this.setState({ alert: false });
    this.setState({ name: this.props.match.params.id });
    this.props.getRest({ name: this.props.match.params.id });
  }

  componentDidUpdate(prevProps) {
    // set distance
    if (this.props.rest){
      let restGeoLoc = this.props.rest.geolocation;
      if (restGeoLoc && this.props.userGeoLoc) {
        let newDistance = calcDistance(restGeoLoc, this.props.userGeoLoc);
        if (newDistance !== this.state.distance) {
          this.setState({distance: newDistance});
        }
      }
    }
    if (this.props != prevProps) {
      if (this.props.auth) {
        this.setState({alert: false});
      }
    }
  }

  onChangeTime = e => {
    this.setState({ isSorted: !this.state.isSorted });
    this.setState({ sortTime: e.target.name });
  };

  onChangeField = e => {
    this.setState({ sortTime: "" });
    this.setState({ isSorted: !this.state.isSorted });
    this.setState({ sortField: e.target.name });
  };


  onClick = e => {
    e.preventDefault();
    if (this.state.isSorted) {
      if (this.state.sortTime != "") {
        const { sortTime, name } = this.state;
        const sort = { sortTime, name };
        this.props.sortByDate(sort);
      } else if (this.state.sortField != "") {
        const { sortField, name } = this.state;
        const sort = { sortField, name };
        this.props.sortByField(sort);
      }
      this.setState({ showSorted: true });
    }
  };

  showAll = () => {
    this.setState({ showSorted: false });
  };

  callbackFunction = childData => {
    this.setState({ alert: true });
  };

  showReviews = reviews => {
    return (
      <div>
        <Container>
          <CardDeck className="reviews-list">
            {reviews.map(
              ({
                rates,
                restaurantName,
                stringDate,
                _id,
                pictures,
                averageRate,
                user
              }) => {
                const {
                  BathroomQuality,
                  StaffKindness,
                  Cleanliness,
                  DriveThruQuality,
                  DeliverySpeed,
                  FoodQuality
                } = rates;
                const { username } = user;
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
                    >
                      <CardBody>
                        <h5 className="card-title">{restaurantName}</h5>

                        <CardText>{`review by: ${username}`}</CardText>
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
                          <UncontrolledCarousel items={reviewImages} indicators={false}/>
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
    );
  };

  render() {
    const rest = this.props.rest;
    const distance = this.state.distance;

    return (
      <div className="App">
        <AppNavBar />
        {!rest ? (
          <div>
            <h2>Loading...</h2>
          </div>
        ) : (
          <div>
            <Jumbotron>
              <h3 className="restPage">{rest.name}</h3>
              <h4>{rest.location}</h4>
              {distance? (<h6>{distance} meters away from you</h6>):""}
            </Jumbotron>
            <Container>
              <div>
                <div className="sort-reviews">
                  <h5>Sort By</h5>
                  <FormGroup check>
                    <div>
                      <CustomInput
                        type="checkbox"
                        name="newest"
                        onChange={this.onChangeTime}
                        label="Newest"
                        id="customRadio1"
                        inline
                      />
                      <CustomInput
                        type="checkbox"
                        name="oldest"
                        onChange={this.onChangeTime}
                        label="Oldest"
                        id="customRadio2"
                        inline
                      />
                      <CustomInput
                        type="checkbox"
                        name="lastWeek"
                        onChange={this.onChangeTime}
                        label="since last Week"
                        id="customRadio3"
                        inline
                      />
                      <CustomInput
                        type="checkbox"
                        name="lastMonth"
                        onChange={this.onChangeTime}
                        label="since last Month"
                        id="customRadio4"
                        inline
                      />
                      <CustomInput
                        type="checkbox"
                        name="lastYear"
                        onChange={this.onChangeTime}
                        label="since last Year"
                        id="customRadio5"
                        inline
                      />
                    </div>
                  </FormGroup>
                </div>
                <div>
                  <FormGroup check>
                    <div>
                      <Row>
                        <Col xs="auto">
                          <CustomInput
                            type="checkbox"
                            name="BathroomQuality"
                            onChange={this.onChangeField}
                            label="Bathroom Quality"
                            id="customRadio6"
                          />
                        </Col>
                        <Col xs="auto">
                          <CustomInput
                            type="checkbox"
                            name="StaffKindness"
                            onChange={this.onChangeField}
                            label="Staff Kindness"
                            id="customRadio7"
                          />
                        </Col>
                        <Col xs="auto">
                          <CustomInput
                            type="checkbox"
                            name="Cleanliness"
                            onChange={this.onChangeField}
                            label="Cleanliness"
                            id="customRadio8"
                          />
                        </Col>
                        <Col xs="auto">
                          <CustomInput
                            type="checkbox"
                            name="DriveThruQuality"
                            onChange={this.onChangeField}
                            label="DriveThru Quality"
                            id="customRadio9"
                          />
                        </Col>
                        <Col xs="auto">
                          <CustomInput
                            type="checkbox"
                            name="DeliverySpeed"
                            onChange={this.onChangeField}
                            label="Delivery Speed"
                            id="customRadio10"
                          />
                        </Col>
                        <Col xs="auto">
                          <CustomInput
                            type="checkbox"
                            name="FoodQuality"
                            onChange={this.onChangeField}
                            label="Food Quality"
                            id="customRadio11"
                          />
                        </Col>
                      </Row>
                    </div>
                  </FormGroup>
                </div>
                <div>
                  <Row>
                    <Col xs="auto">
                      <Button onClick={this.onClick}>Sort</Button>
                    </Col>
                    <Col xs="auto">
                      <Button onClick={this.showAll}>Show All Reviews</Button>
                    </Col>
                    <Col xs="auto">
                      <ReviewModal
                        rest_name={rest.name}
                        type="Add"
                        parentCallback={this.callbackFunction}
                      />
                    </Col>
                    {this.state.alert ? (
                      <Alert color="danger">
                        Sorry, you Have to be logged in to add a review
                      </Alert>
                    ) : (
                      ""
                    )}
                  </Row>
                </div>
              </div>
            </Container>
            <div>
              <Container>
                <div>
                  <h3>Reviews</h3>
                </div>
                {this.state.showSorted
                  ? this.showReviews(this.props.review.sortedReviews)
                  : this.showReviews(rest.reviews)}
              </Container>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rest: state.restaurant.rest,
    userGeoLoc: state.user.geoLocation,
    review: state.review,
    auth: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = () => dispatch => {
  return {
    sortByDate: newSort => {
      dispatch(sortByDate(newSort));
    },
    sortByField: newSort => {
      dispatch(sortByField(newSort));
    },
    getRest: name => {
      dispatch(getRest(name));
    },
    updateUserGeoLoc: pos=>{
      dispatch(updateUserGeoLocation(pos));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestReviews);
