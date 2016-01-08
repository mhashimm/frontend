import { FACULTY_CREATED, FACULTY_UPDATED, FACULTY_SAVED ,
   FACULTY_FAILED, FACULTY_CANCELED, FACULTIES_LOADED} from './actions'
import { SUCCESS, FAILURE, PENDING, EXISTING } from '~/stores/status'



export function reducer(state = [], action){
  var index;

  switch (action.type) {
    case FACULTIES_LOADED:
      return action.faculties
    case FACULTY_CANCELED:
    index = state.findIndex(f => f.id === action.id)
      return action.faculty !== undefined
      ? [
          ...state.slice(0, index),
          action.faculty,
          ...state.slice(index + 1)
       ]
      : [
         ...state.slice(0, index),
         ...state.slice(index + 1)
       ]
    case FACULTY_CREATED:
      return [
        Object.assign({}, action.faculty, { status: PENDING }),
         ...state
       ]
    case FACULTY_UPDATED:
      index = state.findIndex(f => f.id === action.faculty.id)
      return [
        ...state.slice(0, index),
        Object.assign({}, action.faculty, { status: PENDING }),
        ...state.slice(index + 1)
        ]
    case FACULTY_SAVED:
      index = state.findIndex(f => f.id === action.faculty.id)
      return [
        ...state.slice(0, index),
        Object.assign({}, action.faculty, { status: SUCCESS }),
        ...state.slice(index + 1)
        ]
    case FACULTY_FAILED:
      index = state.findIndex(f => f.id === action.faculty.id)
      return [
        ...state.slice(0, index),
        Object.assign({}, action.faculty, { status: FAILURE }),
        ...state.slice(index + 1)
        ]
    default:
      return state
  }
}
