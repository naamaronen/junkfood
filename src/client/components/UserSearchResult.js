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

class UserSearchResult extends Component {
  render() {
    return (
      <div className="App">
        <AppNavBar />
        <SearchNavBar />
      </div>
    );
  }
}

export default connect(null, null)(UserSearchResult);
