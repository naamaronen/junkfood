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
              {searchResult.map(
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
                          <Link to={`/restaurants/${name}`}>Watch Reviews</Link>
                        </Button>
                        <ReviewModal />
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
    search: state.search
  };
};

export default connect(mapStateToProps, null)(RestSearchResult);
