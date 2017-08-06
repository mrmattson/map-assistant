import is from 'is_js'
import deepEqual from 'deep-eql'

export default function toDeepEqual (received, actual) {
  const pass = is.object(received) === true &&
    is.object(actual) === true &&
    deepEqual(received, actual) === true
  const message = `Expected ${JSON.stringify(received)} to ${pass ? 'not' : ''} equal ${JSON.stringify(actual)}`
  return { message, pass }
}
