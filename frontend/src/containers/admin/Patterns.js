import React, {Component} from 'react'
import {connect} from 'react-redux'

import AdminList from './AdminList'

import {    getPatternsList,
            createPattern,
            editPattern
        } from '../../redux/actionCreators'



class Patterns extends Component{

    render(){
        
        const objectProperties = { 
            name:'Word Pattern',
            reducer: "patternAdmin",
            objectType: "pattern",
            listObject: "patternList",
            formFields:[{label: 'Title',
                        type: "text",
                        value :""},
                        {label: 'Description',
                        type: "textarea",
                        value: ""}],
            getListFunc: getPatternsList,
            createFunc: createPattern,
            editFunc: editPattern
            }

        return(
          <AdminList    listType = "Patterns"
                        objectProperties = {objectProperties}/>
        )
    }
}

const mapStateToProps = state => {
    return {
      
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
          }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Patterns)