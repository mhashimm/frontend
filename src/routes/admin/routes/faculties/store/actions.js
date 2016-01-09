
//import Rx from '@reactivex/rxjs'
import Dexie from 'dexie'
import config from 'config'


import { SUCCESS, FAILURE, PENDING } from '~/stores/status'

export const FACULTY_ADDED = 'FACULTY_ADDED'
export const FACULTY_UPDATED = 'FACULTY_UPDATED'
export const FACULTY_CANCELED = 'FACULTY_CANCELED'
export const FACULTIES_LOADED = 'FACULTIES_LOADED'

export function loadFaculties(){
  return function(dispatch, getState){
    let db = createDb(undefined, getState().user.username)
    db['facultyTable'].toArray(function(_faculties) {
       dispatch(facultiesLoaded(_faculties))
     })
    const facs = [
      {'id': 'med', 'title': 'كلية الطب', 'titleTr': 'Faculty Of Medicine', 'isActive': true},
      {'id': 'law', 'title': 'كلية القانون', 'titleTr': 'Law School', 'isActive': false},
      {'id': 'econ', 'title': 'كلية الاقتصاد', 'titleTr': 'Faculty Of Economics', 'isActive': true}
    ]

    //setTimeout(() => dispatch(facultiesLoaded(facs)), 2000)

    // facs.map(fac => {
    //   db.facultyTable.get(fac.id).then(function(f) {
    //     if(f)
    //       db.facultyTable.add(fac)
    //     else
    //       //TODO maybe replace the whole object
    //       db.facultyTableOrig.add(f).then(() => db.facultyTable.add(fac))
    //   })
    // })
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

export function cancelFaculty(id){
  return function(dispatch, getState){
    let dbError = false
    let db = createDb(undefined, getState().user.username)
    db.facultyTableOrig.get(id).
      then(_faculty => {
        if(_faculty){
          if(db.facultyTable.get(id)){
            db.facultyTableOrig.delete(id)
            db.facultyTable.put(id, _faculty)
            dispatch(facultyCanceled(id, _faculty))
          }
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
    dispatch(facultyAdded(_faculty))
    let db = createDb(undefined, getState().user.username)
    db.facultyTable.add(_faculty).catch( error => dbError = true)

    global.fetch(config.apiUrl + '/faculties',{
      method: 'POST',
      body: JSON.stringify(_faculty),
      mode: 'cors',
      headers: new Headers({
        'Authorization':  'Bearer ' + getState().user.token,
        'Content-Type' :  'application/json',
      })
    }).then(response => {
      if(response.status == 201){
        delete _faculty.status
        dispatch(facultyUpdated(Object.assign({}, _faculty, {status: SUCCESS})))
        db.facultyTable.put(_faculty)
        setTimeout(() => dispatch(facultyUpdated(_faculty)), 2000)
      }
      else {
         dispatch(facultyUpdated(Object.assign({}, _faculty, {status: FAILURE}), response.statusText))
         db.facultyTable.update(_faculty.id, { status : FAILURE})
      }
    }
    ).catch(error => {
      dispatch(facultyUpdated(Object.assign({}, _faculty, {status: FAILURE})))
      db.facultyTable.update(_faculty.id, { status : FAILURE})
    })
  }
}

export function updateFaculty(faculty){
  return function(dispatch, getState){
    let dbError = false
    let db = createDb(undefined, getState().user.username)
    const origFaculty = db.facultyTable.get(faculty.id)
    dispatch(facultyUpdated(Object.assign({}, faculty, {status: PENDING})))

    db.facultyTable.put(Object.assign({}, faculty, {status: PENDING}))
      .then(() => db.facultyTableOrig.add(origFaculty))
      .catch((error) => dbError = true)//TODO find way to deal with such error

    fetch(config.apiUrl + '/faculties', {
    	method: 'PUT',
      body: JSON.stringify(faculty),
    	mode: 'cors',
    	headers: new Headers({
    		'Authorization':  'Bearer ' + getState().user.token,
        'Content-Type' :  'application/json',
      	})
      }).then(response => {
        if(response.status == 200){
          dispatch(facultyUpdated(Object.assign({}, faculty, {status: SUCCESS})))
          db.facultyTable.put(faculty)
          db.facultyTableOrig.delete(origFaculty)
          setTimeout(() => dispatch(facultyUpdated(faculty)), 2000)
        }
        else {
           dispatch(facultyUpdated(Object.assign({}, faculty, {status: FAILURE})))
           db.facultyTable.update(faculty.id, { status : FAILURE})
        }
      }
      ).catch(error => {
        dispatch(facultyUpdated(Object.assign({}, faculty, {status: FAILURE})))
        db.facultyTable.update(faculty.id, { status : FAILURE})
      })
  }
}

function createDb(version, username){
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
