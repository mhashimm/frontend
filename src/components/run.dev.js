import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
//import DevTools from './devTools'
import { syncReduxAndRouter} from 'redux-simple-router'

import configureStore from '~/stores/configureStore'
import isOnline from '~/stores/isOnline'
import entityUpdateWorkerDispatch from '../workers.entityUpdateWorkerDispatch'
import RootRoute from './RootRoutes'

const store = configureStore()
global.store = store

isOnline(store)
entityUpdateWorkerDispatch(store)

const history = useBasename(createHistory)({ basename: '/' })
syncReduxAndRouter(history, store)

render(
  <Provider store={store}>
    <div>
      {/*<DevTools/>*/}
      <Router history={history} routes={RootRoute} />
    </div>
  </Provider>,
  document.getElementById('app')
)
