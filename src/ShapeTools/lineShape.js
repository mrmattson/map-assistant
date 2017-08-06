import R from 'ramda'
import turfHelpers from '@turf/helpers'

import idToTopLevel from './idToTopLevel'
import fixSimpleStyleProps from './fixSimpleStyleProps'

/**
 * Generate a GeoJSON line string with custom and simplestyle-spec properties.
 * @param {array} coordinates - Location in degrees decimal Lat/Lon with format [lon, lat].
 * @param {Object} props - Descriptive shape properties. At a minimum, 'id' is required.
 * @param {string} props.id - Unique ID. Required.
 * @param {string} props.title [Point] - Short text title.
 * @param {string} props.description [Point feature] - Longer text, typically the context of the
 * shape, i.e. where it came from.
 * @param {string} props.stroke [#E25822] - Color of the outline in hex code.
 * @param {string} props.strokeWidth [4] - Width of the outline.
 */
export function createLineShape (coordinates, props) {
  const properties = R.mergeAll([
    {
      title: 'Line',
      description: 'Line feature',
      stroke: '#E25822',
      strokeWidth: 4
    },
    props,
    { shape: 'Line' }
  ])

  const f = R.pipe(turfHelpers.lineString, idToTopLevel, fixSimpleStyleProps)

  return f(coordinates, properties)
}
