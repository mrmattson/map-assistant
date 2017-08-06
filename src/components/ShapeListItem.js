import React from 'react'
import PropTypes from 'prop-types'

import coordinateToString from '../helpers/coordinateToString'

function ShapeListItem ({ shape }) {
  // const coordinates = shape.geometry.coordinates[0]
  // let verticeButtonMsg = ''
  // if (this.state.showCoords) {
  //   verticeButtonMsg = 'Click to hide vertices'
  // } else {
  //   verticeButtonMsg = 'Click to show polygon vertices.'
  // }
  // <div><button onClick={this.showCoordinates}>{verticeButtonMsg}</button>
  //   {this.state.showCoords ? <pre>
  //     {coordinates.slice(0, coordinates.length - 1).map((coords, index) => {
  //       let str = ''
  //       if (index !== 0) {
  //         str += '\n\n'
  //       }
  //       str += `${index + 1}) ${coordinateToString(coords)}`
  //       return str
  //     })}
  //   </pre> : null}
  // </div>

  return (
    <li className="list-group-item">
      <div>{shape.properties.title}</div>
      <div>Center: <pre>{coordinateToString(shape.properties.centerCoordinates)}</pre></div>
      <div>Radius: {shape.properties.radius} {shape.properties.radiusUnits}</div>
    </li>
  )
}

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
ShapeListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  shape: PropTypes.object.isRequired
}

export default ShapeListItem
