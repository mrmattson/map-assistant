const SampleKMLData = {
  kml: [],
  geojson: []
}

SampleKMLData.kml.push(`
<kml xmlns="http://www.opengis.net/kml/2.2">
<Document>
  <name>My Golf Course Example</name>
  <Placemark>
    <name>Club house</name>
    <ExtendedData>
      <Data name="holeNumber">
        <value>1</value>
      </Data>
      <Data name="holeYardage">
        <value>234</value>
      </Data>
      <Data name="holePar">
        <value>4</value>
      </Data>
    </ExtendedData>
    <Point>
      <coordinates>-111.956,33.5043</coordinates>
    </Point>
  </Placemark>
  <Placemark>
    <name>By the lake</name>
    <ExtendedData>
      <Data name="holeNumber">
        <value>5</value>
      </Data>
      <Data name="holeYardage">
        <value>523</value>
      </Data>
      <Data name="holePar">
        <value>5</value>
      </Data>
    </ExtendedData>
    <Point>
      <coordinates>-111.95,33.5024</coordinates>
    </Point>
  </Placemark>
</Document>
</kml>
`)

SampleKMLData.geojson.push({
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          -111.956,
          33.5043
        ]
      },
      properties: {
        name: 'Club house',
        holeNumber: 1,
        holeYardage: 234,
        holePar: 4
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          -111.95,
          33.5024
        ]
      },
      properties: {
        name: 'By the lake',
        holeNumber: 5,
        holeYardage: 523,
        holePar: 5
      }
    }
  ]
})

export default SampleKMLData
