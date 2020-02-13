import React, { Component } from "react";
import AppNavBar from "./AppNavBar";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { watchReviews } from "../actions/restaurantAction";
import { Container, Button } from "reactstrap";

function Reviews() {
  let { id } = useParams();

  return (
    <div>
      <AppNavBar />

      <div>
        {id}
        {/* <CardDeck className="restaurnt-list">
          {restaurants.map(({ name, reviews, location }) => {
            if (name == { id }) {
              reviews.map(({ rates, _id, date }) => (
                <Col sm="3" key={_id}>
                  <Card
                    key={_id}
                    outline
                    color="danger"
                    className="text-center"
                  >
                    <CardImg top width="100%" src={picture} />
                    <CardBody>
                      <h5 className="card-title">{id}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {location}
                      </h6>
                      <CardText>Something about rest</CardText>
                      <CardText>
                        <small className="text-muted">{date}</small>
                      </CardText>
                      <ReviewModal />
                    </CardBody>
                  </Card>
                </Col>
              ));
            }
          })}
          }
        </CardDeck> */}
      </div>
    </div>
  );
}

export default connect(null, null)(Reviews);
