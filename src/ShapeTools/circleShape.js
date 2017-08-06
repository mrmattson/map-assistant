import R from 'ramda'
import math from 'mathjs'
import turfHelpers from '@turf/helpers'
// import turfCircle from '@turf/circle'
import geoUtils from 'wgs84-util'
import inspector from 'schema-inspector'

// import { createPointShape } from './pointShape'  // Using @turf/circle
import idToTopLevel from './idToTopLevel'
import fixSimpleStyleProps from './fixSimpleStyleProps'
import validBasicPolygonShape from './validBasicPolygonShape'

import {
  NAUTICAL_MILES,
  METERS,
  STROKE_COLOR,
  STROKE_WIDTH,
  FILL_COLOR,
  FILL_OPACITY,
  SHAPE_CIRCLE,
  TITLE,
  DESCRIPTION,
  NUM_SIDES,
  RADIUS,
  CENTER_COORDINATES
} from '../helpers/constants'

/**
 * Convert units of length to meters.
 * @param {number} value - Value of the units.
 * @param {string} units - Units in a common string form. Ex: 'nauticalMiles', 'feet', 'meters'
 * @returns {number}
 */
function unitsToMeters (value, units) {
  const nauticalMilesToMeters = 1852
  let ans = 0
  if (units === NAUTICAL_MILES) {
    ans = math.multiply(value, nauticalMilesToMeters)
  } else {
    ans = math.unit(value, units).toNumber(METERS)
  }
  return ans
}
// Using @turf/circle
// function unitsToKilometers (value, units) {
//   const nauticalMilesToKilometers = 1.852
//   if (units === NAUTICAL_MILES) {
//     return math.multiply(value, nauticalMilesToKilometers)
//   } else {
//     return math.unit(value, units).toNumber(METERS)
//   }
// }

/**
 * Generate linear ring of vertice coordinates for a circle.
 * @param {Object} circle - Properties of the circle to be created.
 * @param {array} circle.centerCoordinates [0, 0]- Location of the center of the circle in [lon, lat].
 * @param {number} circle.radius [5] - Length of the radius of the circle in the units (below).
 * @param {string} circle.radiusUnits ['nauticalMiles'] - The units of the circle's radius (above).
 * @param {number} circle.numSides [12] - The number of sides of the final polygon.
 * @return {array} - Linear ring.
 */
function calculateCircleLinearRing (circle) {
  const numSides = circle.numSides ? circle.numSides : NUM_SIDES
  const radius = circle.radius ? circle.radius : RADIUS
  const radiusUnits = circle.radiusUnits ? circle.radiusUnits : NAUTICAL_MILES
  const centerCoordinates = circle.centerCoordinates ? circle.centerCoordinates : CENTER_COORDINATES
  const stepAngle = math.divide(360, numSides)
  const bearings = math.range(stepAngle, 360, stepAngle, true).valueOf()
  const radiusMeters = unitsToMeters(radius, radiusUnits)

  const line = bearings.map((bearing) => {
    const result = geoUtils.destination(
      // Seems like a bug in wgs84-util.  A GeoJSON Point has a geometry object that has a
      // coordinates property.  Coordinates property is not root level.
      { coordinates: centerCoordinates },
      bearing,
      radiusMeters
    )
    // Same bug in wgs84-util as input: GeoJSON Point has a geometry object and the
    // finalBearing property should be under a 'properties' object.
    return Array.from(result.point.coordinates)
  })

  return [R.prepend(R.last(line), line)]
}

/**
 * Generate a GeoJSON polygon in the form of a circle with custom and simplestyle-spec properties.
 * @param {array} coordinates - Location in degrees decimal Lat/Lon with format [lon, lat]. Required.
 * @param {Object} props - Descriptive shape properties. At a minimum, 'id' is required.
 * @param {string} props.id - Unique ID. Required.
 * @param {string} props.unformattedCoordinates - Original, unformatted text of coordinates.
 * @param {string} props.context - [] Originating context.
 * @param {array}  props.contextHighlight - [0, 0] Start and length of location string in context.
 * @param {string} props.title [Circle] - Short text title.
 * @param {string} props.description [Circle feature] - Longer text, typically the context of the
 * shape, i.e. where it came from.
 * @param {string} props.stroke [#E25822] - Color of the outline in hex code.
 * @param {string} props.strokeWidth [4] - Width of the outline.
 * @param {string} props.fill [#000000] - Color of the fill in hex code.
 * @param {string} props.fillOpacity [0.2] - Opacity of the fill (zero to one).
 * @param {number} props.radius [5] - Length of the radius of the circle in the units (below).
 * @param {string} props.radiusUnits [nauticalMiles] - The units of the circle's radius (above).
 * @param {number} props.numSides [12] - The number of sides of the final polygon.
 * @return {Object} - GeoJSON polygon with custom properties.
 */
export function createCircleShape (coordinates, props) {
  // Using @turf/Circle
  // const centerPoint = createPointShape(coordinates, props)

  const properties = R.mergeAll([
    {
      title: TITLE,
      description: DESCRIPTION,
      stroke: STROKE_COLOR,
      strokeWidth: STROKE_WIDTH,
      fill: FILL_COLOR,
      fillOpacity: FILL_OPACITY,
      radius: RADIUS,
      radiusUnits: NAUTICAL_MILES,
      numSides: NUM_SIDES,
      centerCoordinates: coordinates
    },
    props,
    { shape: SHAPE_CIRCLE }
  ])

  // Using @turf/Circle
  // const circleFeature = R.merge(turfCircle(centerPoint,
  //   unitsToKilometers(properties.radius, properties.radiusUnits),
  //   props.numSides,
  //   'kilometers'
  // ), { properties })
  // return R.pipe(idToTopLevel, fixSimpleStyleProps)(circleFeature)

  const f = R.pipe(turfHelpers.polygon, idToTopLevel, fixSimpleStyleProps)

  const linearRing = calculateCircleLinearRing(properties)

  return f(linearRing, properties)
}

/**
 * Regenerate the linear ring of a GeoJSON polygon in the form of a circle with
 * custom and simplestyle-spec properties.
 * @param {Object} circleShape - GeoJSON polygon with custom properties.
 * @return {Object} - GeoJSON polygon with custom properties.
 */
export function recalculateCircleShape (circleShape) {
  return createCircleShape(circleShape.properties.centerCoordinates, circleShape.properties)
}

/**
 * Valid circle shape schema.
 */

const circleValidation = {
  type: 'object',
  properties: {
    properties: {
      type: 'object',
      properties: {
        shape: { type: 'string', eq: SHAPE_CIRCLE },
        radius: { type: 'number', gt: 0 },
        radiusUnits: {
          type: 'string',
          eq: [
            NAUTICAL_MILES
          ]
        },
        numSides: { type: 'number', gte: 3 },
        centerCoordinates: {
          type: 'array',
          exactLength: 2,
          items: [
            {
              type: 'number',
              gte: -180,
              lte: 180
            },
            {
              type: 'number',
              gte: -90,
              lte: 90
            }
          ]
        }
      }
    }
  }
}

/**
 * Check custom and simplestyle-spec properties of GeoJSON circle polygon are valid.
 * @param {Object} circleShape - GeoJSON polygon with custom properties.
 * @return {object}
 */
export function validCircleShape (circleShape) {
  const results = validBasicPolygonShape(circleShape)
  if (!results.valid) {
    return results
  }
  return inspector.validate(circleValidation, circleShape)
}
