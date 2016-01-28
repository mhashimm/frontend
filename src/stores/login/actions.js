import config from 'config'
const keycloakConf = require('keycloak')

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

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS'
export function tokenRefreshed(token){
  return {
    type: TOKEN_SUCCESS,
    token
  }
}

export const TOKEN_FAILURE = 'TOKEN_FAILURE'
export function tokenFailed(error){
  return {
    type: TOKEN_FAILURE,
    error
  }
}

export function login(){
  return function(dispatch){
    dispatch(beginLogin())
    var keycloak = new  keycloakConf(config.keycloak)
    if(config.appEnv === 'dist'){
      keycloak.init({
        onLoad: 'login-required',
        checkLoginIframe: false
      }).success(authenticated => {
          if(!authenticated)
            dispatch(loginFailure())
          else {
            global.keycloak = keycloak
            dispatch(loginSuccess())

            /**************************ORG WORKER****************************/
            var orgWorker = require('worker!../../workers/orgWorker.js');
            var worker = new orgWorker();
            worker.postMessage(
              {
                token: keycloak.token,
                version: 1,
                username: keycloak.tokenParsed.username
              });
          }
        }).error(error => dispatch(loginFailure(error)))

      keycloak.onTokenExpired = () => keycloak.updateToken()
        .success(refreshed => refreshed ? dispatch(tokenRefreshed(global.keycloak.token)) : dispatch(tokenFailed()))
        .error(error => dispatch(loginFailure(error)))
    }
   else dispatch(loginSuccess())
  }
}
