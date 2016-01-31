
import config from 'config'
import createEntity from '~/actions/createEntity'
import updateEntity from '~/actions/updateEntity'
import cancelEntity from '~/actions/cancelEntity'
import {loadFaculties} from '../../faculties/store/actions'
import {loadDepartments} from '../../departments/store/actions'
import createDb from '~/actions/createDb'
import { PENDING } from '~/stores/status'

export const COURSE_ADDED = 'COURSE_ADDED'
export const COURSE_UPDATED = 'COURSE_UPDATED'
export const COURSE_CANCELED = 'COURSE_CANCELED'
export const COURSES_LOADED = 'COURSES_LOADED'

export function createCourse(course){
  return function(dispatch, getState){
    let entity = Object.assign({}, course, { isActive: true, status: PENDING, isNew: true })
    dispatch(courseAdded(entity))
    createEntity({
      version: 1,
      path: config.courses.path,
      entity: entity,
      username: getState().user.username,
      table: 'courses',
      updateAction: (course) => (dispatch) => dispatch(courseUpdated(course))
    })
  }
}

export function updateCourse(course){
  return function(dispatch, getState){
    updateEntity({
      version: 1,
      path: config.courses.path,
      entity: course,
      username: getState().user.username,
      table: 'courses',
      origTable: 'coursesOrig',
      updateAction: (course) => (dispatch) => dispatch(courseUpdated(course))
    })
  }
}

export function cancelCourse(id){
  return function(dispatch, getState){
    cancelEntity({
      version: 1,
      entity: getState().courses.find(f => f.id === id),
      username: getState().user.username,
      table: 'courses',
      origTable: 'coursesOrig',
      updateAction: (id, course) => (dispatch) => dispatch(courseCanceled(id, course))})
  }
}

export function loadCourses(){
  return function(dispatch, getState){
    dispatch(loadFaculties())
    dispatch(loadDepartments())
    let db = createDb(undefined, getState().user.username)
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
    courses
  }
}

export function courseAdded(course){
  return {
    type: COURSE_ADDED,
    course
  }
}

export function courseUpdated(course){
  return{
    type: COURSE_UPDATED,
    course
  }
}

export function courseCanceled(id, course){
  return{
    type: COURSE_CANCELED,
    course,
    id
  }
}
