import * as actType from './actions'

export function reducer(state = [], action){
  var index;

  switch (action.type) {
    case actType.COURSES_LOADED:
      return action.courses

    case actType.COURSE_CANCELED:
      index = state.findIndex(c => c.id === action.id)
      return action.course !== undefined
      ? [
          ...state.slice(0, index),
          action.course,
          ...state.slice(index + 1)
       ]
      : [
         ...state.slice(0, index),
         ...state.slice(index + 1)
       ]

    case actType.COURSE_ADDED:
      return [
        action.course,
         ...state
       ]

    case actType.COURSE_UPDATED:
      index = state.findIndex(c => c.id === action.course.id)
      return [
        ...state.slice(0, index),
        action.course,
        ...state.slice(index + 1)
        ]

    default:
      return state
  }
}
