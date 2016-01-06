module.exports = {
  path: 'details',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/details'))
    })
  }
}
