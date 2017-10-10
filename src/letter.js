import React from 'react'

const Letter = (props) => {
    return(
        <h1 onMouseOver={(e)=>props.playSound(e)}
        >{props.text}</h1>
    )
}

export default Letter