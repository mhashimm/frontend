import { FACULTY_CREATED, FACULTY_UPDATED } from './actions'

var facs = [
  {'id': 'med', 'title': 'كلية الطب', 'titleTr': 'Faculty Of Medicine', 'isActive': true},
  {'id': 'law', 'title': 'كلية القانون', 'titleTr': 'Law School', 'isActive': false},
  {'id': 'econ', 'title': 'كلية الاقتصاد', 'titleTr': 'Faculty Of Economics', 'isActive': true}
]

function facultyReducer(state = facs, action){
  window.console.log('KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK')
  switch (action.type) {
    case FACULTY_CREATED:
      return [
        Object.assign({}, action.faculty, {isActive: true}),
        ...state
      ]
    case FACULTY_UPDATED:
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

module.exports = facultyReducer;
