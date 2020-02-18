import React, { Component } from "react";
import Dropzone from 'react-dropzone';
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

import { connect } from "react-redux";

class RegisterModal extends Component {
  state = {
    modal: false,
    fullName: "",
    username: "",
    password: "",
    location: "",
    picture: null,
    msg: null,
    loadedPicture: null
  };

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({
          msg: error.msg.msg
        });
      } else {
        this.setState({
          msg: null
        });
      }
    }
    //if authenticated, close modal
    if (this.state.modal) {
      if (this.props.isAuthenticated) this.toggle();
    }
  }

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
    console.log(e);
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
            ) : null}
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
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="username"
                  className="mb-3"
                  onChange={this.onChange}
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
                    <img src={this.state.loadedPicture}/>
                    <Dropzone name="picture" accept="image/*" onDrop={this.loadImage}>
                      {({getRootProps, getInputProps}) => (
                          <section>
                            <div {...getRootProps()} style={{ border: '1px solid black', width: 300, color: 'black', padding: 20 }}>
                              <input {...getInputProps()} />
                              <p>Drag image here, or click to select file</p>
                            </div>
                          </section>
                      )}</Dropzone>
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
    isAuthenticated: state.auth.isAuthenticated
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

{
  /* <FormGroup>
<Label for="examplePassword">Invalid input</Label>
<Input invalid />
<FormFeedback>Oh noes! that name is already taken</FormFeedback>
<FormText>Example help text that remains unchanged.</FormText>
</FormGroup> */
}
