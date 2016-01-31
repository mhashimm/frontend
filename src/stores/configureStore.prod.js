import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './reducers';

const logger = createLogger()
//TODO do I need this parameter <export default function configureStore(initialState)>
// export default function configureStore() {
//   const store = createStore(rootReducer)
//   return store
// }


const finalCreateStore = compose(
  /* Middleware you want to use in development: */
  applyMiddleware(thunk, logger)
)(createStore);


export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
