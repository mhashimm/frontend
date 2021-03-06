import config from 'config'
import Dexie from 'dexie'
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
  return function(dispatch, getState){
    dispatch(beginLogin())

    var keycloak = new  keycloakConf(config.keycloak)
    keycloak.onTokenExpired = () => keycloak.updateToken()
      .success(refreshed => refreshed
        ? dispatch(tokenRefreshed(keycloak.token))
        : dispatch(tokenFailed()))
      .error(error => dispatch(tokenFailed()))

    var db = new Dexie('usersdb')
    db.version(config.db.version).stores({users: 'username, password, name, orgId, orgName, groups, refreshToken, departments, faculties'})
    db.open()

    db.users.get(user.username).then(u => {
      if(!!u && u.password === user.password && !!u.refreshToken){
        if(getState().isOnline)
          getAccessToken(u.refreshToken).then(response => keycloakInit(response))
        else { //login locally
          dispatch(loginSuccess({
            groups: u.groups.slice(),
            username: u.username,
            departments: u.departments.slice(),
            //faculties: u.faculties.slice(),
            token: undefined
          }))
        }
      }
      else { //login remotely
        getOfflineToken(user).then(response => {
          keycloakInit(response)
        })
      }
    })

    function keycloakInit(response){
      keycloak.init({
        token: response.access_token,
        idToken: response.id_token,
        refreshToken: response.refresh_token,
        checkLoginIframe: false
      })
      .success(authenticated => {
        if(!authenticated){
          dispatch(loginFailure())
        }
        else {
          const remoteUser = keycloak.tokenParsed

          dispatch(loginSuccess({
            groups: remoteUser.groups.slice(),
            username: remoteUser.username,
            departments: remoteUser.departments.slice(),
            //faculties: remoteUser.faculties.slice(),
            token: keycloak.token
          }))

          db.users.put({
            username: remoteUser.username,
            password: user.password, //TODO hash password before storing it
            name: remoteUser.name,
            orgId: remoteUser.orgId,
            orgName: remoteUser.orgName,
            departments: remoteUser.departments,
            //faculties: remoteUser.faculties,
            groups: remoteUser.groups.slice(),
            refreshToken: keycloak.refreshToken //TODO hash token before storing it
          })
        }
      }).error(error => dispatch(loginFailure(error)))
    }
  }
}

export function getAccessToken(token){
  const k_url = config.keycloak.url + '/realms/sisdn-realm/protocol/openid-connect/token'

  return fetch(k_url, {
    method: 'POST',
    body: `client_id=sisdn&grant_type=refresh_token&refresh_token=${token}`,
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    })
  }).then(response => {
    if(response.status == 200){
      return response.json()
    }
    else {
      console.error(response.statusText);
    }
  })
}

function getOfflineToken(user){
    const k_url = config.keycloak.url + '/realms/sisdn-realm/protocol/openid-connect/token'

    return fetch(k_url, {
      method: 'POST',
      mode: 'cors',
      body: `username=${user.username}&password=${user.password}&client_id=sisdn&grant_type=password&scope=offline_access`,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }).then(response => {
      if(response.status == 200){
        return response.json()
      }
      else {
        console.error(response.statusText);
      }
    })
}
