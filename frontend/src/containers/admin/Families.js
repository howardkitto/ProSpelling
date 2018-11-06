import React, {Component} from 'react'
import {connect} from 'react-redux'

import AdminList from './AdminList'

import {    getFamiliesList,
            createFamily,
            editFamily,
            deleteFamily
        } from '../../redux/actionCreators'



class Families extends Component{

    render(){
        
        const objectProperties = { 
            name:'Word Families',
            reducer: "familyAdmin",
            objectType: "family",
            listObject: "familyList",
            formFields:[{label: 'Title',
                        type: "text",
                        value :""},
                        {label: 'Description',
                        type: "textarea",
                        value: ""}],
            getListFunc: getFamiliesList,
            createFunc: createFamily,
            editFunc: editFamily,
            deleteFunc: deleteFamily
            }

        return(
          <AdminList    listType = "Families"
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

export default connect(mapStateToProps, mapDispatchToProps)(Families)