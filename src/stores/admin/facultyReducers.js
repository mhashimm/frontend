import {CREATE_FACULTY, UPDATE_FACULTY} from './actionTypes'

var facs = [
  {'id': 'med', 'title': 'كلية الطب', 'titleTr': 'Faculty Of Medicine', 'isActive': true},
  {'id': 'law', 'title': 'كلية القانون', 'titleTr': 'Law School', 'isActive': false},
  {'id': 'econ', 'title': 'كلية الاقتصاد', 'titleTr': 'Faculty Of Economics', 'isActive': true}
]

function facultyReducers(state = facs, action){
  switch (action.type) {
    case CREATE_FACULTY:
      return [
        Object.assign({}, action.faculty, {isActive: true}),
        ...state
      ]
    case UPDATE_FACULTY:
      const index = state.findIndex(f => f.id === action.faculty.id)
      return [
        ...state.slice(0, index),
        action.faculty,
        ...state.slice(index + 1)
      ]
    default:
      return state
  }
}

module.exports = facultyReducers;
