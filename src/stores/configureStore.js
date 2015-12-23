const config = require('config')

if (config.default.appEnv === 'dist') {
  module.exports = require('./configureStore.prod');
} else if (config.default.appEnv === 'dev' || config.default.appEnv === 'test') {
  module.exports = require('./configureStore.dev');
}
