
import config from 'config'
import cancelEntity from '~/actions/cancelEntity'
import {loadFaculties} from '../../faculties/store/actions'
import createDb from '~/actions/createDb'
import { PENDING_IDLE } from '~/stores/status'

export const DEPARTMENT_ADDED = 'DEPARTMENT_ADDED'
export const DEPARTMENT_UPDATED = 'DEPARTMENT_UPDATED'
export const DEPARTMENT_CANCELED = 'DEPARTMENT_CANCELED'
export const DEPARTMENTS_LOADED = 'DEPARTMENTS_LOADED'

var entityUpdateWorker = require('shared-worker!../../../../../workers/entityUpdateWorker')
var entityWorker = new entityUpdateWorker()

export function createDepartment(department){
  return function(dispatch){
    let entity = Object.assign({}, department,
      { isActive: true, status: PENDING_IDLE, isNew: true })

    dispatch(departmentAdded(entity))

    entityWorker.port.postMessage({
      path: config.admin.departments.path,
      entity: entity,
      table: 'departments',
      action: DEPARTMENT_UPDATED
    })
  }
}

export function updateDepartment(department){
  return function(){
    entityWorker.port.postMessage({
      path: config.admin.departments.path,
      entity: department,
      table: 'departments',
      action: DEPARTMENT_UPDATED
    })
  }
}

export function cancelDepartment(id){
  return function(dispatch, getState){
    cancelEntity({
      entity: getState().departments.find(d => d.id === id),
      user: getState().user,
      table: 'departments',
      updateAction: (id, department) => (dispatch) => dispatch(departmentCanceled(id, department)),
      dispatch: dispatch
    })
  }
}

export function loadDepartments(){
  return function(dispatch, getState){
    dispatch(loadFaculties())
    let db = createDb(getState().user)
    db.open()
    db.departments.toArray(function(_departments) {
       dispatch(departmentsLoaded(_departments))
     })

    db.close()
  }
}


export function departmentsLoaded(departments){
  return {
    type: DEPARTMENTS_LOADED,
    entities: departments
  }
}

export function departmentAdded(department){
  return {
    type: DEPARTMENT_ADDED,
    entity: department
  }
}

export function departmentUpdated(department){
  return{
    type: DEPARTMENT_UPDATED,
    entity: department
  }
}

export function departmentCanceled(id, department){
  return{
    type: DEPARTMENT_CANCELED,
    entity: department,
    id
  }
}
