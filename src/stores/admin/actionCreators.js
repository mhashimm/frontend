import {CREATE_FACULTY, UPDATE_FACULTY} from './actionTypes'

export function createFaculty(faculty){
  return {
    type: CREATE_FACULTY,
    faculty
  }
}

export function updateFaculty(faculty){
  return{
    type: UPDATE_FACULTY,
    faculty
  }
}