/* eslint-disable quotes */
/* eslint-disable fp/no-mutation */

const pointTestData = {}

pointTestData.customPoint = {
  type: "Feature",
  id: "randomstringofcharacters",
  properties: {
    id: "randomstringofcharacters",
    shape: "Point",
    unformattedCoordinates: "38.981830N 93.871400W",
    context: "abc 38.981830N 93.871400W",
    contextHighlight: [4, 21],
    title: "Point",
    description: "Point feature",
    stroke: '#E25822',
    'stroke-width': 4
  },
  geometry: {
    type: "Point",
    coordinates: [-93.871400, 38.981830]
  }
}

// const pointFeatures = [
//   pointTestData.customText,
//   pointTestData.customPoint
// ]
// pointTestData.pointFeatureCollection = turfHelpers.featureCollection(pointFeatures)

pointTestData.pointKML = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Generated from GeoConverter</name><description>This data is generated from data input into Geo File Converter.</description><Placemark><name>Point</name><description>Point feature</description><ExtendedData><Data name="id"><value>randomstringofcharacters</value></Data><Data name="shape"><value>Point</value></Data><Data name="unformattedCoordinates"><value>38.981830N 93.871400W</value></Data><Data name="context"><value>abc 38.981830N 93.871400W</value></Data><Data name="contextHighlight"><value>4,21</value></Data><Data name="title"><value>Point</value></Data><Data name="description"><value>Point feature</value></Data><Data name="stroke"><value>#E25822</value></Data><Data name="stroke-width"><value>4</value></Data></ExtendedData><Point><coordinates>-93.8714,38.98183</coordinates></Point></Placemark></Document></kml>'

export default pointTestData
