import config from 'config'

let actionMap = new Map()

export default function entityUpdateWorkerDispatch(store){
  var entityUpdateWorker = require('shared-worker!./entityUpdateWorker')
  var entityWorker = new entityUpdateWorker()

  userScope(store, entityWorker)

  entityWorker.port.onmessage = function(message){
    if(message.data.hasOwnProperty('action') && message.data.hasOwnProperty('entity')){
      const {entity, action, status} = message.data
      store.dispatch({type: action, entity: Object.assign({}, entity, {status: status})})
    }
  }

  entityWorker.port.onerror = function(error){
    console.log(error);
  }

  entityWorker.port.postMessage({
    type: 'entityUpdateWorkerDispatch',
    isOnline: store.getState().isOnline
  })
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
              path: config.faculties.path,
              action: 'FACULTY_UPDATED'
            })
            entityWorker.port.postMessage({
              table: 'departments',
              path: config.departments.path,
              action: 'DEPARTMENT_UPDATED'
            })
            entityWorker.port.postMessage({
              table: 'courses',
              path: config.courses.path,
              action: 'COURSE_UPDATED'
            })
            entityWorker.port.postMessage({
              table: 'programs',
              path: config.programs.path,
              action: 'PROGRAM_UPDATED'
            })
            break;
        }
      })
    }
  }, 2000)
}
