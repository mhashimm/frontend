import config from 'config'

export default function entityUpdateWorkerDispatch(store){
  var entityUpdateWorker = require('shared-worker!./entityUpdateWorker')
  var entityWorker = new entityUpdateWorker()

  userScope(store, entityWorker)

  entityWorker.port.onmessage = function(message){
    //store.dispatch({type: 'IS_ONLINE', online: false})
    console.log(message.data)
  }

  entityWorker.port.onerror = function(error){
    console.log(error);
  }

  entityWorker.port.postMessage({
    type: 'entityUpdateWorkerDispatch',
    isOnline: store.getState().isOnline
  })
  //entityWorker.port.start()
}

const userScope = (store, entityWorker) => {
  var interval = setInterval(() => {
    if(store.getState().user.authenticated){
      clearInterval(interval)
      let groups = store.getState().user.groups

      groups.map(group => {
        switch (group) {
          case 'admin':
            entityWorker.port.postMessage({
              table: 'faculties',
              version: 1,
              path: config.faculties
            })
            break;
        }
      })
    }
  }, 2000)
}
