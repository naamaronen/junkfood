import React, { Component } from "react";
import { Container, Button } from "reactstrap";
import { connect } from "react-redux";
import {
  deleteRestaurant,
  getRestaurants,
  fetchRests
} from "../actions/restaurantAction";
import { Card, CardImg, CardText, CardBody, CardDeck, Col } from "reactstrap";
import ReviewModal from "./ReviewModal";

import { Link } from "react-router-dom";

class RestList extends Component {
  componentDidMount() {
    this.props.fetchRests();
  }

  onDeleteClick = id => {
    this.props.deleteRestaurant(id);
  };

  render() {
    const { restaurants } = this.props.restaurant;
    return (
      <div>
        <Container>
          <CardDeck className="restaurnt-list">
            {restaurants.map(
              ({ _id, name, location, picture, date, reviews }) => (
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
                        <small className="text-muted">{date}</small>
                      </CardText>
                      <Button style={{ marginBottom: "2rem" }}>
                        <Link style={{ color: "#fff" }} to={`/${name}`}>
                          Watch Reviews
                        </Link>
                      </Button>
                      <ReviewModal rest_name={name} />
                    </CardBody>
                  </Card>
                </Col>
              )
            )}
          </CardDeck>
        </Container>
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
    getRestaurants: () => {
      dispatch(getRestaurants());
    },
    fetchRests: () => {
      dispatch(fetchRests());
    },
    deleteRestaurant: id => {
      dispatch(deleteRestaurant(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RestList);
