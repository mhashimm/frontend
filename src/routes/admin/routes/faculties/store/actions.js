
//import Rx from '@reactivex/rxjs'
import Dexie from 'Dexie'
import config from 'config'

import { SUCCESS, FAILURE, PENDING, EXISTING } from '~/stores/status'
export const FACULTY_CREATED = 'FACULTY_CREATED'
export const FACULTY_UPDATED = 'FACULTY_UPDATED'
export const FACULTY_SAVED = 'FACULTY_SAVED'
export const FACULTY_FAILED = 'FACULTY_FAILED'

export function facultyCreated(faculty){
  return {
    type: FACULTY_CREATED,
    faculty
  }
}

export function facultyUpdated(faculty){
  return{
    type: FACULTY_UPDATED,
    faculty
  }
}

export function facultySaved(faculty){
  return{
    type: FACULTY_SAVED,
    faculty
  }
}

export function facultyFailed(faculty, error){
  return{
    type: FACULTY_FAILED,
    faculty,
    error
  }
}

export function createFaculty(faculty){
  return function(dispatch, getState){
    dispatch(facultyCreated(faculty))
  }
}

export function createFaculty(faculty){
  return function(dispatch, getState){
    let dbError = false
    dispatch(facultyCreated(faculty))
    var db = CreateDb()
    db.facultyTable.add(Object.assign({}, faculty, { status: PENDING }))
    .catch( error => dbError = true)

    fetch(config.apiUrl + '/faculties',{
      method: 'POST',
      body: JSON.stringify(faculty),
      mode: 'cors',
      headers: new Headers({
        'Authorization':  'Bearer ' + window.keycloak.token,
        'Content-Type' :  'application/json'
      })
    }).then(response => {
      if(response.status == 201){
        dispatch(facultySaved(faculty))
        db.facultyTable.update(faculty.id, { status : SUCCESS})
      }
      else {
         dispatch(facultyFailed(faculty))
         db.facultyTable.update(faculty.id, { status : FAILURE})
      }
    }
    ).catch(error => {
      dispatch(facultyFailed(faculty))
      db.facultyTable.update(faculty.id, { status : FAILURE})
    })
  }
}

export function updateFaculty(faculty){
  return function(dispatch, getState){
    let dbError = false
    const origFaculty = getState().faculties.find(f => f.id === faculty.id)
    dispatch(facultyUpdated(faculty))
    var db = CreateDb()
    db.facultyTable.add(faculty)
      .then(() => db.facultyTableOrig.add(origFaculty))
      .catch((error) => dbError = true)//TODO find way to deal with such error

    fetch(config.apiUrl + '/faculties', {
    	method: 'PUT',
      body: JSON.stringify(faculty),
    	mode: 'cors',
    	headers: new Headers({
    		'Authorization':  'Bearer ' + window.keycloak.token,
        'Content-Type' :  'application/json'
      	})
      }).then(response => {
        if(response.status == 200){
          dispatch(facultySaved(faculty))
          db.facultyTable.update(faculty.id, { status : SUCCESS})
        }
        else {
           dispatch(facultyFailed(faculty))
           db.facultyTable.update(faculty.id, { status : FAILURE})
        }
      }
      ).catch(error => {
        dispatch(facultyFailed(faculty))
        db.facultyTable.update(faculty.id, { status : FAILURE})
      })
  }
}

function CreateDb(version = config.db.version){
  var db = new Dexie(config.db.name)
  db.version(version).stores({
    facultyTable: config.db.facultyTable,
    facultyTableOrig: config.db.facultyTableOrig
  });
  db.open()
  return db
}
