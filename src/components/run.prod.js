import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncReduxAndRouter} from 'redux-simple-router'

import configureStore from '~/stores/configureStore'
import isOnline from '~/stores/isOnline'
import entityUpdateWorkerDispatch from '../workers/entityUpdateWorkerDispatch'
import RootRoute from './RootRoutes'

const store = configureStore()

isOnline(store)
entityUpdateWorkerDispatch(store)

render(
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={RootRoute} />
    </div>
  </Provider>,
  document.getElementById('app')
)
