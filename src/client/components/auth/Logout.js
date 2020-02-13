import React, { Component, Fragment } from "react";
import { NavLink } from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";

export class Logout extends Component {
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logout(this.props.auth)} href="#">
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.token
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
