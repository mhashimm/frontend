import * as actType from './actions'

export function reducer(state = [], action){
  var index;

  switch (action.type) {
    case actType.PROGRAMS_LOADED:
      return action.programs

    case actType.PROGRAM_CANCELED:
      index = state.findIndex(p => p.id === action.id)
      return action.program !== undefined
      ? [
          ...state.slice(0, index),
          action.program,
          ...state.slice(index + 1)
       ]
      : [
         ...state.slice(0, index),
         ...state.slice(index + 1)
       ]

    case actType.PROGRAM_ADDED:
      return [
        action.program,
         ...state
       ]

    case actType.PROGRAM_UPDATED:
      index = state.findIndex(p => p.id === action.program.id)
      return [
        ...state.slice(0, index),
        action.program,
        ...state.slice(index + 1)
        ]

    default:
      return state
  }
}
