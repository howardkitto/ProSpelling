import React from 'react'

const Letter = (props) => {
    return(
        <div className="letterBox" onMouseOver={(e)=>props.playSound(e)}
        >{props.text}
        </div>
    )
}

export default Letter