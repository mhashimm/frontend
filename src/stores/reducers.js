import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import {reducer as formReducer} from 'redux-form'

import { loginReducer } from './login/loginReducer'
import facultyReducers from './admin/facultyReducers'

const rootReducer = combineReducers({
  faculties: facultyReducers,
  form: formReducer,
  routing: routeReducer,
  user: loginReducer
  }
)

export default rootReducer
