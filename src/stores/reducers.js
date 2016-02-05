import { combineReducers } from 'redux'
import { routeReducer } from 'react-router-redux'
import {reducer as formReducer} from 'redux-form'

import { loginReducer } from './login/loginReducer'
import {reducer as facultyReducer} from '../routes/admin/routes/faculties/store/reducer'
import {reducer as departmentReducer} from '../routes/admin/routes/departments/store/reducer'
import {reducer as coursesReducer} from '../routes/admin/routes/courses/store/reducer'
import {reducer as programsReducer} from '../routes/admin/routes/programs/store/reducer'
import {reducer as onlineReducer} from './online/reducer'

const rootReducer = combineReducers({
  faculties: facultyReducer,
  departments: departmentReducer,
  courses: coursesReducer,
  programs: programsReducer,
  form: formReducer,
  routing: routeReducer,
  user: loginReducer,
  isOnline: onlineReducer
  }
)

export default rootReducer
