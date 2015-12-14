module.exports = {
  path: 'admin',

  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes/Faculties'),
        require('./routes/Departments'),
        require('./routes/Courses'),
        require('./routes/Programs')
      ])
    })
  },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/Admin'))
    })
  }
}
