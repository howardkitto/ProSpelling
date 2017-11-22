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

class mainNav extends React.Component {
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

  navBarStyle(){
    return(
      {'backgroundColor':'#212121'}
    )
  }
  render() {
    return (
      <div>
        <Navbar dark expand="md" style={this.navBarStyle()}>
          <NavbarBrand href="/"><img src={logo} alt="Pro Spelling"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav  className="ml-auto" navbar>
            <UncontrolledNavDropdown>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link} to='/admin/words'>Words</DropdownItem>
                    <DropdownItem tag={Link} to='/admin/spellingtests'>Spelling Tests</DropdownItem>
                    <DropdownItem tag={Link} to='/admin/assessments'>Assessments</DropdownItem>
              </DropdownMenu>
            </UncontrolledNavDropdown>
            <NavLink tag={Link} 
                  to="/user/registration" 
                  activeclassname="activeNavLink">
                Register
                </NavLink>
                <NavLink tag={Link} 
                  to="/lessonone" 
                  activeclassname="activeNavLink">
                Lesson One
                </NavLink>
                <NavLink tag={Link} to="/lessontwo" activeclassname="activeNavLink">
                Lesson Two
                </NavLink>
                <NavLink tag={Link} to="/quickquiz" activeclassname="activeNavLink">
                QuickQuiz
                </NavLink>
                
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default mainNav