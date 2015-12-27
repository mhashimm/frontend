import { BEGIN_LOGIN, LOGIN_SUCCESS, login } from './actions'

export function loginReducer(state = {authenticated: false}, action){
  switch (action.type) {
    case BEGIN_LOGIN:
      return state;
    case LOGIN_SUCCESS:
      return Object.assign({}, state, parseToken(action.token), { authenticated: true})
    default:
      return state
  }
}

function parseToken(token){
  return {
    username: token.preferred_username,
    departments: token.departments.slice(),
    groups: token.groups.slice(),
    claims: token.claims.slice()
  }
}
