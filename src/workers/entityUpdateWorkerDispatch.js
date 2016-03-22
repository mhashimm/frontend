import config from 'config'
var counter = 0
export default function entityUpdateWorkerDispatch(store){
  var entityUpdateWorker = require('shared-worker!./entityUpdateWorker')
  var entityWorker = new entityUpdateWorker()

  userScope(store, entityWorker)

  entityWorker.port.onmessage = function(message){
    console.log(`${counter++} >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`);
    console.log(message);
    if(message.data.hasOwnProperty('action') && message.data.hasOwnProperty('entity')){
      const {entity, action, status} = message.data
      store.dispatch({type: action, entity: Object.assign({}, entity, {status: status})})
    }
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
              path: config.admin.faculties.path,
              action: 'FACULTY_UPDATED'
            })
            entityWorker.port.postMessage({
              table: 'departments',
              path: config.admin.departments.path,
              action: 'DEPARTMENT_UPDATED'
            })
            entityWorker.port.postMessage({
              table: 'courses',
              path: config.admin.courses.path,
              action: 'COURSE_UPDATED'
            })
            entityWorker.port.postMessage({
              table: 'programs',
              path: config.admin.programs.path,
              action: 'PROGRAM_UPDATED'
            })
            break;
        }
      })
    }
  }, 2000)
}
