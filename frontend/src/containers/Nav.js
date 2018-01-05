import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
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

import {logOut} from '../redux/actionCreators'


class MainNav extends Component {
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
    )}

  componentWillReceiveProps(nextProps){
    console.log('nextProps.user.tokenTimeStamp ' + nextProps.user.tokenTimeStamp)
  }


  render() {

    
    return ( 
      <div>
        <Navbar dark expand="md" style={this.navBarStyle()}>
          <NavbarBrand tag={Link} to='/'><img src={logo} alt="Pro Spelling"/></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav  className="ml-auto" navbar>

            {(this.props.user.role==='admin')&&<UncontrolledNavDropdown>
                  <DropdownToggle nav caret>
                    Admin
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem tag={Link} to='/admin/words'>Words</DropdownItem>
                    <DropdownItem tag={Link} to='/admin/users'>Users</DropdownItem>
                    <DropdownItem tag={Link} to='/admin/spellingtests'>Spelling Tests</DropdownItem>
                    <DropdownItem tag={Link} to='/admin/assessments'>Assessments</DropdownItem>
                    <DropdownItem tag={Link} to='/admin/envtest'>Env Test</DropdownItem>
              </DropdownMenu>
            </UncontrolledNavDropdown>}
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
                {!this.props.user.token&&
                 <NavLink tag={Link} 
                 to="/signup" 
                 activeclassname="activeNavLink">
               Sign Up
               </NavLink>}
                {!this.props.user.token?
                <NavLink tag={Link} 
                  to="/login" 
                  activeclassname="activeNavLink">
                Login
                </NavLink>
                :
                <NavLink tag={Link} 
                to="/" 
                activeclassname="activeNavLink"
                onClick={()=>{this.props.logOut()}}>
              Logout
              </NavLink>
                }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      user: state.user,
      errors: state.serviceMessage.loginform
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logOut: ()=>dispatch(logOut()),
    
        }
}

MainNav.PropTypes = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MainNav)