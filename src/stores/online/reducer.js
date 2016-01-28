import {IS_ONLINE, IS_OFFLINE} from './actions'


export function reducer(state = true, action){
  switch (action.type) {
    case IS_ONLINE : return action.online ? true : false
    default        : return state
  }
}
