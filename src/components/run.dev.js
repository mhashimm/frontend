import React from 'react'
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router } from 'react-router'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { syncReduxAndRouter} from 'redux-simple-router'

import configureStore from '~/stores/configureStore'
import RootRoute from './RootRoutes'

const store = configureStore()
const history = useBasename(createHistory)({ basename: '/' })
syncReduxAndRouter(history, store)

render(
  <Provider store={store}>
    <div>

      <Router history={history} routes={RootRoute} />
    </div>
  </Provider>,
  document.getElementById('app')
)
