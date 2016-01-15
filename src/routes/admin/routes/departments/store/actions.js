
import config from 'config'
import createEntity from '~/actions/createEntity'
import updateEntity from '~/actions/updateEntity'
import cancelEntity from '~/actions/cancelEntity'
import {loadFaculties} from '../../faculties/store/actions'
import createDb from '~/actions/createDb'
import { PENDING } from '~/stores/status'

export const DEPARTMENT_ADDED = 'DEPARTMENT_ADDED'
export const DEPARTMENT_UPDATED = 'DEPARTMENT_UPDATED'
export const DEPARTMENT_CANCELED = 'DEPARTMENT_CANCELED'
export const DEPARTMENTS_LOADED = 'DEPARTMENTS_LOADED'

export function createDepartment(department){
  return function(dispatch, getState){
    let entity = Object.assign({}, department, { isActive: true, status: PENDING, isNew: true })
    dispatch(departmentAdded(entity))
    createEntity({
      version: 1,
      path: config.departments.path,
      entity: entity,
      username: getState().user.username,
      table: 'departments',
      updateAction: (department) => (dispatch) => dispatch(departmentUpdated(department))
    })
  }
}

export function updateDepartment(department){
  return function(dispatch, getState){
    updateEntity({
      version: 1,
      path: config.departments.path,
      entity: department,
      username: getState().user.username,
      table: 'departments',
      origTable: 'departmentsOrig',
      updateAction: (department) => (dispatch) => dispatch(departmentUpdated(department))
    })
  }
}

export function cancelDepartment(id){
  return function(dispatch, getState){
    cancelEntity({
      version: 1,
      entity: getState().departments.find(d => d.id === id),
      username: getState().user.username,
      table: 'departments',
      origTable: 'departmentsOrig',
      updateAction: (id, department) => (dispatch) => dispatch(departmentCanceled(id, department))})
  }
}

export function loadDepartments(){
  return function(dispatch, getState){
    dispatch(loadFaculties())
    let db = createDb(undefined, getState().user.username)
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
    departments
  }
}

export function departmentAdded(department){
  return {
    type: DEPARTMENT_ADDED,
    department
  }
}

export function departmentUpdated(department){
  return{
    type: DEPARTMENT_UPDATED,
    department
  }
}

export function departmentCanceled(id, department){
  return{
    type: DEPARTMENT_CANCELED,
    department,
    id
  }
}
