import {IS_ONLINE} from './actions'

var entityUpdateWorker = require('shared-worker!../../workers/entityUpdateWorker.js')
const entityWorker = new entityUpdateWorker()

export function reducer(state = false, action){
  switch (action.type) {
    case IS_ONLINE:
      const isOnline = action.online
      entityWorker.port.postMessage({isOnline: isOnline})
      return isOnline
    default:
      return state
  }
}
