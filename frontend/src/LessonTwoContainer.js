import React, { Component } from 'react';

import Video from './Video'
import Jasmine1 from './video/Jasmine1.mp4'


class LessonTwoContainer extends Component{

render(){

    return(
        <div>
        <h1>Lesson Two</h1>
        <Video  src={Jasmine1} 
                height = {302}
                width = {450}
                />
        </div>

        )
    }

}

export default LessonTwoContainer