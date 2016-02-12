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
  return function(dispatch){
    dispatch(beginLogin())

    var keycloak = new  keycloakConf(config.keycloak)

    keycloak.onTokenExpired = () => keycloak.updateToken()
      .success(refreshed => refreshed
        ? dispatch(tokenRefreshed(global.keycloak.token))
        : dispatch(tokenFailed()))
      .error(error => dispatch(loginFailure(error)))

    var db = new Dexie('users')
    db.version(config.db.version).stores({users: 'username, password, name, orgId, orgName, groups'})
    db.open()

    db.users.get(user.username).then(u => {
      if(!!u && u.password === user.password){
        //login locally
        console.log('LOGGED IN LOCALLY');
      }
      else {
        //login remotely
        loginRemote(user).then(response => {
          keycloak.init({
            //token: response.access_token,
            refreshToken: response.refresh_token,
            //idToken: response.id_token,
            onLoad: 'login-required',
            checkLoginIframe: false
          })
          .success(authenticated => {
            if(!authenticated)
              dispatch(loginFailure())
            else {
              const remoteUser = keycloak.tokenParsed
              console.log(keycloak);
              db.users.add({
                username: remoteUser.username,
                password: user.password, //TODO hash password before storing it
                name: remoteUser.name,
                orgId: remoteUser.orgId,
                orgName: remoteUser.orgName,
                groups: remoteUser.groups.slice()
              });

              dispatch(loginSuccess({
                groups: remoteUser.groups.slice(),
                username: remoteUser.username,
                departments: remoteUser.departments.slice(),
                token: keycloak.token
            }))
            }
          }).error(error => dispatch(loginFailure(error)))
        })
      }
    })
  }
}

function loginRemote(user){
    const k_url = config.keycloak.url + '/auth/realms/sisdn-realm/protocol/openid-connect/token'

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


// export function login(user){
//   return function(dispatch){
//     dispatch(beginLogin())
//     var keycloak = new  keycloakConf(config.keycloak)
//     if(config.appEnv === 'dist'){
//       keycloak.init({
//         onLoad: 'login-required',
//         checkLoginIframe: true
//       }).success(authenticated => {
//           if(!authenticated)
//             dispatch(loginFailure())
//           else {
//             dispatch(loginSuccess({
//               groups: keycloak.tokenParsed.groups.slice(),
//               username: keycloak.tokenParsed.username,
//               departments: keycloak.tokenParsed.departments.slice(),
//               token: keycloak.token
//           }))
//           }
//         }).error(error => dispatch(loginFailure(error)))
//
//       keycloak.onTokenExpired = () => keycloak.updateToken()
//         .success(refreshed => refreshed ? dispatch(tokenRefreshed(global.keycloak.token)) : dispatch(tokenFailed()))
//         .error(error => dispatch(loginFailure(error)))
//     }
//    else dispatch(loginSuccess())
//   }
// }

// export function login(user){
//   return function(dispatch){
//     dispatch(beginLogin())
//     keycloak = new keycloakConf(config.keycloak)
//     var db = createDb(user)
//     db.open()
//
//       keycloak.init({onLoad: 'login-required',  checkLoginIframe: true})
//       .success(authenticated => {
//         if(authenticated){
//
//           alert(keycloak.refreshToken)
//         }
//       })
//
//
//     }
//   }

              // db.user.put({
              //   username: keycloak.tokenParsed.username,
              //   password: user.password,
              //   name: keycloak.tokenParsed.name,
              //   orgId: keycloak.tokenParsed.org,
              //   orgName: keycloak.tokenParsed.orgName,
              //   groups: keycloak.tokenParsed.groups.slice(),
              //   token: keycloak.refreshToken
              // })

        //})

    // keycloak.init({
    //   onLoad: 'check-sso',
    //   checkLoginIframe: true
    // }).success(authenticated => {
    //     if(!authenticated){
    //       keycloak.login({scope: 'offline_access'})
    //       .success(authenticated => {
    //         let db = createDb({username: keycloak.tokenParsed.username})
    //         db.open()
    //         db.users.add({
    //           username: keycloak.tokenParsed.username,
    //           password: user.password,
    //           name: keycloak.tokenParsed.name,
    //           orgId: keycloak.tokenParsed.org,
    //           orgName: keycloak.tokenParsed.orgName,
    //           groups: keycloak.tokenParsed.groups.slice(),
    //           token: keycloak.refreshToken
    //         }).catch((error) => console.error('Dexie Error'))
    //       })
    //       .error(error => console.error('DDDDDDDDDDDDDDDDDDDDDDDDDDDD'))
    //     }
    //     else {console.log('authenticated');
    //       global.keycloak = keycloak
    //       dispatch(loginSuccess())
    //     }
    //   })
    //
    // keycloak.onTokenExpired = () => keycloak.updateToken()
    //   .success(refreshed => refreshed ? dispatch(tokenRefreshed(global.keycloak.token)) : dispatch(tokenFailed()))
    //   .error(error => dispatch(loginFailure(error)))
//   }
// }
