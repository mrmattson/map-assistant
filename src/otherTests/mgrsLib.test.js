/* eslint-env jest */

// This is to verify the npm library 'mgrs' with NGA Gold Data

import mgrs from 'mgrs'

import { mgrsDistWithinXmeters, latLonDistWithinXmeters } from '../TestTools/coordTestHelpers'
import latLonToMgrs from '../TestData/LatLon2Mgrs'
import mgrsToLatLon from '../TestData/Mgrs2LatLon'

describe('Lat/Lon to MGRS', () => {
  it('Gold Data, No polar locations', () => {
    const accuracy = Math.sqrt(2)
    latLonToMgrs.input.map((inputLatLon, index) => {
      const computedMgrs = mgrs.forward([inputLatLon.lon, inputLatLon.lat])
      const actualMgrs = latLonToMgrs.output[index].mgrs
      const isWithinAccuracy = mgrsDistWithinXmeters(computedMgrs, actualMgrs, accuracy)
      return expect(isWithinAccuracy).toBe(true)
    })
  })
  it('Random points', () => {
    const latLonInput = [
      {
        lat: 20.384586,
        lon: -42.383485
      }, {
        lat: 6.032846,
        lon: -165.345962
      }, {
        lat: -56.489224,
        lon: 30.458293
      }, {
        lat: -9.392834,
        lon: 174.485832
      }, {
        lat: 48.489384,
        lon: 38.489422
      }
    ]
    const mgrsOutput = [
      {
        mgrs: '23QQC7310256213'
      }, {
        mgrs: '3NVG6171466847'
      }, {
        mgrs: '36EUC4350736574'
      }, {
        mgrs: '60LTQ2387760727'
      }, {
        mgrs: '37UDP6227470821'
      }
    ]
    const accuracy = Math.sqrt(2)
    latLonInput.map((inputLatLon, index) => {
      const computedMgrs = mgrs.forward([inputLatLon.lon, inputLatLon.lat])
      const actualMgrs = mgrsOutput[index].mgrs
      const isWithinAccuracy = mgrsDistWithinXmeters(computedMgrs, actualMgrs, accuracy)
      return expect(isWithinAccuracy).toBe(true)
    })
  })
})

describe('MGRS to Lat/Lon', () => {
  it('Gold Data, No polar locations', () => {
    const accuracy = 0.15 / 60 / 60
    mgrsToLatLon.input.map((inputMgrs, index) => {
      let computedLatLon = mgrs.toPoint(inputMgrs.mgrs)
      computedLatLon = {
        latitude: computedLatLon[1],
        longitude: computedLatLon[0]
      }
      const latLon = mgrsToLatLon.output[index]
      const actualLatLon = `${latLon.lat} ${latLon.lon}`
      const isWithinAccuracy = latLonDistWithinXmeters(computedLatLon, actualLatLon, accuracy)
      return expect(isWithinAccuracy).toBe(true)
    })
  })
  it('Random points', () => {
    const mgrsInput = [
      {
        mgrs: '23QQC7310256213'
      }, {
        mgrs: '3NVG6171466847'
      }, {
        mgrs: '36EUC4350736574'
      }, {
        mgrs: '60LTQ2387760727'
      }, {
        mgrs: '37UDP6227470821'
      }
    ]
    const latLonOutput = [
      {
        lat: '20 23 04.5 N',
        lon: '042 23 00.6 W'
      }, {
        lat: '06 01 58.2 N',
        lon: '165 20 45.5 W'
      }, {
        lat: '56 29 21.2 S',
        lon: '030 27 29.8 E'
      }, {
        lat: '09 23 34.2 S',
        lon: '174 29 09.0 E'
      }, {
        lat: '48 29 21.8 N',
        lon: '038 29 21.9 E'
      }
    ]
    const accuracy = 0.15 / 60 / 60
    mgrsInput.map((inputMgrs, index) => {
      let computedLatLon = mgrs.toPoint(inputMgrs.mgrs)
      computedLatLon = {
        latitude: computedLatLon[1],
        longitude: computedLatLon[0]
      }
      const latLon = latLonOutput[index]
      const actualLatLon = `${latLon.lat} ${latLon.lon}`
      const isWithinAccuracy = latLonDistWithinXmeters(computedLatLon, actualLatLon, accuracy)
      return expect(isWithinAccuracy).toBe(true)
    })
  })
})
