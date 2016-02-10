import config from 'config'
import createDb from '~/actions/createDb'
const keycloakConf = require('keycloak')

export const BEGIN_LOGIN = 'BEGIN_LOGIN'
export function beginLogin(){
  return {
    type: BEGIN_LOGIN
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function loginSuccess(user){
  return {
    type: LOGIN_SUCCESS,
    user
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

export function login(user){
  return function(dispatch){
    dispatch(beginLogin())
    var keycloak = new  keycloakConf(config.keycloak)
    keycloak.onAuthSuccess = function() { console.log('BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB'); }

    if(config.appEnv === 'dist'){
      keycloak.init({
        onLoad: 'check-sso',
        checkLoginIframe: true
      }).success(authenticated => {
          if(!authenticated) {
            keycloak.login()
            dispatch(loginFailure())
          }
          else {
            dispatch(loginSuccess({
            	groups: keycloak.tokenParsed.groups.slice(),
            	username: keycloak.tokenParsed.username,
            	departments: keycloak.tokenParsed.departments.slice(),
            	token: keycloak.token,
              refreshToken: keycloak.refreshToken
          	}))
          }
        }).error(error => dispatch(loginFailure(error)))

      keycloak.onTokenExpired = () => keycloak.updateToken()
        .success(refreshed => refreshed ? dispatch(tokenRefreshed(global.keycloak.token)) : dispatch(tokenFailed()))
        .error(error => dispatch(loginFailure(error)))
    }
   else dispatch(loginSuccess())
  }
}
