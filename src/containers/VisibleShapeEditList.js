import { connect } from 'react-redux'
import { addShapes, toggleDraftShape, editShapeProperty } from '../actions'
import ShapeEditList from '../components/ShapeEditList'

function mapStateToProps (state) {
  return {
    draftShapes: state.draftShapes,
    selectedDraftShapes: state.selectedDraftShapes
  }
}

function mapDispatchToProps (dispatch) {
  return {
    saveShapesAsFinal: shapes => dispatch(addShapes(shapes)),
    onSelectionChange: id => dispatch(toggleDraftShape(id)),
    onPropertyChange: data => dispatch(editShapeProperty(data))
  }
}

const VisibleShapeEditList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShapeEditList)

export default VisibleShapeEditList
