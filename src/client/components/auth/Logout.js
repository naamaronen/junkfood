import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import { Link } from "react-router-dom";

export class Logout extends Component {
  onClick = () => {
    this.props.logout({ username: this.props.auth.user });
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.onClick} tag={Link} to="/">
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
