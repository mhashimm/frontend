module.exports = {
  path: 'create',
  name: 'إضافة مقرر',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/create'))
    })
  }
}
