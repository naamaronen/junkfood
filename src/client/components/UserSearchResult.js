import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  Container,
  Dropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Form,
  CardDeck,
  Card,
  CardImg,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";
import AppNavBar from "./AppNavBar";
import SearchNavBar from "./SearchNavBar";
import { Link, Route, Redirect } from "react-router-dom";
import ReviewModal from "./ReviewModal";

class UserSearchResult extends Component {
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
                  <h3>Users Not Found </h3>
                </div>
              ) : (
                searchResult.map(
                  ({ _id, fullName, location, picture, username }) => (
                    <Col sm="3" key={_id}>
                      <Card
                        key={_id}
                        outline
                        color="danger"
                        className="text-center"
                      >
                        <CardImg top width="100%" src={picture} />
                        <CardBody>
                          <h5 className="card-title">{username}</h5>
                          <h6 className="card-title">{fullName}</h6>
                          <h6 className="card-subtitle mb-2 text-muted">
                            {location}
                          </h6>
                          {/* <CardText>
                          <small className="text-muted">{date}</small>
                        </CardText> */}
                          {/* <Button style={{ marginBottom: "2rem" }}>
                          <Link to={`/restaurants/${name}`}>Watch Reviews</Link>
                        </Button>
                        <ReviewModal /> */}
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

export default connect(mapStateToProps, null)(UserSearchResult);
