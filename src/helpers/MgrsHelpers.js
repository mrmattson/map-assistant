import pad from 'pad'

function breakUpMgrs (mgrsString) {
  const digitsIndex = mgrsString.search(/\d{2,10}$/)
  const halfDigitsLength = (mgrsString.length - digitsIndex + 1) / 2

  const beginString = mgrsString.slice(0, digitsIndex)
  const eastingDigitsString = mgrsString.substr(digitsIndex, halfDigitsLength)
  const northingDigitsString = mgrsString.substr(-halfDigitsLength)
  return {
    beginning: beginString,
    easting: Number.parseInt(pad(eastingDigitsString, 5, '0'), 10),
    northing: Number.parseInt(pad(northingDigitsString, 5, '0'), 10)
  }
}

function mgrsDistWithinXmeters (mgrsString1, mgrsString2, accuracyMeters) {
  const mgrs1 = breakUpMgrs(mgrsString1)
  const mgrs2 = breakUpMgrs(mgrsString2)

  // Probably doesn't account for border nearness within accuracy define
  if (mgrs1.beginning === mgrs2.beginning) {
    const eastingDiff = mgrs2.easting - mgrs1.easting
    const northingDiff = mgrs2.northing - mgrs1.northing
    const overallDiff = Math.sqrt(eastingDiff * eastingDiff + northingDiff * northingDiff)
    if (overallDiff <= accuracyMeters) {
      return true
    }
    return false
  }
  return false
}

function latLonDistWithinXmeters (latLonObject1, latLonString2, accuracyDegrees) {
  const latLon1 = {
    latitude: latLonObject1.lat,
    longitude: latLonObject1.lon
  }
  const latLon2 = document.LocRec.latLonExtract(latLonString2)[0]
  const latDiff = latLon2.latitude - latLon1.latitude
  const lonDiff = latLon2.longitude - latLon1.longitude
  const overallDiff = Math.sqrt(latDiff * latDiff + lonDiff * lonDiff)

  if (overallDiff <= accuracyDegrees) {
    return true
  }
  return false
}

function latLonToString (latLonObject) {
  let hemisphere
  let degStr
  let minStr
  let secStr
  let secDecStr

  let latitude = latLonObject.lat
  if (latitude > 0) {
    hemisphere = 'N'
  } else {
    hemisphere = 'S'
  }
  latitude = Math.abs(latitude)

  degStr = pad(2, Math.floor(latitude).toString(), '0')
  latitude = (latitude - Math.floor(latitude)) * 60
  minStr = pad(2, Math.floor(latitude).toString(), '0')
  latitude = (latitude - Math.floor(latitude)) * 60
  secStr = pad(2, Math.floor(latitude).toString(), '0')
  latitude -= Math.floor(latitude)
  secDecStr = latitude.toString().substr(2, 2)
  const latStr = `${degStr} ${minStr} ${secStr}.${secDecStr} ${hemisphere}`

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
  longitude -= Math.floor(longitude)
  secDecStr = longitude.toString().substr(2, 2)
  const lonStr = `${degStr} ${minStr} ${secStr}.${secDecStr} ${hemisphere}`

  return `${latStr} ${lonStr}`
}
