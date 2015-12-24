
const RootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    component: require('./App'),
    childRoutes: [
      require('../routes/Admin')
    ]
  } ]
}

export default RootRoute
