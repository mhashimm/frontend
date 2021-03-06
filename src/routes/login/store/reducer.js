import { BEGIN_LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, TOKEN_FAILURE, TOKEN_SUCCESS, LOGOUT } from './actions'

var entityUpdateWorker = require('shared-worker!../../../workers/entityUpdateWorker.js')
const entityWorker = new entityUpdateWorker()
var orgWorker = require('worker!../../../workers/orgWorker.js')
const worker = new orgWorker()

export function reducer(state = {authenticated: false, pending: true, groups: []}, action){
  switch (action.type) {
    case BEGIN_LOGIN:
      return Object.assign({}, state, {authenticated: false, pending: true})
    case LOGIN_SUCCESS:
      entityWorker.port.postMessage(...[action.user])
      worker.postMessage({user: action.user})
      return Object.assign({}, state, action.user, { authenticated: true, pending: false})
    case LOGIN_FAILURE:
      return Object.assign({}, state, {authenticated: false, pending: false})
    case TOKEN_SUCCESS:
      entityWorker.port.postMessage({token: action.token})
      return Object.assign({}, state, {token: action.token})
    case TOKEN_FAILURE:
      entityWorker.port.postMessage({token: undefined})
      return Object.assign({}, state, {token: ''})
    case LOGOUT:
      return Object.create({authenticated: false, pending: true, groups: []})
    default:
      return state
  }
}
