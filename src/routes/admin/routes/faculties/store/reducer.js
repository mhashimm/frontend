import { FACULTY_CREATED, FACULTY_UPDATED, FACULTY_SAVED , FACULTY_FAILED} from './actions'
import { SUCCESS, FAILURE, PENDING, EXISTING } from '~/stores/status'

var facs = [
  {'id': 'med', 'title': 'كلية الطب', 'titleTr': 'Faculty Of Medicine', 'isActive': true, status: EXISTING},
  {'id': 'law', 'title': 'كلية القانون', 'titleTr': 'Law School', 'isActive': false, status: EXISTING},
  {'id': 'econ', 'title': 'كلية الاقتصاد', 'titleTr': 'Faculty Of Economics', 'isActive': true, status: EXISTING}
]

export function reducer(state = facs, action){
  var index;

  switch (action.type) {
    case FACULTY_CREATED:
      return [
        Object.assign({}, action.faculty, { isActive: true, status: PENDING }),
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
