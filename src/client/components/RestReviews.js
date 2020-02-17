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
import { Router } from "react-router-dom";

export class RestReviews extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      location: "",
      picture: null,
      reviews: [],
      sortOption: "",
      sortField: "",
      rate: null,
      isSorted: false,
      rest: 1
    };
  }

  componentDidMount() {
    this.setState({ name: this.props.match.params.id });
    this.props.getRest({ name: this.props.match.params.id });
    const rest = this.props.restaurant.rest;
    this.setState({ rest: rest });
  }

  init(rest) {
    if (rest) {
      this.setState({ rest: rest });
    }

    // const { picture, location, reviews, averageRate } = rest;
    // this.setState({ reviews: reviews });
    // this.setState({ location: location });
    // this.setState({ picture: picture });
    // this.setState({ rate: averageRate });
  }

  onChange = e => {
    this.setState({ sortOption: e.target.name });
  };

  onChangeField = e => {
    this.setState({ sortField: e.target.name });
  };

  onChangeRate = e => {
    this.setState({ rate: e.target.value });
  };

  onClick = e => {
    e.preventDefault();

    if (sortOption != "") {
      this.props.sortByDate(sortOption);
    } else if (sortField != "") {
      const sort = { sortField: sortField, rate: rate };
      this.props.sortByField(sort);
    }
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
              <h3 className="restPage">{this.state.name}</h3>
              <h4>{this.state.location}</h4>
              {this.state.picture}
            </Jumbotron>
            <div>
              <div className="sort-reviews">
                <h5>Sort By</h5>
                <FormGroup tag="fieldset" inline>
                  <div>
                    <Row>
                      <Col xs="auto">
                        <CustomInput
                          type="radio"
                          name="newest"
                          onChange={this.onChange}
                          label="Newest"
                          id="customRadio1"
                        />
                      </Col>
                      <Col xs="auto">
                        <CustomInput
                          type="radio"
                          name="oldest"
                          onChange={this.onChange}
                          label="Oldest"
                          id="customRadio2"
                        />
                      </Col>
                      <Col xs="auto">
                        <CustomInput
                          type="radio"
                          name="lastWeek"
                          onChange={this.onChange}
                          label="since last Week"
                          id="customRadio3"
                        />
                      </Col>
                      <Col xs="auto">
                        <CustomInput
                          type="radio"
                          name="lastMonth"
                          onChange={this.onChange}
                          label="since last Month"
                          id="customRadio4"
                        />
                      </Col>
                      <Col xs="auto">
                        <CustomInput
                          type="radio"
                          name="lastYear"
                          onChange={this.onChange}
                          label="since last Year"
                          id="customRadio5"
                        />
                      </Col>
                    </Row>
                  </div>
                </FormGroup>
              </div>
              <div>
                <FormGroup tag="fieldset" inline>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="BathroomQuality"
                            onChange={this.onChangeField}
                          />{" "}
                          Bathroom Quality
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="StaffKindness"
                            onChange={this.onChangeField}
                          />{" "}
                          Staff Kindness
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="Cleanliness"
                            onChange={this.onChangeField}
                          />{" "}
                          Cleanliness
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="DriveThruQuality"
                            onChange={this.onChangeField}
                          />{" "}
                          DriveThru Quality
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="DeliverySpeed"
                            onChange={this.onChangeField}
                          />{" "}
                          Delivery Speed
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Label check>
                          <Input
                            type="radio"
                            name="FoodQuality"
                            onChange={this.onChangeField}
                          />{" "}
                          Food Quality
                        </Label>
                      </FormGroup>
                    </Col>
                    <Col xs="auto">
                      <Col xs="auto">
                        <Label for="rate">Star Rate</Label>
                      </Col>
                      <Input
                        type="select"
                        name="rate"
                        id="rate"
                        onChange={this.onChangeRate}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </Col>
                  </Row>
                </FormGroup>
              </div>
              <Button onClick={this.onClick}>Sort</Button>
            </div>
            <div>
              <div>
                <h3>Reviews</h3>
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
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurant: state.restaurant
  };
};

const mapDispatchToProps = () => dispatch => {
  return {
    sortByDate: sort => {
      dispatch(sortByDate(sort));
    },
    sortByField: sort => {
      dispatch(sortByField(sort));
    },
    getRest: name => {
      dispatch(getRest(name));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestReviews);
