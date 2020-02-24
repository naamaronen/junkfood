import React, { Component } from "react";
import {
  Jumbotron,
  Col,
  CardDeck,
  Card,
  CardImg,
  CardBody,
  CardText,
  Container,
  Row,
  UncontrolledCarousel
} from "reactstrap";
import { connect } from "react-redux";
import AppNavBar from "./AppNavBar";
import StarRatingComponent from "react-star-rating-component";

export class UserProfile extends Component {
  state = {
    username: "",
    fullName: "",
    location: "",
    picture: null,
    reviews: []
  };

  componentDidMount() {
    this.setState({ username: this.props.match.params.id });

    let {
      fullName,
      location,
      picture,
      reviews
    } = this.props.location.state.user;
    this.setState({ fullName: fullName });
    this.setState({ location: location });
    this.setState({ picture: picture ? picture.imageData : null });
    this.setState({ reviews: reviews });
  }

  render() {
    return (
      <div className="App" style={{ "background-color": "#FFFFCC" }}>
        <AppNavBar />
        <div>
          <Jumbotron style={{ "background-color": "#FFFF99" }}>
            <h3 className="profile">{this.state.username}</h3>
            <h4>{this.state.fullName}</h4>
            <h4>{this.state.location}</h4>
            <img
              src={this.state.picture ? "../" + this.state.picture : null}
              style={{ width: 300 }}
            />
          </Jumbotron>
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
                      return { key: pic._id, src: "../" + pic.imageData };
                    });
                    return (
                      <Col sm="4" key={_id}>
                        <Card
                          key={_id}
                          outline
                          color="danger"
                          className="text-center"
                          style={{ "background-color": "#FFFF99" }}
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

export default connect(mapStateToProps, null)(UserProfile);
