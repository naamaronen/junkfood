import React, { Component, Fragment } from "react";
import {
  Navbar,
  NavLink,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AppNavBar extends Component {
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <Container>
          <Row>
            <Col xs="auto">
              <NavItem>
                <span className="navbar-text mr-3">
                  {user ? `Welcome ${user}` : ""}
                </span>
              </NavItem>
            </Col>
            <Col>
              <NavItem>
                <NavLink tag={Link} to="/profile">
                  Profile
                </NavLink>
              </NavItem>
            </Col>
            <Col>
              <NavItem>
                <Logout />
              </NavItem>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <Container>
          <Row>
            <Col>
              {" "}
              <NavItem>
                <RegisterModal />
              </NavItem>
            </Col>
            <Col>
              {" "}
              <NavItem>
                <LoginModal />
              </NavItem>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark exapnd="sm" className="mb-5">
          <Container>
            <NavbarBrand tag={Link} to="/">
              Junk Food Web
            </NavbarBrand>

            <Nav className="mr-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Container>
        </Navbar>
        <div>
          {user && !isAuthenticated ? (
            <Alert color="success">
              Register Succssesfully - please Login!
            </Alert>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);
