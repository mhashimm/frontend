import config from 'config'
import { BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, TOKEN_FAILURE, TOKEN_SUCCESS } from './actions'

export function loginReducer(state = {authenticated: false, pending: true}, action){
  switch (action.type) {
    case BEGIN_LOGIN:
      return Object.assign({}, state, {authenticated: false, pending: true})
    case LOGIN_SUCCESS:
      return Object.assign({}, state, parseToken(), { authenticated: true, pending: false})
    case LOGIN_FAILURE:
      return Object.assign({}, state, {authenticated: false, pending: false})
    case TOKEN_SUCCESS:
      return Object.assign({}, state, {token: action.token})
    case TOKEN_FAILURE:
      return Object.assign({}, state, {token: ''})
    default:
      return state
  }
}

function parseToken(){
  // //TODO this is not the way to go
  if(config.appEnv === 'dist') // || config.appEnv === 'dev')
    return {
      groups: global.keycloak.tokenParsed.groups.slice(),
      username: global.keycloak.tokenParsed.username,
      departments: global.keycloak.tokenParsed.departments.slice(),
      token: global.keycloak.token
  }
  else
    return{
      username: 'FAKE_USER',
      departments: ['math', 'bio'],
      token: '',
      groups: ['admin', 'dean', 'professor', 'report', 'admitter']
    }
}
