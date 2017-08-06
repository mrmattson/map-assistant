import inspector from 'schema-inspector'

import validBasicShape from './validBasicShape'

/**
 * Valid basic polygon shape schema.
 *
 * Not to be used alone. Rather, it's to be used with another polygon shape validation
 * to check all the appropriate properties.
 */

const basicPolygonValidation = {
  type: 'object',
  properties: {
    properties: {
      type: 'object',
      properties: {
        fill: { type: 'string' },
        'fill-opacity': { type: 'number', gte: 0, lte: 1 }
      }
    },
    geometry: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
          eq: 'Polygon'
        },
        coordinates: {
          type: 'array',
          minLength: 1,
          items: {
            type: 'array',
            minLength: 4,
            items: {
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
  }
}

/**
 * Check custom and simplestyle-spec properties of GeoJSON circle polygon are valid.
 * @param {Object} polygonShape - GeoJSON polygon shape with custom properties.
 * @return {object}
 */
export default function valideBasicPolygonShape (polygonShape) {
  const results = validBasicShape(polygonShape)
  if (!results.valid) {
    return results
  }
  return inspector.validate(basicPolygonValidation, polygonShape)
}
