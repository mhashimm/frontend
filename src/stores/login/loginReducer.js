import config from 'config'
import { BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions'

export function loginReducer(state = {authenticated: false, pending: true}, action){
  switch (action.type) {
    case BEGIN_LOGIN:
      return Object.assign({}, state, {authenticated: false, pending: true})
    case LOGIN_SUCCESS:
      return Object.assign({}, state, parseToken(action.token), { authenticated: true, pending: false})
    case LOGIN_FAILURE:
      return Object.assign({}, state, {authenticated: false, pending: false})
    default:
      return state
  }
}

function parseToken(token){
  if(config.appEnv === 'dist')
    return {
      username: token.preferred_username,
      departments: token.departments.slice(),
      groups: token.groups.slice(),
      claims: token.claims.slice()
    }
  else
    return{
      username: 'محمد',
      departments: ['math', 'bio'],
      groups: ['admin', 'dean', 'professor', 'report', 'admitter']
    }
}
