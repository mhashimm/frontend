import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import {reducer as formReducer} from 'redux-form'

import facultyReducers from './admin/facultyReducers'

// All reducers go here
const rootReducer = combineReducers({
  faculties: facultyReducers,
  form: formReducer,
  routing: routeReducer
  }
)

export default rootReducer
