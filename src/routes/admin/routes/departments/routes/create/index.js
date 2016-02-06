module.exports = {
  path: 'create',
  name: 'إضافة قسم',

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./components/create'))
    })
  }
}
