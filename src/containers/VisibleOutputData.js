import { connect } from 'react-redux'
// import { addShapes, toggleDraftShape } from '../actions'
import OutputData from '../components/OutputData'

const mapStateToProps = state => ({
  shapes: state.shapes
})

const mapDispatchToProps = dispatch => ({
})

const VisibleOutputData = connect(
  mapStateToProps,
  mapDispatchToProps
)(OutputData)

export default VisibleOutputData
