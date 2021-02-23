/**
 * Suppresses the `requestAnimationFrame` warning
 */
global.requestAnimationFrame = function (callback) {
  setTimeout(callback, 0)
}

global.FormData = function () {
  this.append = jest.fn()
}

// Fixes error caused by Apollo Client
global.fetch = jest.fn()
