import React, {Component} from 'react'
import {connect} from 'react-redux'

import AdminList from './AdminList'

import {    getFamiliesList,
            createFamily,
            editFamily,
            deleteFamily,
            updateFamily,
        } from '../../redux/actionCreators'



class Families extends Component{

    render(){
        
        const objectProperties = { 
            name:'Word Families',
            reducer: "familyAdmin",
            objectType: "family",
            listObject: "familyList",
            formFields:[{label: 'Title',
                        type: "text"},
                        {label: 'Description',
                        type: "textarea"}],
            getListFunc: getFamiliesList,
            createFunc: createFamily,
            editFunc: editFamily,
            updateFunc: updateFamily,
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