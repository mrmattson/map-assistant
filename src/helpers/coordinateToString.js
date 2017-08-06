import magellan from 'magellan-coords'
import math from 'mathjs'
import pad from 'pad'

function secondsToString (seconds) {
  let secStr = ''
  const roundSeconds = math.round(seconds, 1).toString()
  if (roundSeconds.includes('.')) {
    secStr = `${pad(4, roundSeconds, '0')}`
  } else {
    secStr = `${pad(2, roundSeconds, '0')}.0`
  }
  return secStr
}

function coordinateToString (coordinate) {
  const lon = magellan(coordinate[0]).longitude().coordinate
  const lat = magellan(coordinate[1]).latitude().coordinate

  const latString = `${pad(2, lat.degrees, '0')} ${pad(2, lat.minutes, '0')} ${secondsToString(lat.seconds)} ${lat.direction}`

  const lonString = `${pad(3, lon.degrees, '0')} ${pad(2, lon.minutes, '0')} ${secondsToString(lon.seconds)} ${lon.direction}`

  return `${latString}   ${lonString}`
}

export default coordinateToString
