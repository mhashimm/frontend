
import keycloakConf from './keycloakConf'
const keycloakObject = require('keycloak')


export const BEGIN_LOGIN = 'BEGIN_LOGIN'
export function beginLogin(){
  return {
    type: BEGIN_LOGIN
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function loginSuccess(token){
  return {
    type: LOGIN_SUCCESS,
    token
  }
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export function loginFailure(error){
  return {
    type: LOGIN_FAILURE,
    error
  }
}

export const LOGOUT = 'LOGOUT'
export function logout(){
  return {
    type: LOGOUT
  }
}

export function login(){
  return function(dispatch, getState){
    dispatch(beginLogin())
    const keycloak = new  keycloakObject({...keycloakConf})
    return keycloak.init({ onLoad: 'login-required' })
    .success(authenticated => authenticated
      ? dispatch(loginSuccess(keycloak.idTokenParsed))
      : dispatch(loginFailure()))
    .error(
      error => dispatch(loginFailure(error)))
  }
}
