import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router } from 'react-router'
//import App from './Main';

const history = useBasename(createHistory)({
  basename: '/SISDN'
})

const rootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    component: require('./App'),
    childRoutes: [
      require('../routes/Admin')
    ]
  } ]
}

// Render the main component into the dom
//ReactDOM.render(<App />, document.getElementById('app'));

render(
  <Router history={history} routes={rootRoute} />,
  document.getElementById('app')
)
