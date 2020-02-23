import React, { Component } from "react";
import {
  Container,
  Button,
  Col,
  CardDeck,
  Card,
  CardImg,
  CardBody
} from "reactstrap";
import { connect } from "react-redux";
import AppNavBar from "./AppNavBar";
import SearchNavBar from "./SearchNavBar";
import { Link } from "react-router-dom";
import { getUserProfile } from "../actions/userActions";

class UserSearchResult extends Component {
  onClick = username => {
    //const username = e.target.value;
    console.log(username);
    this.props.getUserProfile({ username });
  };

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
                        <CardImg
                          top
                          width="100%"
                          src={picture ? picture.imageData : null}
                        />
                        <CardBody>
                          <h5 className="card-title">{username}</h5>
                          <h6 className="card-title">{fullName}</h6>
                          <h6 className="card-subtitle mb-2 text-muted">
                            {location}
                          </h6>
                          <Button
                            color="warning"
                            //value={username}
                            onClick={this.onClick(username)}
                            tag={Link}
                            to={`/user_profile/${username}`}
                          >
                            Watch Profile
                          </Button>
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

const mapDispatchToProps = () => dispatch => {
  return {
    getUserProfile: username => {
      dispatch(getUserProfile(username));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchResult);
