
const RootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    component: require('./App'),
    childRoutes: [
      require('../routes/admin')
    ]
  } ]
}

export default RootRoute
