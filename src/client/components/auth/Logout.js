import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

export class Logout extends Component {
  onClick = () => {
    const { user } = this.props.auth;
    this.props.logout(user);
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.onClick} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = () => dispatch => {
  return {
    logout: user => {
      dispatch(logout(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
