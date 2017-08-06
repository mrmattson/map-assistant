import turfHelpers from '@turf/helpers'
import exampleCircles from './circles'

const multiPolygonTestData = {}

const polygonFeatures = [
  exampleCircles.circlePolygon
]
multiPolygonTestData.polygonFeatureCollection = turfHelpers.featureCollection(polygonFeatures)

multiPolygonTestData.polygonsKML = ''

export default multiPolygonTestData
