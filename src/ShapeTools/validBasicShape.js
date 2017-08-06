import inspector from 'schema-inspector'

/**
 * Valid basic shape schema.
 *
 * Not to be used alone. Rather, it's to be used with another shape validation
 * to check all the appropriate properties.
 */

const basicValidation = {
  type: 'object',
  properties: {
    type: { type: 'string', eq: 'Feature' },
    id: { type: 'string', minLength: 1 },
    properties: {
      type: 'object',
      properties: {
        id: { type: 'string', minLength: 1 },
        unformattedCoordinates: { type: 'string', minLength: 1 },
        context: { type: 'string' },
        contextHighlight: {
          type: 'array',
          exactLength: 2,
          items: [
            {
              type: 'number',
              gte: 0
            },
            {
              type: 'number',
              gte: 0
            }
          ]
        },
        title: { type: 'string' },
        description: { type: 'string' },
        stroke: { type: 'string' },
        'stroke-width': { type: 'number', gt: 0 }
      }
    }
  }
}

/**
 * Check custom and simplestyle-spec properties of GeoJSON circle polygon are valid.
 * @param {Object} shape - GeoJSON shape with custom properties.
 * @return {object}
 */
export default function valideBasicShape (shape) {
  return inspector.validate(basicValidation, shape)
}
