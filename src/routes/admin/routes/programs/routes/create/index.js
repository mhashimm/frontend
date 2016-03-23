module.exports = {
  path: 'create',
  name: 'إضافة برنامج',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/create'))
    })
  }
}
