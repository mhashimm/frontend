import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
//import DevTools from './devTools'
import { Router, browserHistory } from 'react-router'

import configureStore from '~/stores/configureStore'
import isOnline from '~/stores/isOnline'
import entityUpdateWorkerDispatch from '../workers/entityUpdateWorkerDispatch'
import RootRoute from './RootRoutes'

const store = configureStore()

//hook sisdn webworkers
isOnline(store)
entityUpdateWorkerDispatch(store)

render(
  <Provider store={store}>
    <div>
      {/*<DevTools/>*/}
      <Router history={browserHistory} routes={RootRoute} />
    </div>
  </Provider>,
  document.getElementById('app')
)
