
import config from 'config'
import cancelEntity from '~/actions/cancelEntity'
import {loadFaculties} from '../../faculties/store/actions'
import {loadDepartments} from '../../departments/store/actions'
import createDb from '~/actions/createDb'
import { PENDING_IDLE } from '~/stores/status'

export const COURSE_ADDED = 'COURSE_ADDED'
export const COURSE_UPDATED = 'COURSE_UPDATED'
export const COURSE_CANCELED = 'COURSE_CANCELED'
export const COURSES_LOADED = 'COURSES_LOADED'

var entityUpdateWorker = require('shared-worker!../../../../../workers/entityUpdateWorker')
var entityWorker = new entityUpdateWorker()

export function createCourse(course){
  return function(dispatch){
    let entity = Object.assign({}, course,
      { isActive: true, status: PENDING_IDLE, isNew: true })

    dispatch(courseAdded(entity))

    entityWorker.port.postMessage({
      path: config.admin.courses.path,
      entity: entity,
      table: 'courses',
      action: COURSE_UPDATED
    })
  }
}

export function updateCourse(course){
  return function(){
    entityWorker.port.postMessage({
      path: config.admin.courses.path,
      entity: course,
      table: 'courses',
      action: COURSE_UPDATED
    })
  }
}

export function cancelCourse(id){
  return function(dispatch, getState){
    cancelEntity({
      entity: getState().courses.find(f => f.id === id),
      user: getState().user,
      table: 'courses',
      updateAction: (id, course) => (dispatch) => dispatch(courseCanceled(id, course)),
      dispatch: dispatch
    })
  }
}

export function loadCourses(){
  return function(dispatch, getState){
    dispatch(loadFaculties())
    dispatch(loadDepartments())
    let db = createDb(getState().user)
    db.open()
    db.courses.toArray(function(_courses) {
       dispatch(coursesLoaded(_courses))
     })

    db.close()
  }
}


export function coursesLoaded(courses){
  return {
    type: COURSES_LOADED,
    entities: courses
  }
}

export function courseAdded(course){
  return {
    type: COURSE_ADDED,
    entity: course
  }
}

export function courseUpdated(course){
  return{
    type: COURSE_UPDATED,
    entity: course
  }
}

export function courseCanceled(id, course){
  return{
    type: COURSE_CANCELED,
    entity: course,
    id
  }
}
