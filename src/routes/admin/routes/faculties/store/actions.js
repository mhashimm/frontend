
import config from 'config'
import createEntity from '~/actions/createEntity'
import updateEntity from '~/actions/updateEntity'
import cancelEntity from '~/actions/cancelEntity'
import createDb from '~/actions/createDb'
import { PENDING } from '~/stores/status'

export const FACULTY_ADDED = 'FACULTY_ADDED'
export const FACULTY_UPDATED = 'FACULTY_UPDATED'
export const FACULTY_CANCELED = 'FACULTY_CANCELED'
export const FACULTIES_LOADED = 'FACULTIES_LOADED'

export function createFaculty(faculty){
  return function(dispatch, getState){
    let entity = Object.assign({}, faculty, { isActive: true, status: PENDING, isNew: true })
    dispatch(facultyAdded(entity))
    createEntity({
      version: 1,
      path: config.faculties.path,
      entity: entity,
      username: getState().user.username,
      table: 'faculties',
      updateAction: (faculty) => (dispatch) => dispatch(facultyUpdated(faculty))
    })
  }
}

export function updateFaculty(faculty){
  return function(dispatch, getState){
    updateEntity({
      version: 1,
      path: config.faculties.path,
      entity: faculty,
      username: getState().user.username,
      table: 'faculties',
      origTable: 'facultiesOrig',
      updateAction: (faculty) => (dispatch) => dispatch(facultyUpdated(faculty))
    })
  }
}

export function cancelFaculty(id){
  return function(dispatch, getState){
    cancelEntity({
      version: 1,
      entity: getState().faculties.find(f => f.id === id),
      username: getState().user.username,
      table: 'faculties',
      origTable: 'facultiesOrig',
      updateAction: (id, faculty) => (dispatch) => dispatch(facultyCanceled(id, faculty))})
  }
}

export function loadFaculties(){
  return function(dispatch, getState){
    let db = createDb(undefined, getState().user.username)
    db.open()
    db.faculties.toArray(function(_faculties) {
       dispatch(facultiesLoaded(_faculties))
     })

    db.close()
  }
}


export function facultiesLoaded(faculties){
  return {
    type: FACULTIES_LOADED,
    faculties
  }
}

export function facultyAdded(faculty){
  return {
    type: FACULTY_ADDED,
    faculty
  }
}

export function facultyUpdated(faculty){
  return{
    type: FACULTY_UPDATED,
    faculty
  }
}

export function facultyCanceled(id, faculty){
  return{
    type: FACULTY_CANCELED,
    faculty,
    id
  }
}
