import React, { Component } from "react";
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
  Alert
} from "reactstrap";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

import { connect } from "react-redux";

class LoginModal extends Component {
  constructor() {
    super();

    this.state = {
      modal: false,
      username: "",
      password: "",
      msg: null
    };
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
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

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };

    //Attempt to Login
    this.props.login(user);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.atate.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
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
                <Button color="dark" style={{ marginBottom: "2rem" }} block>
                  Login
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
    login: user => {
      dispatch(login(user));
    },
    clearErrors: () => {
      dispatch(clearErrors());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
