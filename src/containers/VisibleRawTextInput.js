import { connect } from 'react-redux'
import { newRawText, processRawText } from '../actions'
import RawTextInput from '../components/RawTextInput'

function mapStateToProps (state) {
  return {
    rawText: state.rawText
  }
}

function mapDispatchToProps (dispatch) {
  return {
    processRawText: (rawText) => {
      dispatch(processRawText(rawText))
    },
    onRawTextChange: (rawText) => {
      dispatch(newRawText(rawText))
    }
  }
}

const VisibleShapeInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawTextInput)

export default VisibleShapeInput
