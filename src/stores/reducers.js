import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import {reducer as formReducer} from 'redux-form'

import { loginReducer } from './login/loginReducer'
import {facultyReducer} from '../routes/admin/routes/faculties/store/reducer'

const rootReducer = combineReducers({
  faculties: facultyReducer,
  form: formReducer,
  routing: routeReducer,
  user: loginReducer
  }
)

export default rootReducer
