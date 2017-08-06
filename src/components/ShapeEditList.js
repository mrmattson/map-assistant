import React from 'react'
import PropTypes from 'prop-types'
import is from 'is_js'
import R from 'ramda'
import {
  Button
} from 'react-bootstrap'

import ShapeEditItem from './ShapeEditItem'

function ShapeEditList ({ draftShapes, selectedDraftShapes, saveShapesAsFinal, onSelectionChange, onPropertyChange }) {
  return (
    <div>
      <ul className="ShapeEditList list-group">
        {is.not.empty(draftShapes)
          ? draftShapes.map((draftShape, index) => (
            <ShapeEditItem
              key={draftShape.properties.id}
              draftShape={draftShape}
              selectedDraftShapes={selectedDraftShapes}
              index={index}
              onSelectionChange={onSelectionChange}
              onPropertyChange={onPropertyChange}
            />))
          : null
        }
      </ul>
      <Button
        bsSize="large"
        bsStyle="primary"
        onClick={() => saveShapesAsFinal(R.filter(draftShape => R.contains(draftShape.properties.id, selectedDraftShapes), draftShapes))}
        disabled={draftShapes.length === 0}
      >Save Selected Shapes</Button>
    </div>
  )
}

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
ShapeEditList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  draftShapes: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedDraftShapes: PropTypes.array.isRequired,
  saveShapesAsFinal: PropTypes.func.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  onPropertyChange: PropTypes.func.isRequired
}

export default ShapeEditList
