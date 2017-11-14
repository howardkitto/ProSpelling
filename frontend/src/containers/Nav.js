import React from 'react';
import {Link} from 'react-router-dom'
import {  Collapse, 
          Navbar, 
          NavbarToggler, 
          NavbarBrand, 
          Nav, 
          NavLink,
          UncontrolledNavDropdown,
          DropdownItem,
          DropdownToggle,
          DropdownMenu
         } from 'reactstrap';
import logo from '../images/logo.png'

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand href="/"><img src={logo} alt="Pro Spelling"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
                <NavLink tag={Link} 
                  to="/lessonone" 
                  activeclassname="activeNavLink">
                Lesson One
                </NavLink>
                <NavLink tag={Link} to="/lessontwo" activeclassname="activeNavLink">
                Lesson Two
                </NavLink>
                <UncontrolledNavDropdown>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href='/admin/words'>Words</DropdownItem>
                    <DropdownItem href='/admin/spellingtests'>Spelling Tests</DropdownItem>
                    <DropdownItem href='/admin/assessments'>Assessments</DropdownItem>
              </DropdownMenu>
            </UncontrolledNavDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}