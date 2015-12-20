import {CREATE_FACULTY, UPDATE_FACULTY} from './actionTypes'

var facs = [
  {'id': 'med', 'title': 'كلية الطب', 'titleTr': 'Faculty Of Medicine', 'active': true},
  {'id': 'law', 'title': 'كلية القانون', 'titleTr': 'Law School', 'active': false},
  {'id': 'econ', 'title': 'كلية الاقتصاد', 'titleTr': 'Faculty Of Economics', 'active': true}
]

function facultyReducers(state = facs, action){
  return facs;
  switch (action.type) {
    case CREATE_FACULTY:
      return [
        ...state,
        Object.assign({}, action.faculty, {active: true})
      ]
    case UPDATE_FACULTY:
      return [
        ...state.filter(f => f.id !== action.faculty.id),
        Object.assign({}, action.faculty, {id: action.faculty.id})
      ]
    default:
      return state
  }
}

module.exports = facultyReducers;
