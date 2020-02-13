import React, { Component, Fragment } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Row,
  Col
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AppNavBar extends Component {
  state = {
    isOpen: false,
    dropdownOpen: false,
    searchFor: "restaurant"
  };
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
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

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <Fragment>
        <Container>
          <Row>
            <Col xs="auto">
              <NavItem>
                <span className="navbar-text mr-3">
                  <strong>{user ? `Welcome ${user}` : ""}</strong>
                </span>
              </NavItem>
            </Col>
            <Col>
              <NavItem>
                <Link to="/profile">Profile</Link>
              </NavItem>
            </Col>
            <Col>
              <NavItem>
                <Logout />
              </NavItem>
            </Col>
            <Col>
              <NavItem>
                <Link to="/">Home</Link>
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
            <NavbarBrand href="/">Junk Food Web</NavbarBrand>

            <Nav className="mr-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(AppNavBar);
