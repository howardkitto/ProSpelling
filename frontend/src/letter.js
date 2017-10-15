import React from 'react'
import PropTypes from 'prop-types'

const Letter = (props) => {
    return(
        <div className="letterBox"
            onMouseOver={(e)=>props.triggerSound(e)}
            onMouseOut={(e)=>props.mouseLeave(e)}
            onClick={(e)=>props.triggerSound(e)}
        >{props.text}
        </div>
    )
}

export default Letter

Letter.propTypes = {
    onMouseOver:PropTypes.func.isRequired,
    onMouseOut:PropTypes.func.isRequired,
    onClick:PropTypes.func.isRequired
}