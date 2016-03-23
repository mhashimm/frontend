
import config from 'config'
import cancelEntity from '~/actions/cancelEntity'
import createDb from '~/actions/createDb'
import { PENDING_IDLE } from '~/stores/status'

export const FACULTY_ADDED = 'FACULTY_ADDED'
export const FACULTY_UPDATED = 'FACULTY_UPDATED'
export const FACULTY_CANCELED = 'FACULTY_CANCELED'
export const FACULTIES_LOADED = 'FACULTIES_LOADED'

var entityUpdateWorker = require('shared-worker!../../../../../workers/entityUpdateWorker')
var entityWorker = new entityUpdateWorker()

export function createFaculty(faculty){
  return function(dispatch){
    let entity = Object.assign({}, faculty,
      { isActive: true, status: PENDING_IDLE, isNew: true })

    dispatch(facultyAdded(entity))

    entityWorker.port.postMessage({
      path: config.admin.faculties.path,
      entity: entity,
      table: 'faculties',
      action: FACULTY_UPDATED
    })
  }
}

export function updateFaculty(faculty){
  return function(){
    entityWorker.port.postMessage({
      path: config.admin.faculties.path,
      entity: faculty,
      table: 'faculties',
      action: FACULTY_UPDATED
    })
  }
}

export function cancelFaculty(id){
  return function(dispatch, getState){
    cancelEntity({
      entity: getState().faculties.find(f => f.id === id),
      user: getState().user,
      table: 'faculties',
      updateAction: (id, faculty) => (dispatch) => dispatch(facultyCanceled(id, faculty)),
      dispatch: dispatch
    })
  }
}

export function loadFaculties(){
  return function(dispatch, getState){
    let db = createDb(getState().user)
    db.open()
    db.faculties.toArray(function(_faculties) {
       dispatch(facultiesLoaded(_faculties))
     }).then(() => db.close())
  }
}


export function facultiesLoaded(faculties){
  return {
    type: FACULTIES_LOADED,
    entities: faculties
  }
}

export function facultyAdded(faculty){
  return {
    type: FACULTY_ADDED,
    entity: faculty
  }
}

export function facultyUpdated(faculty){
  return{
    type: FACULTY_UPDATED,
    entity: faculty
  }
}

export function facultyCanceled(id, faculty){
  return{
    type: FACULTY_CANCELED,
    entity: faculty,
    id: id
  }
}
