import R from 'ramda'

/**
 * Copy the ID string from GeoJSON properties to top level of the object.  Useful for OpenLayers.
 * @param {array} coordinates - GeoJSON Feature object.
 */
export default function idToTopLevel (feature) {
  if (!feature.properties.id) {
    throw new Error(`Shape ${JSON.stringify(feature)} does not have 'id' in 'properties'.`)
  }
  return R.merge(feature, { id: feature.properties.id })
}
