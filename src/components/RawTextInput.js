import React from 'react'
import PropTypes from 'prop-types'
import {
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap'

function RawTextInput ({ rawText, onRawTextChange, processRawText }) {
  return (
    <div className="RawTextInput">
      <FormGroup>
        <ControlLabel>Text Input</ControlLabel>
        <FormControl
          componentClass="textarea"
          className="RawTextInput-rawTextTextarea"
          onChange={event => onRawTextChange(event.target.value)}
          value={rawText}
        />
      </FormGroup>
      <Button
        bsSize="large"
        bsStyle="primary"
        onClick={() => processRawText(rawText)}
      >Process Text</Button>
    </div>
  )
}

// https://facebook.github.io/react/docs/typechecking-with-proptypes.html
RawTextInput.propTypes = {
  rawText: PropTypes.string.isRequired,
  onRawTextChange: PropTypes.func.isRequired,
  processRawText: PropTypes.func.isRequired
}

export default RawTextInput
