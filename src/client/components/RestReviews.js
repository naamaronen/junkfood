import React, { Component, Fragment } from "react";
import {
  NavLink,
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
  Row,
  CustomInput
} from "reactstrap";
import { connect } from "react-redux";
import AppNavBar from "./AppNavBar";
import StarRatingComponent from "react-star-rating-component";
import { getRest } from "../actions/restaurantAction";
import { sortByDate, sortByField } from "../actions/reviewAction";

export class RestReviews extends Component {
  constructor() {
    super();
    this.state = {
      sortTime: "",
      sortField: "",
      isSorted: false,
      showSorted: false,
      name: ""
    };
  }

  componentDidMount() {
    this.setState({ name: this.props.match.params.id });
    this.props.getRest({ name: this.props.match.params.id });
  }

  onChangeTime = e => {
    this.setState({ isSorted: !this.state.isSorted });
    this.setState({ sortTime: e.target.name });
  };

  onChangeField = e => {
    this.setState({ isSorted: !this.state.isSorted });
    this.setState({ sortField: e.target.name });
  };

  onChangeRate = e => {
    this.setState({ rate: e.target.value });
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
                picture,
                averageRate,
                userReview
              }) => {
                const {
                  BathroomQuality,
                  StaffKindness,
                  Cleanliness,
                  DriveThruQuality,
                  DeliverySpeed,
                  FoodQuality
                } = rates;
                const { username } = userReview;
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
    const rest = this.props.restaurant.rest;
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
              {rest.picture}
            </Jumbotron>
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
              <Row>
                <Col xs="auto">
                  <Button onClick={this.onClick}>Sort</Button>
                </Col>
                <Col xs="auto">
                  <Button onClick={this.showAll}>Show All Reviews</Button>
                </Col>
              </Row>
            </div>
            <div>
              <div>
                <h3>Reviews</h3>
              </div>
              {this.state.showSorted
                ? this.showReviews(this.props.review.sortedReviews)
                : this.showReviews(rest.reviews)}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurant: state.restaurant,
    review: state.review
  };
};

const mapDispatchToProps = () => dispatch => {
  return {
    sortByDate: newSort => {
      dispatch(sortByDate(newSort));
    },
    sortByField: newSort => {
      console.log(newSort);
      dispatch(sortByField(newSort));
    },
    getRest: name => {
      dispatch(getRest(name));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestReviews);
