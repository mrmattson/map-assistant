/*
 * action types
 */

export const NEW_RAW_TEXT = 'NEW_RAW_TEXT'
export const PROCESS_RAW_TEXT = 'PROCESS_RAW_TEXT'
export const TOGGLE_DRAFT_SHAPE = 'TOGGLE_DRAFT_SHAPE'
export const EDIT_SHAPE_PROPERTY = 'EDIT_SHAPE_PROPERTY'
export const ADD_SHAPES = 'ADD_SHAPES'
export const REMOVE_SHAPE = 'REMOVE_FINAL_SHAPE'
export const SUGGEST_COORDINATE = 'SUGGEST_COORDINATE'

/*
 * other constants
 */

export const ShapeTypes = {
  POINT: 'POINT',
  LINE: 'LINE',
  CIRCLE: 'CIRCLE'
  // POLYGON: 'POLYGON'
}

/*
 * action creators
 */

export function newRawText (rawText) {
  return { type: NEW_RAW_TEXT, rawText }
}

export function processRawText (rawText) {
  return { type: PROCESS_RAW_TEXT, rawText }
}

export function toggleDraftShape (id) {
  return { type: TOGGLE_DRAFT_SHAPE, id }
}

export function editShapeProperty (data) {
  return { type: EDIT_SHAPE_PROPERTY, data }
}

export function addShapes (shapes) {
  return { type: ADD_SHAPES, shapes }
}

export function removeShape (shape) {
  return { type: REMOVE_SHAPE, shape }
}

export function suggestCoordinate (coordinate) {
  return { type: SUGGEST_COORDINATE, coordinate }
}
