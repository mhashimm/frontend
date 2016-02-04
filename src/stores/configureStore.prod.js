import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers';
import { browserHistory } from 'react-router'
import { syncHistory } from 'redux-simple-router'

const reduxRouterMiddleware = syncHistory(browserHistory)

const logger = createLogger()

const finalCreateStore = compose(
  /* Middleware you want to use in development: */
  applyMiddleware(thunk, reduxRouterMiddleware, logger)
)(createStore);


export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)
  reduxRouterMiddleware.listenForReplays(store)
  return store
}
