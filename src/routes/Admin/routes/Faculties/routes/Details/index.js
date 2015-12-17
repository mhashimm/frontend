module.exports = {
  path: 'details/:id',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Details'))
    })
  }
}
