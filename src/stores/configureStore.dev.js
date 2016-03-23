import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers';
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import DevTools from '../components/devTools';

const logger = createLogger()
const reduxRouterMiddleware = syncHistory(browserHistory)

const finalCreateStore = compose(
  /* Middleware you want to use in development: */
  applyMiddleware(thunk, reduxRouterMiddleware, logger),
  /* Required! Enable Redux DevTools with the monitors you chose */
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
)(createStore);

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers')/*.default if you use Babel 6+ */)
    );
  }
  reduxRouterMiddleware.listenForReplays(store)
  return store;
}
