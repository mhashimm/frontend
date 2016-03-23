module.exports = {
  path: 'programs',
  name: 'البرامج',

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/create'),
        require('./routes/details'),
        require('./routes/update')
      ])
    })
  },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/programsComponent'))
    })
  }
}
