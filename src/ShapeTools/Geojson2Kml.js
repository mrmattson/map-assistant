import is from 'is_js'
import tokml from 'tokml'
import turfHelpers from '@turf/helpers'
import togeojson from '@mapbox/togeojson'

// FIX - remove, debug stuff
import sampleKMLData from '../TestData/sampleKMLData'

function tokmlFromShapes (shapesArray) {
  return tokml(turfHelpers.featureCollection(shapesArray))
}

// FIX - move to new file
// Kml2Geojson File
togeojson.kmlString = function togeojsonKmlString (kmlString) {
  const parser = new DOMParser()
  return togeojson.kml(parser.parseFromString(kmlString, 'application/xml'))
}

// FIX - remove, debug stuff
window.turf = turfHelpers
window.tokml = tokmlFromShapes
window.togeojson = togeojson.kmlString
window.samples = sampleKMLData

export default function geojson2kml (features, docOptions) {
  let cleanDocOptions
  if (is.not.existy(docOptions) || is.not.object(docOptions)) {
    cleanDocOptions = {
      documentName: 'Generated from GeoConverter',
      documentDescription: 'This data is generated from data input into Geo File Converter.'
    }
  } else {
    cleanDocOptions = docOptions
  }
  const config = Object.assign({}, cleanDocOptions, {
    name: 'title',
    description: 'description',
    simplestyle: true
  })

  return tokml(features, config)
}
