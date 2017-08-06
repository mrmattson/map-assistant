import R from 'ramda'
import turfHelpers from '@turf/helpers'

import idToTopLevel from './idToTopLevel'
import fixSimpleStyleProps from './fixSimpleStyleProps'

/**
 * Generate a basic GeoJSON point with custom and simplestyle-spec properties.
 * @param {array} coordinates - Location in degrees decimal Lat/Lon with format [lon, lat].
 * @param {Object} props - Descriptive shape properties. At a minimum, 'id' is required.
 * @param {string} props.id - Unique ID. Required.
 * @param {string} props.unformattedCoordinates - Original, unformatted text of coordinates.
 * @param {string} props.context - [] Originating context.
 * @param {array}  props.contextHighlight - [0, 0] Start and length of location string in context.
 * @param {string} props.title [Point] - Short text title.
 * @param {string} props.description [Point feature] - Longer text, typically the context of the shape, i.e. where it came from.
 * @param {string} props.stroke [#E25822] - Color of the outline in hex code.
 * @param {string} props.strokeWidth [4] - Width of the outline.
 * @returns {Object}
 */
export function createPointShape (coordinates, props) {
  const f = R.pipe(turfHelpers.point, idToTopLevel, fixSimpleStyleProps)
  // Make sure to overwrite 'shape' property with correct shape
  const properties = R.mergeAll([{
    unformattedCoordinates: '',
    context: '',
    contextHighlight: [0, 0],
    title: 'Point',
    description: 'Point feature',
    stroke: '#E25822',
    strokeWidth: 4
  }, props, { shape: 'Point' }])
  return f(coordinates, properties)
}
