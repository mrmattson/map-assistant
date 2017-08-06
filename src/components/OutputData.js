import React from 'react'
import PropTypes from 'prop-types'
import turfHelpers from '@turf/helpers'
import geojson2kml from '../ShapeTools/Geojson2Kml'

function OutputData ({ shapes }) {
  const kmlString = geojson2kml(turfHelpers.featureCollection(shapes))

  return (
    <div className="OutputData">
      <h4>KML Output</h4>
      <textarea className="OutputData-textarea" value={kmlString} readOnly />
    </div>
  )
}

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
OutputData.propTypes = {
//   prop: React.PropTypes.string,
//   eslint-disable-next-line react/forbid-prop-types
  shapes: PropTypes.array.isRequired
}

export default OutputData
