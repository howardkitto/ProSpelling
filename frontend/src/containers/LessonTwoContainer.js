import React, { Component } from 'react';
import {connect} from 'react-redux'

import Video from './Video'


class LessonTwoContainer extends Component{

render(){

    return(
        <div>
        <h1>Lesson Two</h1>
        {(this.props.spellerName)?<h2>Hello {this.props.spellerName}</h2>:null}
        <Video  src='/video/Jasmine1.mp4'
                height = {302}
                width = {450}
                />
        </div>

        )
    }

}

const mapStateToProps = state => {
    return {
      spellerName: state.name
    }
  }

export default connect(mapStateToProps)(LessonTwoContainer)