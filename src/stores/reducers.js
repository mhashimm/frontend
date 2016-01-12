import { combineReducers } from 'redux'
import { routeReducer } from 'redux-simple-router'
import {reducer as formReducer} from 'redux-form'

import { loginReducer } from './login/loginReducer'
import {reducer as facultyReducer} from '../routes/admin/routes/faculties/store/reducer'
import {reducer as departmentReducer} from '../routes/admin/routes/departments/store/reducer'

const rootReducer = combineReducers({
  faculties: facultyReducer,
  departments: departmentReducer,
  form: formReducer,
  routing: routeReducer,
  user: loginReducer
  }
)

export default rootReducer
