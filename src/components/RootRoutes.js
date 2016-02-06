
const RootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    name: 'الرئيسية',
    component: require('./App'),
    childRoutes: [
      require('../routes/admin')
    ]
  } ]
}

export default RootRoute
