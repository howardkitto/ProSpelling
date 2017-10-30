import React, {Component} from 'react'
import {connect} from 'react-redux'

import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

import {levelSelected} from '../redux/actionCreators'

class LevelSelector extends Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            levels : [1,2,3,4],
          dropdownOpen: false
        };
      }
    
      toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });

      }

    render(){
        return(
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret color="info">
                    Choose Level
                </DropdownToggle>
                <DropdownMenu>
                    {this.state.levels.map((level, index)=>
                        <DropdownItem key={index} onClick={(e)=>this.props.levelSelected(level)}>
                        {level}</DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        )
    }

}

const mapStateToProps = state => {
    return {
      level: state.assessment.level
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        levelSelected : (level) => dispatch(levelSelected(level))
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LevelSelector)
