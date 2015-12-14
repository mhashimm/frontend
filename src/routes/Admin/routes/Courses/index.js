module.exports = {
  path: 'courses',

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Create'),
        require('./routes/Details'),
        require('./routes/Update')
      ])
    })
  },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Courses'))
    })
  }
}
