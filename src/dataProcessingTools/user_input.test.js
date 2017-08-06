/* eslint-env jest */

import { latLonDistWithinXmeters } from '../TestTools/coordTestHelpers'
import locFind from './user_input'

describe('user_input', () => {
  it('import loads', () => {
    expect(typeof locFind.mgrsExtract).toBe('function')
    expect(typeof locFind.latLonExtract).toBe('function')
  })

  it('extracts MGRS points from free text set #1', () => {
    const freeText = 'This place is really great: 18TWM0243158103. You should check it out.\nHere too: 18T WM 019 735.'

    const expectedPoints = ['18T WM 02431 58103', '18T WM 019 735']

    const resultsArray = locFind.mgrsExtract(freeText)

    resultsArray.map(
      (result, i) => expect(result.formattedMgrs).toBe(expectedPoints[i])
    )
  })

  it('extracts lat/lon points from free text set #2', () => {
    const freeText = 'This place is really great: N34 48 23 W054 34 33. You should check it out.\nHere too: 1111.11N02222.22W.'

    const expectedPoints = ['34 48 23 N, 054 34 33 W', '11 11.11 N, 022 22.22 W']

    const resultsArray = locFind.latLonExtract(freeText)

    resultsArray.map(
      (result, i) => expect(result.formattedLatLon).toBe(expectedPoints[i])
    )
  })
  it('extracts both lat/lon and MGRS points from free text set #3 and they\'re the same point', () => {
    const accuracy = 0.15 / 60 / 60  // 0.15 seconds

    const freeText = 'This place is really great: 56 29 21.2S 030 27 29.8E. You should check it out.\nHere too: 36E UC 43507 36574.\nThese points are the same point in different coordinates'

    const expectedPoints = ['56 29 21.2 S, 030 27 29.8 E', '36E UC 43507 36574']

    const latLonResultsArray = locFind.latLonExtract(freeText)
    const mgrsResultsArray = locFind.mgrsExtract(freeText)

    expect(latLonResultsArray[0].formattedLatLon).toBe(expectedPoints[0])
    expect(mgrsResultsArray[0].formattedMgrs).toBe(expectedPoints[1])

    expect(latLonResultsArray[0].mgrs).toBe(mgrsResultsArray[0].mgrs)

    const isWithinAccuracy = latLonDistWithinXmeters(
      mgrsResultsArray[0],
      latLonResultsArray[0].formattedLatLon,
      accuracy
    )
    expect(isWithinAccuracy).toBe(true)
  })
})
