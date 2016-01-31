import {IS_ONLINE, IS_OFFLINE} from './actions'

var entityUpdateWorker = require('shared-worker!../../workers/entityUpdateWorker.js')
const entityWorker = new entityUpdateWorker()

export function reducer(state = true, action){
  switch (action.type) {
    case IS_ONLINE:
      const isOnline = action.online ? true : false
      entityWorker.port.postMessage({isOnline: isOnline})
      return isOnline
    default:
      return state
  }
}
