import { createStore } from 'redux';
import rootReducer from './reducers';

//TODO do I need this parameter <export default function configureStore(initialState)>
export default function configureStore() {
  const store = createStore(rootReducer)
  return store
}
