import { connect } from 'react-redux'
// import { addShapes, toggleDraftShape } from '../actions'
import ShapeList from '../components/ShapeList'

const mapStateToProps = state => ({
  shapes: state.shapes
})

const mapDispatchToProps = dispatch => ({
})

const VisibleShapeInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShapeList)

export default VisibleShapeInput
