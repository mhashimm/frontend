
//import Rx from '@reactivex/rxjs'
import Dexie from 'dexie'
import config from 'config'

import { SUCCESS, FAILURE, PENDING, EXISTING } from '~/stores/status'

export const FACULTY_CREATED = 'FACULTY_CREATED'
export const FACULTY_UPDATED = 'FACULTY_UPDATED'
export const FACULTY_SAVED = 'FACULTY_SAVED'
export const FACULTY_FAILED = 'FACULTY_FAILED'
export const FACULTY_CANCELED = 'FACULTY_CANCELED'
export const FACULTIES_LOADED = 'FACULTIES_LOADED'

export function loadFaculties(){
  return function(dispatch, getState){
    let db = CreateDb(undefined, getState().user.username)
    db.facultyTable.toArray(function(_faculties) {
       dispatch(facultiesLoaded(_faculties))
     })
    const facs = [
      {'id': 'med', 'title': 'كلية الطب', 'titleTr': 'Faculty Of Medicine', 'isActive': true},
      {'id': 'law', 'title': 'كلية القانون', 'titleTr': 'Law School', 'isActive': false},
      {'id': 'econ', 'title': 'كلية الاقتصاد', 'titleTr': 'Faculty Of Economics', 'isActive': true}
    ]

    //setTimeout(() => dispatch(facultiesLoaded(facs)), 2000)

    facs.map(fac => {
      db.facultyTable.get(fac.id).then(function(f) {
        if(f === undefined) db.facultyTable.add(fac)
        else {
          db.facultyTableOrig.add(f).then(() => db.facultyTable.add(fac)) //TODO maybe replace the whole object
        }
      })
    })
  }
}

export function facultiesLoaded(faculties){
  return {
    type: FACULTIES_LOADED,
    faculties
  }
}

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

export function facultyCanceled(id, faculty){
  return{
    type: FACULTY_CANCELED,
    id,
    faculty
  }
}

// export function createFaculty(faculty){
//   return function(dispatch, getState){
//     dispatch(facultyCreated(faculty))
//   }
// }

export function cancelFaculty(id){
  return function(dispatch, getState){
    let dbError = false
    let db = CreateDb(undefined, getState().user.username)
    db.facultyTableOrig.get(id).
      then(_faculty => {
        if(_faculty !== undefined){
          db.facultyTableOrig.delete(id)
          db.facultyTable.update(id, _faculty)
          dispatch(facultyCanceled(id, _faculty))
        }
        else {
          db.facultyTable.delete(id)
          dispatch(facultyCanceled(id, _faculty))
        }
      })
  }
}

export function createFaculty(faculty){
  return function(dispatch, getState){
    const _faculty = Object.assign({}, faculty, { isActive: true, status: PENDING })
    let dbError = false
    dispatch(facultyCreated(_faculty))
    let db = CreateDb(undefined, getState().user.username)
    db.facultyTable.add()
    .catch( error => dbError = true)

    global.fetch(config.apiUrl + '/faculties',{
      method: 'POST',
      body: JSON.stringify(_faculty),
      mode: 'cors',
      headers: new Headers({
        'Authorization':  'Bearer ' + global.keycloak.token,
        'Content-Type' :  'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080'
      })
    }).then(response => {
      if(response.status == 201){
        dispatch(facultySaved(_faculty))
        db.facultyTable.update(_faculty.id, { status : SUCCESS})
      }
      else {
         dispatch(facultyFailed(_faculty))
         db.facultyTable.update(_faculty.id, { status : FAILURE})
      }
    }
    ).catch(error => {
      dispatch(facultyFailed(_faculty))
      db.facultyTable.update(_faculty.id, { status : FAILURE})
    })
  }
}

export function updateFaculty(faculty){
  return function(dispatch, getState){
    let dbError = false
    const origFaculty = getState().faculties.find(f => f.id === faculty.id)
    dispatch(facultyUpdated(faculty))
    let db = CreateDb(undefined, getState().user.username)
    db.facultyTable.add(faculty)
      .then(() => db.facultyTableOrig.add(origFaculty))
      .catch((error) => dbError = true)//TODO find way to deal with such error

    fetch(config.apiUrl + '/faculties', {
    	method: 'PUT',
      body: JSON.stringify(faculty),
    	mode: 'cors',
    	headers: new Headers({
    		'Authorization':  'Bearer ' + global.keycloak.token,
        'Content-Type' :  'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:8080'
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

function CreateDb(version, username){
  const _version = version === undefined || version === null ?
    config.db.version : version
  var db = new Dexie(username +'-'+ config.db.name)
  db.version(_version).stores({
    facultyTable: config.db.facultyTable,
    facultyTableOrig: config.db.facultyTableOrig
  });
  db.open()
  return db
}
