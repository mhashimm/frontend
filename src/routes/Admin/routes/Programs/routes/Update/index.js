module.exports = {
  path: 'update',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Update'))
    })
  }
}