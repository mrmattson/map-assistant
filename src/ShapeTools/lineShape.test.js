/* eslint-env jest */
/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
/* eslint-disable better/explicit-return */

import toDeepEqual from '../TestTools/toDeepEqual'
import { createLineShape } from './lineShape'
import examples from '../TestData/lines'

expect.extend({
  toDeepEqual
})

const testSetup = {}

describe('createLineShape()', () => {
  beforeEach(() => {
    testSetup.result = createLineShape(examples.lineString.geometry.coordinates, {
      id: 'randomstringofcharacters'
    })

    testSetup.expected = examples.lineString
  })

  it('outputs the correct object', () => {
    expect(testSetup.result).toDeepEqual(testSetup.expected)
  })

  it('root level properties are present and correct', () => {
    Object.keys(testSetup.expected).forEach((key) => {
      expect(testSetup.result.hasOwnProperty(key)).toBe(true)
    })
  })

  it('properties object is correct', () => {
    expect(testSetup.result.properties).toDeepEqual(testSetup.expected.properties)
  })

  it('coordinates are correct', () => {
    testSetup.result.geometry.coordinates.forEach((coord, index) => {
      expect(coord).toEqual(testSetup.expected.geometry.coordinates[index])
    })
  })
})
