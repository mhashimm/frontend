import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router } from 'react-router'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'

import facultyReducers from '../stores/admin/facultyReducers'

const reducer = combineReducers({facultyReducers ,
  routing: routeReducer})

const store = createStore(reducer)

const history = useBasename(createHistory)({ basename: '/' })

syncReduxAndRouter(history, store)

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
  <Provider store={store}>
    <Router history={history} routes={rootRoute} />
  </Provider>,
  document.getElementById('app')
)
