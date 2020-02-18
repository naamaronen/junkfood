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
  Form
} from "reactstrap";
import { connect } from "react-redux";
import { Link, Route, Redirect } from "react-router-dom";
import { searchByRest, searchByUser } from "../actions/searchActions";

class SearchNavBar extends Component {
  state = {
    dropdownOpen: false,
    searchFor: "restaurant",
    SearchValue: null,
    SearchLocationValue: null,
    SearchFullNameValue: null,
    name: false,
    location: false,
    username: false,
    rate: null,
    redirect: false
  };

  setRedirect = () => {
    this.setState({
      redirect: !this.state.redirect
    });
  };

  renderRedirectRest = () => {
    if (this.state.redirect) {
      this.setRedirect();
      this.setState({ SearchLocationValue: null });
      //this.props.history.push("/");
      return <Redirect to="/search_rest" />;
    }
  };

  renderRedirectUser = () => {
    if (this.state.redirect) {
      this.setRedirect();
      this.setState({ SearchLocationValue: null, SearchFullNameValue: null });
      //this.props.history.push("/");
      return <Redirect to="/search_user" />;
    }
  };

  dropDownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onBoxChange = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
    this.render();
  };

  onClick = e => {
    e.preventDefault();
    this.setRedirect();

    if (this.state.searchFor === "restaurant") {
      const newSearch = {
        name: this.state.SearchValue,
        location: this.state.SearchLocationValue,
        rate: this.state.rate
      };
      console.log(newSearch);
      this.props.searchByRest(newSearch);
    } else {
      const newSearch = {
        name: this.state.SearchValue,
        location: this.state.SearchLocationValue,
        fullName: this.state.SearchFullNameValue
      };
      console.log(newSearch);
      this.props.searchByUser(newSearch);
    }
  };

  render() {
    const restSearch = (
      <Row>
        <Col xs="auto">
          <NavItem>
            <FormGroup row>
              <input
                type="text"
                name="SearchValue"
                className="input"
                placeholder="Search..."
                onChange={this.onChange}
              />
              <Button onClick={this.onClick} tag={Link} to="/search_rest">
                Search
              </Button>
              <FormGroup check inline>
                <Col xs="auto">
                  <Label for="checkbox">Search Restaurant By:</Label>
                </Col>
                <Col xs="auto">
                  <CustomInput
                    type="checkbox"
                    id="name"
                    label="name"
                    name="name"
                    onChange={this.onBoxChange}
                  />
                </Col>
                <Col xs="auto">
                  <CustomInput
                    type="checkbox"
                    id="location"
                    label="location"
                    name="location"
                    onChange={this.onBoxChange}
                  />
                </Col>
                <Col>
                  {this.state.location ? (
                    <input
                      type="text"
                      name="SearchLocationValue"
                      className="input"
                      placeholder="Location..."
                      onChange={this.onChange}
                    />
                  ) : (
                    ""
                  )}
                </Col>
                <Col xs="auto">
                  <Form inline>
                    <Col xs="auto">
                      <Label for="rate">rate</Label>
                    </Col>
                    <Input
                      type="select"
                      name="rate"
                      id="rate"
                      onChange={this.onChange}
                    >
                      <option>None</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </Form>
                </Col>
              </FormGroup>
            </FormGroup>
          </NavItem>
        </Col>
      </Row>
    );

    const userSearch = (
      <Row>
        <Col xs="auto">
          <NavItem>
            <FormGroup row>
              <input
                type="text"
                name="SearchValue"
                className="input"
                placeholder="Search..."
                onChange={this.onChange}
              />
              <Button onClick={this.onClick} tag={Link} to="/search_user">
                Search
              </Button>
              <FormGroup check inline>
                <Col xs="auto">
                  <Label for="checkbox">Search User By:</Label>
                </Col>
                <Col xs="auto">
                  <CustomInput
                    type="checkbox"
                    id="username"
                    label="username"
                    name="username"
                    onChange={this.onBoxChange}
                  />
                </Col>
                <Col xs="auto">
                  <CustomInput
                    type="checkbox"
                    id="name"
                    label="full name"
                    name="name"
                    onChange={this.onBoxChange}
                  />
                  <Col>
                    {this.state.name ? (
                      <input
                        type="text"
                        name="SearchFullNameValue"
                        className="input"
                        placeholder="Full Name..."
                        onChange={this.onChange}
                      />
                    ) : (
                      ""
                    )}
                  </Col>
                </Col>
                <Col xs="auto">
                  <CustomInput
                    type="checkbox"
                    id="location"
                    label="location"
                    name="location"
                    onChange={this.onBoxChange}
                  />
                </Col>
                <Col>
                  {this.state.location ? (
                    <input
                      type="text"
                      name="SearchLocationValue"
                      className="input"
                      placeholder="Location..."
                      onChange={this.onChange}
                    />
                  ) : (
                    ""
                  )}
                </Col>
              </FormGroup>
            </FormGroup>
          </NavItem>
        </Col>
      </Row>
    );

    return (
      <div>
        {this.state.searchFor === "restaurant"
          ? this.renderRedirectRest()
          : this.renderRedirectUser()}
        <Navbar color="light" light expand="md">
          <Container>
            <Nav className="mr-auto" navbar>
              <Row>
                <Col>
                  {this.state.searchFor === "restaurant"
                    ? restSearch
                    : userSearch}
                </Col>
                <Col xs="auto">
                  <NavItem>
                    <Dropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.dropDownToggle}
                    >
                      <DropdownToggle caret color="danger">
                        Search For
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() => {
                            this.setState({
                              searchFor: "restaurant"
                            });
                          }}
                        >
                          Restaurant
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => {
                            this.setState({
                              searchFor: "user"
                            });
                          }}
                        >
                          User
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavItem>
                </Col>
              </Row>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapDispatchToProps = () => dispatch => {
  return {
    searchByRest: search => {
      dispatch(searchByRest(search));
    },
    searchByUser: search => {
      dispatch(searchByUser(search));
    }
  };
};

export default connect(null, mapDispatchToProps)(SearchNavBar);
