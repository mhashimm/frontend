
const RootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    name: 'الرئيسية',
    component: require('./App'),
    childRoutes: [
      require('../routes/admin'),
      require('../routes/login')
    ]
  } ]
}

export default RootRoute
