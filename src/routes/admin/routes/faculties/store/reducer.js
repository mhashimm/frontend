import * as actType from './actions'

export function reducer(state = [], action){
  var index;

  switch (action.type) {
    case actType.FACULTIES_LOADED:
      return action.faculties

    case actType.FACULTY_CANCELED:
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

    case actType.FACULTY_ADDED:
      return [
        action.faculty,
         ...state
       ]

    case actType.FACULTY_UPDATED:
      index = state.findIndex(f => f.id === action.faculty.id)
      return [
        ...state.slice(0, index),
        action.faculty,
        ...state.slice(index + 1)
        ]

    default:
      return state
  }
}
