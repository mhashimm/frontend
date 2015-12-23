module.exports = {
  path: 'update/:id',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Update'))
    })
  }
}
