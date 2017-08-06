import React from 'react'
import PropTypes from 'prop-types'

function MapPopup ({ uniqueId, text }) {
  return (
    <div className="MapPopup" id={uniqueId}>
      {text}
    </div>
  )
}

MapPopup.propTypes = {
  uniqueId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default MapPopup
