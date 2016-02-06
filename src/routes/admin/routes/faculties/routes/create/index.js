module.exports = {
  path: 'create',
  name: 'إضافة كلية',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/create'))
    })
  }
}
