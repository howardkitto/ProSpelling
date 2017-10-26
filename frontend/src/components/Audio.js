import React from 'react'
import PropTypes from 'prop-types'

const Audio = (props) => {
    return(
        <audio controls
                src={'../audio/brag.mp3'}
        />
    )
}

export default Audio

Audio.propTypes = {
    nextWord:PropTypes.string.isRequired,
}