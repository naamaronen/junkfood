import React, { Component } from "react";
import {
  Container,
  Button,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardDeck
} from "reactstrap";
import { connect } from "react-redux";
import AppNavBar from "./AppNavBar";
import SearchNavBar from "./SearchNavBar";
import { Link, Route, Redirect } from "react-router-dom";
import ReviewModal from "./ReviewModal";

class RestSearchResult extends Component {
  render() {
    const { searchResult } = this.props.search;
    return (
      <div className="App">
        <AppNavBar />
        <SearchNavBar />
        <div>
          <Container>
            <CardDeck className="restaurnt-list">
              {searchResult.length === 0 ? (
                <div>
                  <h3>Restaurants Not Found </h3>
                </div>
              ) : (
                searchResult.map(
                  ({ _id, name, location, pictures, stringDate }) => (
                    <Col sm="3" key={_id}>
                      <Card
                        key={_id}
                        outline
                        color="danger"
                        className="text-center"
                      >
                        <CardBody>
                          <h5 className="card-title">{name}</h5>
                          <h6 className="card-subtitle mb-2 text-muted">
                            {location}
                          </h6>
                          <CardText>Something about rest</CardText>
                          <CardText>
                            <small className="text-muted">{stringDate}</small>
                          </CardText>
                          <Button style={{ marginBottom: "2rem" }}>
                            <Link style={{ color: "#fff" }} to={`/${name}`}>
                              Watch Reviews
                            </Link>
                          </Button>
                          <ReviewModal rest_name={name} type="Add"/>
                        </CardBody>
                      </Card>
                    </Col>
                  )
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
    search: state.search
  };
};

export default connect(mapStateToProps, null)(RestSearchResult);
