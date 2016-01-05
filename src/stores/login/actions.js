import config from 'config'
const keycloakObject = require('keycloak')

export const BEGIN_LOGIN = 'BEGIN_LOGIN'
export function beginLogin(){
  return {
    type: BEGIN_LOGIN
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function loginSuccess(){
  return {
    type: LOGIN_SUCCESS
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
    //if(config.appEnv === 'dist'){
      let keycloak = new  keycloakObject(config.keycloak)
      keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false
      })
        .success(authenticated => authenticated
          ? dispatch(loginSuccess()) : dispatch(loginFailure())
        )
        .error(error => dispatch(loginFailure(error)))

      keycloak.onTokenExpired = () => keycloak.updateToken()
        .success(refreshed => refreshed ? dispatch(loginSuccess()) : dispatch(loginFailure()))
        .error(error => dispatch(loginFailure(error)))


      global.keycloak = keycloak
    //}
    //else dispatch(loginSuccess())
  }
}
