import { connect } from 'react-redux'
import { suggestCoordinate } from '../actions'
import MapView from '../components/MapView'

function mapStateToProps (state) {
  const { draftShapes, shapes } = state
  return {
    draftShapes,
    shapes
  }
}

function mapDispatchToProps (dispatch) {
  return {
    suggestCoordinate: (coordinate) => {
      dispatch(suggestCoordinate(coordinate))
    }
  }
}

const VisibleMapView = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)

export default VisibleMapView
