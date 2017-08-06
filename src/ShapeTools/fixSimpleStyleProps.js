import R from 'ramda'

/**
 * Add hyphen to simplestyle properties that need them.
 * @param {Object} feature - GeoJSON Feature object.
 * @return {Object} - Clone of input Feature object with simplestyle fixed.
 */
export default function fixSimplestyleProps (feature) {
  const newFeature = R.clone(feature)
  // FIX Definitely not functional, yet
  const brokenProps = {
    strokeWidth: 'stroke-width',
    fillOpacity: 'fill-opacity'
  }
  Object.keys(brokenProps).map((key) => {
    if (newFeature.properties[key]) {
      newFeature.properties[brokenProps[key]] = newFeature.properties[key]
      delete newFeature.properties[key]
    }
  })
  return newFeature
}
