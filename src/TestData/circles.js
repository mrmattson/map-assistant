/* eslint-disable quotes */
/* eslint-disable fp/no-mutation */

const circleTestData = {}

// ------------------------
// Center: 39.0997° N, 94.5786° W
// 10 NM = 18.52 km

// 000: 39°15′59″N, 094°34′43″W
  // 94.578611111, 39.266388889
// 030: 39°14′38″N, 094°28′16″W
  // 94.471111111, 39.243888889
// 060: 39°10′58″N, 094°23′33″W
  // 94.392500000, 39.182777778
// 090: 39°05′58″N, 094°21′50″W
  // 94.363888889, 39.099444444
// 120: 39°00′59″N, 094°23′35″W
  // 94.393055556, 39.016388889
// 150: 38°57′19″N, 094°28′17″W
  // 94.471388889, 38.955277778
// 180: 38°55′59″N, 094°34′43″W
  // 94.578611111, 38.933055556
// 210: 38°57′19″N, 094°41′08″W
  // 94.685555556, 38.955277778
// 240: 39°00′59″N, 094°45′51″W
  // 94.764166667, 39.016388889
// 270: 39°05′58″N, 094°47′36″W
  // 94.793333333, 39.099444444
// 300: 39°10′58″N, 094°45′53″W
  // 94.764722222, 39.182777778
// 330: 39°14′38″N, 094°41′10″W
  // 94.686111111, 39.243888889
// 360: 39°15′59″N, 094°34′43″W
  // 94.578611111, 39.266388889

circleTestData.centerPoint = [-94.5786, 39.0997]

circleTestData.circlePolygon = {
  type: "Feature",
  id: "randomstringofcharacters",
  properties: {
    id: "randomstringofcharacters",
    shape: "Circle",
    unformattedCoordinates: "39.0997N 94.5786W",
    context: "abcd 39.0997N 94.5786W",
    contextHighlight: [5, 17],
    title: "Circle",
    description: "Circle feature",
    stroke: "#E25822",
    "stroke-width": 4,
    fill: '#000000',
    "fill-opacity": 0.2,
    radius: 10,
    radiusUnits: "nauticalMiles",
    numSides: 36,
    centerCoordinates: [-94.5786, 39.0997]
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-94.5786, 39.2665183258],
        [-94.5413366638, 39.2639780687],
        [-94.5052134056, 39.2564350157],
        [-94.4713347059, 39.2441198948],
        [-94.4407350507, 39.227409246],
        [-94.4143468808, 39.2068136933],
        [-94.3929719395, 39.1829620795],
        [-94.3772569248, 39.156581988],
        [-94.367674183, 39.1284772896],
        [-94.3645079875, 39.0995034373],
        [-94.3678467396, 39.0705412947],
        [-94.3775812257, 39.042470313],
        [-94.3934088701, 39.0161418788],
        [-94.4148437414, 38.9923536321],
        [-94.441231913, 38.9718255137],
        [-94.4717716408, 38.9551782327],
        [-94.5055377113, 38.9429147699],
        [-94.5415092236, 38.9354054344],
        [-94.5786, 38.9328768873],
        [-94.6156907764, 38.9354054344],
        [-94.6516622887, 38.9429147699],
        [-94.6854283592, 38.9551782327],
        [-94.715968087, 38.9718255137],
        [-94.7423562586, 38.9923536321],
        [-94.7637911299, 39.0161418788],
        [-94.7796187743, 39.042470313],
        [-94.7893532604, 39.0705412947],
        [-94.7926920125, 39.0995034373],
        [-94.789525817, 39.1284772896],
        [-94.7799430752, 39.156581988],
        [-94.7642280605, 39.1829620795],
        [-94.7428531192, 39.2068136933],
        [-94.7164649493, 39.227409246],
        [-94.6858652941, 39.2441198948],
        [-94.6519865944, 39.2564350157],
        [-94.6158633362, 39.2639780687],
        [-94.5786, 39.2665183258]
      ]
    ]
  }
}

circleTestData.circlePolygonKML = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2"><Document><name>Generated from GeoConverter</name><description>This data is generated from data input into Geo File Converter.</description><Style id="sE25822sw4f000000fo02"><LineStyle><color>ff2258e2</color><width>4</width></LineStyle><PolyStyle><color>33000000</color></PolyStyle></Style><Placemark><name>Circle</name><description>Circle feature</description><ExtendedData><Data name="id"><value>randomstringofcharacters</value></Data><Data name="shape"><value>Circle</value></Data><Data name="unformattedCoordinates"><value>39.0997N 94.5786W</value></Data><Data name="context"><value>abcd 39.0997N 94.5786W</value></Data><Data name="contextHighlight"><value>5,17</value></Data><Data name="title"><value>Circle</value></Data><Data name="description"><value>Circle feature</value></Data><Data name="stroke"><value>#E25822</value></Data><Data name="stroke-width"><value>4</value></Data><Data name="fill"><value>#000000</value></Data><Data name="fill-opacity"><value>0.2</value></Data><Data name="radius"><value>10</value></Data><Data name="radiusUnits"><value>nauticalMiles</value></Data><Data name="numSides"><value>36</value></Data><Data name="centerCoordinates"><value>-94.5786,39.0997</value></Data></ExtendedData><Polygon><outerBoundaryIs><LinearRing><coordinates>-94.5786,39.2665183258 -94.5413366638,39.2639780687 -94.5052134056,39.2564350157 -94.4713347059,39.2441198948 -94.4407350507,39.227409246 -94.4143468808,39.2068136933 -94.3929719395,39.1829620795 -94.3772569248,39.156581988 -94.367674183,39.1284772896 -94.3645079875,39.0995034373 -94.3678467396,39.0705412947 -94.3775812257,39.042470313 -94.3934088701,39.0161418788 -94.4148437414,38.9923536321 -94.441231913,38.9718255137 -94.4717716408,38.9551782327 -94.5055377113,38.9429147699 -94.5415092236,38.9354054344 -94.5786,38.9328768873 -94.6156907764,38.9354054344 -94.6516622887,38.9429147699 -94.6854283592,38.9551782327 -94.715968087,38.9718255137 -94.7423562586,38.9923536321 -94.7637911299,39.0161418788 -94.7796187743,39.042470313 -94.7893532604,39.0705412947 -94.7926920125,39.0995034373 -94.789525817,39.1284772896 -94.7799430752,39.156581988 -94.7642280605,39.1829620795 -94.7428531192,39.2068136933 -94.7164649493,39.227409246 -94.6858652941,39.2441198948 -94.6519865944,39.2564350157 -94.6158633362,39.2639780687 -94.5786,39.2665183258</coordinates></LinearRing></outerBoundaryIs></Polygon><styleUrl>#sE25822sw4f000000fo02</styleUrl></Placemark></Document></kml>'

export default circleTestData
