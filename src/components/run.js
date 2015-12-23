import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { syncReduxAndRouter} from 'redux-simple-router'

import configureStore from '~/stores/configureStore'

const store = configureStore()
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

render(
  <Provider store={store}>
    <div>
      <DevTools />
      <Router history={history} routes={rootRoute} />
    </div>
  </Provider>,
  document.getElementById('app')
)
