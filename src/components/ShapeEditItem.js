import React from 'react'
import PropTypes from 'prop-types'
import R from 'ramda'
import inspector from 'schema-inspector'
import {
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
  Button
} from 'react-bootstrap'

// import coordinateToString from '../helpers/coordinateToString'
// import { validCircleShape } from '../ShapeTools/circleShape'
import {
  NAUTICAL_MILES,
  METERS
} from '../helpers/constants'

const radiusSanitization = {
  type: 'number'
}

const radiusValidation = {
  type: 'number',
  gt: 0
}

function FieldGroup ({ id, label, help, validationState, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

function humanReadableUnits (units) {
  switch (units) {
    case NAUTICAL_MILES:
      return 'Nautical Miles'
    case METERS:
      return 'Meters'
    default:
      return 'Unknown'
  }
}

function ShapeEditItem ({ draftShape, selectedDraftShapes, index, onSelectionChange, onPropertyChange }) {
  const radiusValue = draftShape.properties.radius ? draftShape.properties.radius : ''
  const selected = R.contains(draftShape.id, selectedDraftShapes)

  return (
    <li className="list-group-item">
      <Button
        bsStyle={selected ? 'success' : 'default'}
        active={selected}
        onClick={() => onSelectionChange(draftShape.properties.id)}
      >{selected ? 'Selected' : 'Not Selected'}</Button>
      <FieldGroup
        id="formControlsText"
        type="text"
        label="Title"
        value={draftShape.properties.title}
        onChange={event => onPropertyChange({
          id: draftShape.properties.id,
          property: {
            title: event.target.value
          }
        })}
      />
      <FormGroup>
        <ControlLabel>Center</ControlLabel>
        <FormControl.Static>{draftShape.properties.unformattedCoordinates}</FormControl.Static>
      </FormGroup>
      <FieldGroup
        id="formControlsText"
        type="text"
        label="Radius"
        value={radiusValue}
        help={humanReadableUnits(draftShape.properties.radiusUnits)}
        onChange={event => onPropertyChange({
          id: draftShape.properties.id,
          property: {
            radius: inspector.sanitize(radiusSanitization, event.target.value).data
          }
        })}
        validationState={inspector.validate(radiusSanitization, radiusValue).valid
          ? null
          : 'error'
        }
      />
      <FormGroup>
        <ControlLabel>Original Text Input</ControlLabel>
        <FormControl
          componentClass="textarea"
          value={draftShape.properties.context}
          readOnly
        />
      </FormGroup>
    </li>
  )
}

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
ShapeEditItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  draftShape: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  selectedDraftShapes: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
  onSelectionChange: PropTypes.func.isRequired,
  onPropertyChange: PropTypes.func.isRequired
}

export default ShapeEditItem
