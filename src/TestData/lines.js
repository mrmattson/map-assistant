/* eslint-disable quotes */
/* eslint-disable fp/no-mutation */

const lineTestData = {}

lineTestData.lineString = {
  type: "Feature",
  id: "randomstringofcharacters",
  properties: {
    id: "randomstringofcharacters",
    shape: "Line",
    title: "Line",
    description: "Line feature",
    stroke: "#E25822",
    "stroke-width": 4
  },
  geometry: {
    type: "LineString",
    coordinates: [
      [-94.394531, 39.333235],
      [-94.165191, 39.049052],
      [-94.107513, 39.256714],
      [-93.883666, 39.220551],
      [-93.871307, 38.981830]
    ]
  }
}

lineTestData.lineStringKML = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Generated from GeoConverter</name><description>This data is generated from data input into Geo File Converter.</description><Style id="sE25822sw4"><LineStyle><color>ff2258e2</color><width>4</width></LineStyle></Style><Placemark><name>Line</name><description>Line feature</description><ExtendedData><Data name="id"><value>randomstringofcharacters</value></Data><Data name="shape"><value>Line</value></Data><Data name="title"><value>Line</value></Data><Data name="description"><value>Line feature</value></Data><Data name="stroke"><value>#E25822</value></Data><Data name="stroke-width"><value>4</value></Data></ExtendedData><LineString><coordinates>-94.394531,39.333235 -94.165191,39.049052 -94.107513,39.256714 -93.883666,39.220551 -93.871307,38.98183</coordinates></LineString><styleUrl>#sE25822sw4</styleUrl></Placemark></Document></kml>'

export default lineTestData
