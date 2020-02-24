import React, { Component } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  CustomInput,
  Form
} from "reactstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { searchByRest, searchByUser } from "../actions/searchActions";
import Autosuggest from "react-autosuggest";

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

class SearchNavBar extends Component {
  constructor() {
    super();
    this.state = {
      dropdownOpen: false,
      searchFor: "restaurant",
      SearchValue: "",
      SearchLocationValue: "",
      SearchFullNameValue: null,
      name: false,
      location: false,
      username: false,
      rate: null,
      locRest_suggestions: [],
      locUser_suggestions: [],
      rest_suggestions: [],
      user_suggestions: [],
      rest_locations: [],
      user_locations: [],
      restNames: [],
      userNames: [],
      range: "0"
    };
  }

  componentDidMount() {
    this.initLists();
  }

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) {
      this.initLists();
    }
  }

  initLists = () => {
    let { restaurants } = this.props.restaurant;
    let locRestNames = [];
    let restNames = [];
    restaurants.map(rest => {
      locRestNames.push(rest.location);
      restNames.push(rest.name);
    });
    let uniqueRestLoc = [...new Set(locRestNames)];
    let uniqueName = [...new Set(restNames)];
    let rest_locations = [];
    uniqueRestLoc.map(name => {
      rest_locations.push({ name: name });
    });
    this.setState({
      rest_locations: rest_locations
    });
    let restName = [];
    uniqueName.map(name => {
      restName.push({ name: name });
    });
    this.setState({
      restNames: restName
    });
    let { users } = this.props.user;
    let userNames = [];
    let locUserNames = [];
    users.map(user => {
      userNames.push(user.username);
      locUserNames.push(user.location);
    });
    let uniqueUserLoc = [...new Set(locUserNames)];
    let uniqueUser = [...new Set(userNames)];
    let userName = [];
    uniqueUser.map(name => {
      userName.push({ name: name });
    });
    this.setState({
      userNames: userName
    });
    let user_locations = [];
    uniqueUserLoc.map(name => {
      user_locations.push({ name: name });
    });
    this.setState({
      user_locations: user_locations
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (value, list) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : list.filter(
          item => item.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  onSuggestionsFetchRequested = ({ value }) => {
    if (this.state.SearchValue === "" && this.state.searchFor === "restaurant")
      this.setState({
        locRest_suggestions: this.getSuggestions(
          value,
          this.state.rest_locations
        )
      });
    else if (this.state.SearchValue === "" && this.state.searchFor === "user")
      this.setState({
        locUser_suggestions: this.getSuggestions(
          value,
          this.state.user_locations
        )
      });
    else {
      if (this.state.searchFor === "user") {
        console.log("user");
        this.setState({
          user_suggestions: this.getSuggestions(value, this.state.userNames)
        });
      } else
        this.setState({
          rest_suggestions: this.getSuggestions(value, this.state.restNames)
        });
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      locRest_suggestions: []
    });
    this.setState({
      locUser_suggestions: []
    });
    this.setState({
      user_suggestions: []
    });
    this.setState({
      rest_suggestions: []
    });
  };



  dropDownToggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLocationChange = (event, { newValue }) => {
    this.setState({
      SearchLocationValue: newValue
    });
  };

  onValueChange = (event, { newValue }) => {
    this.setState({
      SearchValue: newValue
    });
  };

  onBoxChange = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };

  onClick = () => {
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
      this.setState({ SearchLocationValue: "", SearchFullNameValue: null });
    }
  };

  autoComplete = (place, val, change) => {
    let value = val;
    const inputProps = {
      placeholder: place,
      value,
      onChange: change
    };
    return inputProps;
  };

  render() {
    const {
      locUser_suggestions,
      locRest_suggestions,
      rest_suggestions,
      user_suggestions
    } = this.state;
    const restSearch = (
      <div>
        <Row>
          <Col xs="auto">
            <NavItem>
              <FormGroup row>
                <Autosuggest
                  id="restId"
                  suggestions={rest_suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={this.autoComplete(
                    "Search...",
                    this.state.SearchValue,
                    this.onValueChange
                  )}
                />
                <Button
                  onClick={this.onClick}
                  tag={Link}
                  to={{
                    pathname: "/search_rest",
                    state: { range: this.state.range }
                  }}
                >
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
                      <Autosuggest
                        id="locationId"
                        suggestions={locRest_suggestions}
                        onSuggestionsFetchRequested={
                          this.onSuggestionsFetchRequested
                        }
                        onSuggestionsClearRequested={
                          this.onSuggestionsClearRequested
                        }
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={this.autoComplete(
                          "choose a location",
                          this.state.SearchLocationValue,
                          this.onLocationChange
                        )}
                      />
                    ) : (
                      ""
                    )}
                  </Col>
                  <Col xs="auto">
                    <Form inline>
                      <Col xs="auto">
                        <Label for="rate">rate ></Label>
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
        <Row>
          <Col sm="1">
            <Label>Better</Label>
          </Col>
          <Col>
            <FormGroup>
              <CustomInput
                type="range"
                id="exampleCustomRange"
                name="range"
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>
          <Col>
            <Label>Closer</Label>
          </Col>
        </Row>
      </div>
    );

    const userSearch = (
      <Row>
        <Col xs="auto">
          <NavItem>
            <FormGroup row>
              <Autosuggest
                suggestions={user_suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={this.autoComplete(
                  "Search...",
                  this.state.SearchValue,
                  this.onValueChange
                )}
              />

              <Button onClick={this.onClick} tag={Link} to={"/search_user"}>
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
                    <Autosuggest
                      id="locationId"
                      suggestions={locUser_suggestions}
                      onSuggestionsFetchRequested={
                        this.onSuggestionsFetchRequested
                      }
                      onSuggestionsClearRequested={
                        this.onSuggestionsClearRequested
                      }
                      getSuggestionValue={getSuggestionValue}
                      renderSuggestion={renderSuggestion}
                      inputProps={this.autoComplete(
                        "choose a location",
                        this.state.SearchLocationValue,
                        this.onLocationChange
                      )}
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
      <div style={{"background-color":"#FFFF99"}}>
        <Navbar light expand="md">
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

const mapStateToProps = state => ({
  restaurant: state.restaurant,
  user: state.user
});

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

export default connect(mapStateToProps, mapDispatchToProps)(SearchNavBar);
