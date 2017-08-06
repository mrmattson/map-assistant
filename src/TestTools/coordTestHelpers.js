import pad from 'pad'

import locFind from '../dataProcessingTools/user_input'

function breakUpMgrs (mgrsString, digitsLength) {
  const beginString = mgrsString.slice(0, -(digitsLength * 2))
  const eastingDigitsString = mgrsString.substr(-(digitsLength * 2), digitsLength)
  const northingDigitsString = mgrsString.substr(-digitsLength, digitsLength)
  return {
    beginning: beginString,
    easting: parseInt(pad(eastingDigitsString, 5, '0'), 10),
    northing: parseInt(pad(northingDigitsString, 5, '0'), 10)
  }
}

export function mgrsDistWithinXmeters (mgrsString1, mgrsString2, accuracyMeters) {
  let digitLength = 0
  switch (mgrsString1.length) {
    case 15:
    case 14:
      digitLength = 5
      break
    case 13:
    case 12:
      digitLength = 4
      break
    case 11:
    case 10:
    default:
      digitLength = 3
  }
  const mgrs1 = breakUpMgrs(mgrsString1, digitLength)

  switch (mgrsString2.length) {
    case 15:
    case 14:
      digitLength = 5
      break
    case 13:
    case 12:
      digitLength = 4
      break
    case 11:
    case 10:
    default:
      digitLength = 3
  }
  const mgrs2 = breakUpMgrs(mgrsString2, digitLength)

  if (mgrs1.beginning === mgrs2.beginning) {
    const eastingDiff = mgrs2.easting - mgrs1.easting
    const northingDiff = mgrs2.northing - mgrs1.northing
    const overallDiff = Math.sqrt((eastingDiff * eastingDiff) + (northingDiff * northingDiff))
    if (overallDiff <= accuracyMeters) {
      return true
    }
  }
  return false
}

export function latLonDistWithinXmeters (latLonObject1, latLonString2, accuracyDegrees) {
  const latLon1 = latLonObject1
  const latLon2 = locFind.latLonExtract(latLonString2)[0]

  const latDiff = latLon2.latitude - latLon1.latitude
  const lonDiff = latLon2.longitude - latLon1.longitude
  const overallDiff = Math.sqrt((latDiff * latDiff) + (lonDiff * lonDiff))

  if (overallDiff <= accuracyDegrees) {
    return true
  }
  return false
}

export function latLonToString (latLonObject) {
  let latitude = latLonObject.lat
  let hemisphere = ''
  if (latitude > 0) {
    hemisphere = 'N'
  } else {
    hemisphere = 'S'
  }
  latitude = Math.abs(latitude)

  let degStr = pad(2, Math.floor(latitude).toString(), '0')
  latitude = (latitude - Math.floor(latitude)) * 60
  let minStr = pad(2, Math.floor(latitude).toString(), '0')
  latitude = (latitude - Math.floor(latitude)) * 60
  let secStr = pad(2, Math.floor(latitude).toString(), '0')
  let secDecStr = (latitude - Math.floor(latitude)).toString().substr(2, 2)

  const latStr = `${degStr} ${minStr} ${secStr}.${secDecStr}${hemisphere}`

  let longitude = latLonObject.lon
  if (longitude > 0) {
    hemisphere = 'E'
  } else {
    hemisphere = 'W'
  }
  longitude = Math.abs(longitude)

  degStr = pad(3, Math.floor(longitude).toString(), '0')
  longitude = (longitude - Math.floor(longitude)) * 60
  minStr = pad(2, Math.floor(longitude).toString(), '0')
  longitude = (longitude - Math.floor(longitude)) * 60
  secStr = pad(2, Math.floor(longitude).toString(), '0')
  secDecStr = (longitude - Math.floor(longitude)).toString().substr(2, 2)

  const lonStr = `${degStr} ${minStr} ${secStr}.${secDecStr}${hemisphere}`

  return `${latStr} ${lonStr}`
}
