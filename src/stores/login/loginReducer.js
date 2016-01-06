import config from 'config'
import { BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from './actions'

export function loginReducer(state = {authenticated: false, pending: true}, action){
  switch (action.type) {
    case BEGIN_LOGIN:
      return Object.assign({}, state, {authenticated: false, pending: true})
    case LOGIN_SUCCESS:
      return Object.assign({}, state, parseToken(), { authenticated: true, pending: false})
    case LOGIN_FAILURE:
      return Object.assign({}, state, {authenticated: false, pending: false})
    default:
      return state
  }
}

function parseToken(){
  //TODO this is not the way to go
  if(config.appEnv === 'dist' || config.appEnv === 'dev')
    return {
      username: global.keycloak.tokenParsed.username,
      departments: global.keycloak.tokenParsed.departments.slice(),
      groups: global.keycloak.tokenParsed.groups.slice()
    }
  else
    return{
      username: 'mhashim',
      departments: ['math', 'bio'],
      groups: ['admin', 'dean', 'professor', 'report', 'admitter']
    }
}
