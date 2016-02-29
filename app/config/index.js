// NOTE: I have to use require instead of ES6 modules because ES6 modules do not
// support dynamic lookup just yet. They have to be resolved statically.

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./production.js')
} else {
  module.exports = require('./development.js')
}
