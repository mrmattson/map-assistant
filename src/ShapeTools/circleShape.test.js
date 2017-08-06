/* eslint-env jest */

import toDeepEqual from '../TestTools/toDeepEqual'
import { createCircleShape, validCircleShape } from './circleShape'
import examples from '../TestData/circles'

expect.extend({
  toDeepEqual
})

const testSetup = {}

describe('createCircleShape()', () => {
  beforeEach(() => {
    testSetup.result = createCircleShape(examples.centerPoint, {
      id: 'randomstringofcharacters',
      unformattedCoordinates: '39.0997N 94.5786W',
      context: 'abcd 39.0997N 94.5786W',
      contextHighlight: [5, 17],
      radius: 10,
      radiusUnits: 'nauticalMiles',
      numSides: 36
    })

    testSetup.expected = examples.circlePolygon
  })

  it('outputs the correct object', () => {
    expect(testSetup.result).toDeepEqual(testSetup.expected)
  })

  it('root level properties are present and correct', () => {
    Object.keys(testSetup.expected).forEach((key) => {
      expect(Object.prototype.hasOwnProperty.call(testSetup.result, key)).toBe(true)
    })
  })

  it('properties object is correct', () => {
    expect(testSetup.result.properties).toDeepEqual(testSetup.expected.properties)
  })

  it('coordinates are correct', () => {
    testSetup.result.geometry.coordinates[0].forEach((coord, index) => {
      expect(coord).toEqual(testSetup.expected.geometry.coordinates[0][index])
    })
  })
})

describe('validCircleShape()', () => {
  beforeEach(() => {
    testSetup.example = examples.circlePolygon
  })

  it('returns true for correct circle shapes', () => {
    const result = validCircleShape(testSetup.example)
    if (!result.valid) {
      // eslint-disable-next-line no-console
      console.log(result.format())
    }
    expect(result.valid).toBe(true)
  })
})
