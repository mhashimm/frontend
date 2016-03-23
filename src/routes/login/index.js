module.exports = {
  path: 'login',
  name: 'تسجيل الدخول',

  // getChildRoutes(location, cb) {
  //   require.ensure([], (require) => {
  //     cb(null, [
  //       require('./routes/faculties'),
  //       require('./routes/departments'),
  //       require('./routes/courses'),
  //       require('./routes/programs')
  //     ])
  //   })
  // },

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/login'))
    })
  }
}
