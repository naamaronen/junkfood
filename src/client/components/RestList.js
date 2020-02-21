import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteRestaurant,
  getRestaurants,
  fetchRests
} from "../actions/restaurantAction";
import {
  Container,
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardDeck,
  Col,
  Alert
} from "reactstrap";
import ReviewModal from "./ReviewModal";
import { fetchUsers } from "../actions/userActions";

import { Link } from "react-router-dom";

class RestList extends Component {
  state = { alert: false };

  componentDidMount() {
    this.setState({ alert: false });
    this.props.fetchRests();
    this.props.fetchUsers();
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      if (this.props.auth) {
        this.setState({ alert: false });
      }
    }
  }

  onDeleteClick = id => {
    this.props.deleteRestaurant(id);
  };

  callbackFunction = childData => {
    this.setState({ alert: true });
  };

  render() {
    const { restaurants } = this.props.restaurant;
    return (
      <div>
        <div>
          {this.state.alert ? (
            <Alert color="danger">
              Sorry, you Have to be logged in to add a review
            </Alert>
          ) : (
            ""
          )}
        </div>
        <div>
          <Container>
            <CardDeck className="restaurnt-list">
              {restaurants.map(
                ({ _id, name, location, picture, stringDate }) => (
                  <Col sm="3" key={_id}>
                    <Card
                      key={_id}
                      outline
                      color="danger"
                      className="text-center"
                    >
                      <CardImg top width="100%" src={picture} />
                      <CardBody>
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">
                          {location}
                        </h6>
                        <CardText>Something about rest</CardText>
                        <CardText>
                          <small className="text-muted">{stringDate}</small>
                        </CardText>
                        <Button color="primary" style={{ marginBottom: "2rem" }}>
                          <Link style={{ color: "#fff" }} to={`/${name}`}>
                            Watch Reviews
                          </Link>
                        </Button>
                        <ReviewModal
                          rest_name={name}
                          type="Add"
                          parentCallback={this.callbackFunction}
                        />
                      </CardBody>
                    </Card>
                  </Col>
                )
              )}
            </CardDeck>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    restaurant: state.restaurant,
    auth: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = () => dispatch => {
  return {
    getRestaurants: () => {
      dispatch(getRestaurants());
    },
    fetchRests: () => {
      dispatch(fetchRests());
    },
    deleteRestaurant: id => {
      dispatch(deleteRestaurant(id));
    },
    fetchUsers: () => {
      dispatch(fetchUsers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestList);
