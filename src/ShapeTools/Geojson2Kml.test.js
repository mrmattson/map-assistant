/* eslint-env jest */

import linePolygons from '../TestData/lines'
import circlePolygons from '../TestData/circles'
import multiPolygons from '../TestData/multiplePolygons'
import points from '../TestData/points'
import mixedShapes from '../TestData/mixedShapes'

import Geojson2Kml from './Geojson2Kml'

describe('Geojson2Kml', () => {
  it('creates an accurate line KML string.', () => {
    const result = Geojson2Kml(linePolygons.lineString)
    expect(result).toEqual(linePolygons.lineStringKML)
  })

  it('creates an accurate circle polygon KML string.', () => {
    const result = Geojson2Kml(circlePolygons.circlePolygon)
    expect(result).toEqual(circlePolygons.circlePolygonKML)
  })

  it('creates an accurate point KML string.', () => {
    const result = Geojson2Kml(points.customPoint)
    expect(result).toEqual(points.pointKML)
  })

  it('creates accurate mixed shapes KML string.', () => {
    const result = Geojson2Kml(mixedShapes.featureCollection)
    expect(result).toEqual(mixedShapes.mixedKML)
  })

  it.skip('creates accurate multiple polygons KML string.', () => {
    const result = Geojson2Kml(multiPolygons.polygonFeatureCollection)
    expect(result).toEqual(multiPolygons.polygonsKML)
  })

  it.skip('creates an accurate text point KML string.', () => {
    const result = Geojson2Kml(points.customText)
    expect(result).toEqual(points.textKML)
  })
})
