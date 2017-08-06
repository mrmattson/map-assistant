/* eslint-env jest */

import toDeepEqual from '../TestTools/toDeepEqual'
import { createPointShape } from './pointShape'
import examples from '../TestData/points'

expect.extend({
  toDeepEqual
})

const testSetup = {}

describe('createPointShape()', () => {
  beforeEach(() => {
    testSetup.result = createPointShape(examples.customPoint.geometry.coordinates, {
      id: 'randomstringofcharacters',
      unformattedCoordinates: '38.981830N 93.871400W',
      context: 'abc 38.981830N 93.871400W',
      contextHighlight: [4, 21]
    })

    testSetup.expected = examples.customPoint
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
    const resultCoord = testSetup.result.geometry.coordinates
    const expectedCoord = testSetup.expected.geometry.coordinates
    expect(resultCoord).toEqual(expectedCoord)
  })
})
