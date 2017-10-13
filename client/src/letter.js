import React from 'react'

const Letter = (props) => {
    return(
        <div className="letterBox" 
            onMouseOver={(e)=>props.mouseEnter(e)}
            onMouseOut={(e)=>props.mouseLeave(e)}
        >{props.text}
        </div>
    )
}

export default Letter