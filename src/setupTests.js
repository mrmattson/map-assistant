// ===== ===== ===== ===== ===== =====
// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#testing-components
import 'jest-enzyme'
// ===== ===== ===== ===== ===== =====

// ===== ===== ===== ===== ===== =====
// Reason: https://github.com/facebook/jest/issues/1644
// Source: https://gist.github.com/paulirish/1579671
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

(function () {
  let lastTime = 0
  const vendors = ['ms', 'moz', 'webkit', 'o']
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`]
    window.cancelAnimationFrame = window[`${vendors[x]}CancelAnimationFrame`] ||
      window[`${vendors[x]}CancelRequestAnimationFrame`]
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function requestAnimationFrame (callback, element) {
      const currTime = new Date().getTime()
      const timeToCall = Math.max(0, 16 - (currTime - lastTime))
      const id = window.setTimeout(() => callback(currTime + timeToCall), timeToCall)
      lastTime = currTime + timeToCall
      return id
    }
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function cancelAnimationFrame (id) {
      clearTimeout(id)
    }
  }
}())
// ===== ===== ===== ===== ===== =====
