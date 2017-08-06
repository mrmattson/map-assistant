import React from 'react'
import PropTypes from 'prop-types'
import is from 'is_js'

import ShapeListItem from './ShapeListItem'

function ShapeList ({ shapes }) {
  return (
    <ul className="ShapeList list-group">
      {is.not.empty(shapes)
        ? shapes.map(shape => (<ShapeListItem key={shape.properties.id} shape={shape} />))
        : null}
    </ul>
  )
}

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
ShapeList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  shapes: PropTypes.array.isRequired
}

export default ShapeList
