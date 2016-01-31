import * as actType from './actions'

export function reducer(state = [], action){
  var index;

  switch (action.type) {
    case actType.DEPARTMENTS_LOADED:
      return action.departments

    case actType.DEPARTMENT_CANCELED:
      index = state.findIndex(f => f.id === action.id)
      return action.department !== undefined
      ? [
          ...state.slice(0, index),
          action.department,
          ...state.slice(index + 1)
       ]
      : [
         ...state.slice(0, index),
         ...state.slice(index + 1)
       ]

    case actType.DEPARTMENT_ADDED:
      return [
        action.department,
         ...state
       ]

    case actType.DEPARTMENT_UPDATED:
      index = state.findIndex(f => f.id === action.department.id)
      return [
        ...state.slice(0, index),
        action.department,
        ...state.slice(index + 1)
        ]

    default:
      return state
  }
}
