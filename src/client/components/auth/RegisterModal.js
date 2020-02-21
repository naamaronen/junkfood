import React, { Component } from "react";
import Dropzone from "react-dropzone";
import {
  Form,
  Modal,
  Input,
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  NavLink,
  Alert,
  Col,
  Row,
  FormText
} from "reactstrap";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import Autosuggest from "react-autosuggest";
import { connect } from "react-redux";

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
  <div>
    <Alert color="danger">{suggestion.name} - is already taken</Alert>
  </div>
);

class RegisterModal extends Component {
  state = {
    modal: false,
    fullName: "",
    username: "",
    password: "",
    location: "",
    picture: null,
    msg: null,
    loadedPicture: null,
    userNames: [],
    suggestions: []
  };
  componentDidMount() {
    this.initUserNames();
  }

  initUserNames = () => {
    let { users } = this.props.usernames;
    let userNames = [];
    users.map(user => {
      userNames.push(user.username);
    });
    let uniqueUser = [...new Set(userNames)];
    let userName = [];
    uniqueUser.map(name => {
      userName.push({ name: name });
    });
    this.setState({
      userNames: userName
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props != prevProps) this.initUserNames();
    const error = this.props.error;
    if (error !== prevProps.error) {
        this.setState({
          msg: error.msg
        });
    }
    //if authenticated, close modal
    if (this.state.modal) {
      if (this.props.user) this.toggle();
    }
  }

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.userNames.filter(
          username => username.name.toLowerCase() === inputValue
        );
  };

  onChangeUsername = (event, { newValue }) => {
    this.setState({
      username: newValue
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  toggle = () => {
    //Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  loadImage = e => {
    this.setState({
      loadedPicture: URL.createObjectURL(e[0]),
      picture: e[0]
    });
  };

  onSubmit = e => {
    e.preventDefault();
    //Create new user
    let userData = new FormData();
    userData.append("username", this.state.username);
    userData.append("imageData", this.state.picture);
    userData.append("fullName", this.state.fullName);
    userData.append("location", this.state.location);
    userData.append("password", this.state.password);
    //Attempt to register
    this.props.register(userData);
  };

  render() {
    const { username, suggestions } = this.state;
    const value = username;
    const inputProps = {
      placeholder: "username",
      value,
      onChange: this.onChangeUsername
    };
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : ""}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="fullName">fullName</Label>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="fullName"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="username">username</Label>
                <Autosuggest
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                  getSuggestionValue={getSuggestionValue}
                  renderSuggestion={renderSuggestion}
                  inputProps={inputProps}
                />
                <Label for="password">Password</Label>
                <Input
                  type="text"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="location"
                  className="mb-3"
                  onChange={this.onChange}
                />
                <FormGroup row>
                  <Label for="picture" sm={2}>
                    Add Picture
                  </Label>
                  <Col sm={10}>
                    <img src={this.state.loadedPicture} style={{width: 300}}/>
                    <Dropzone
                      name="picture"
                      accept="image/*"
                      onDrop={this.loadImage}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div
                            {...getRootProps()}
                            style={{
                              border: "1px solid black",
                              width: 300,
                              color: "black",
                              padding: 20
                            }}
                          >
                            <input {...getInputProps()} />
                            <p>Drag image here, or click to select file</p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </Col>
                </FormGroup>
                <Button color="dark" style={{ marginBottom: "2rem" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.error,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    usernames: state.user
  };
};

const mapDispatchToProps = () => dispatch => {
  //addRest;
  return {
    register: user => {
      dispatch(register(user));
    },
    clearErrors: () => {
      dispatch(clearErrors());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
