import { combineReducers } from 'redux'
import R from 'ramda'
import shortid from 'shortid'
import turfIntersect from '@turf/intersect'

import usaLower48Outline from './helpers/usaLower48Outline'

import {
  NEW_RAW_TEXT,
  PROCESS_RAW_TEXT,
  TOGGLE_DRAFT_SHAPE,
  EDIT_SHAPE_PROPERTY,
  ADD_SHAPES,
  REMOVE_SHAPE,
  SUGGEST_COORDINATE
  // ShapeTypes
} from './actions'
import processRawText from './dataProcessingTools/user_input'
import { createCircleShape, recalculateCircleShape } from './ShapeTools/circleShape'
import coordinateToString from './helpers/coordinateToString'

const DEFAULT_SHAPE_FILTER = usaLower48Outline

function uniqueShapeConstructor (shapeConstructor, originalText) {
  return function delayedShapeConstructor (processed) {
    return shapeConstructor([processed.longitude, processed.latitude], {
      id: shortid.generate(),
      unformattedCoordinates: processed.originalInput,
      context: originalText,
      contextHighlight: processed.originalHighlight
    })
  }
}

// eslint-disable-next-line fp/no-nil
function rawText (state = '', action) {
  switch (action.type) {
    case NEW_RAW_TEXT:
      return action.rawText
    case SUGGEST_COORDINATE:
      const coordinateString = coordinateToString(action.coordinate)
      if (state === '') {
        return `${coordinateString}`
      }
      return `${state}\n${coordinateString}`

    case PROCESS_RAW_TEXT:
      return ''
    default:
      return state
  }
}

// eslint-disable-next-line fp/no-nil
function draftShapes (state = [], action) {
  switch (action.type) {
    case PROCESS_RAW_TEXT:
      return R.filter(draftShape => turfIntersect(DEFAULT_SHAPE_FILTER, draftShape),
      R.flatten(
        R.append(
          R.map(
            uniqueShapeConstructor(createCircleShape, action.rawText),
            processRawText.latLonExtract(action.rawText)
          ), state
        )
      )
    )
    case TOGGLE_DRAFT_SHAPE:
      return state.map((draftShape) => {
        if (draftShape.id === action.id) {
          return R.merge(draftShape, { selected: !draftShape.selected })
        }
        return draftShape
      })
    case EDIT_SHAPE_PROPERTY:
      return state.map((draftShape) => {
        if (draftShape.id === action.data.id) {
          const newProperties = R.merge(draftShape.properties, action.data.property)
          const newPropertiesShape = R.merge(draftShape, { properties: newProperties })
          return recalculateCircleShape(newPropertiesShape)
        }
        return draftShape
      })
    case ADD_SHAPES:
      return R.filter(draftShape => R.none(addedShapes => addedShapes.properties.id === draftShape.properties.id, action.shapes), state)
    default:
      return state
  }
}

// eslint-disable-next-line fp/no-nil
function selectedDraftShapes (state = [], action) {
  switch (action.type) {
    case TOGGLE_DRAFT_SHAPE:
      if (R.contains(action.id, state)) {
        return R.filter(id => id !== action.id, state)
      }
      return R.append(action.id, state)
    case ADD_SHAPES:
      return []
    default:
      return state
  }
}

// eslint-disable-next-line fp/no-nil
function shapes (state = [], action) {
  switch (action.type) {
    case ADD_SHAPES:
      return R.concat(state, action.shapes)
    case REMOVE_SHAPE:
      return R.filter(shape => shape.id === action.id, state)
    default:
      return state
  }
}

const shapeMapApp = combineReducers({
  rawText,
  draftShapes,
  selectedDraftShapes,
  shapes
})

export default shapeMapApp
