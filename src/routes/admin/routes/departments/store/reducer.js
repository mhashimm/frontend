import * as actType from './actions'

export function reducer(state = [], action){
  var index;

  switch (action.type) {
    case actType.DEPARTMENTS_LOADED:
      return action.entities

    case actType.DEPARTMENT_CANCELED:
      index = state.findIndex(f => f.id === action.id)
      return action.entity !== undefined
      ? [
          ...state.slice(0, index),
          action.entity,
          ...state.slice(index + 1)
       ]
      : [
         ...state.slice(0, index),
         ...state.slice(index + 1)
       ]

    case actType.DEPARTMENT_ADDED:
      return [
        action.entity,
         ...state
       ]

    case actType.DEPARTMENT_UPDATED:
      index = state.findIndex(f => f.id === action.entity.id)
      return [
        ...state.slice(0, index),
        action.entity,
        ...state.slice(index + 1)
        ]

    default:
      return state
  }
}
