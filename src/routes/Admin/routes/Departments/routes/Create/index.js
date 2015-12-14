module.exports = {
  path: 'create',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Create'))
    })
  }
}
