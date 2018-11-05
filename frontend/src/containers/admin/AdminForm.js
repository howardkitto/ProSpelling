import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, FormGroup, Label, Col, Input} from 'reactstrap'

const formField = (field, value, onChange)=>{

    var formItem = <FormGroup row key={field.label}>
    <Label for={field.label} sm={3}>{field.label}</Label>
    <Col sm={9}>
    <Input  name={field.label}
                type={field.type}
                value={value[field.label]}
                onChange={(e) => onChange(e)}/>
        </Col>
        </FormGroup>
    
        return formItem
}

class AdminForm extends Component{

    constructor(props){
        super(props)        
        this.onChange=this.onChange.bind(this)
        }

        onChange(e){

        const key = e.target.name
        let value = e.target.value

        var editItem=this.props.values

        editItem[key]=value

        this.props.editFunc(editItem)
        }

    render(){

        const {values}=this.props
        const {formFields}=this.props.objectProperties

        return(
            <Form>
                {this.props.error}
                {formFields.map((field)=>{return formField(field, values[field.label], this.onChange)})}
                
            </Form>
    )}
}

const mapStateToProps = (state, ownprops) => {
    const {reducer, objectType} = ownprops.objectProperties
    return {
      values : state[reducer][objectType]
    }
  }

  const mapDispatchToProps = (dispatch, ownProps )=> {
    return {
        editFunc : (itemObject)=>dispatch(ownProps.objectProperties.editFunc(itemObject)),
          }
  }


export default connect(mapStateToProps, mapDispatchToProps)(AdminForm)
