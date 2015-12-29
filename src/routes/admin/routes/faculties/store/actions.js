
//import Rx from '@reactivex/rxjs'
import Dexie from 'Dexie'
import config from 'config'

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

export function facultyFailed(faculty){
  return{
    type: FACULTY_FAILED,
    faculty
  }
}

export function createFaculty(faculty){
  return function(dispatch, getState){
    dispatch(facultyCreated(faculty))
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

    fetch(config.apiUrl + '/admin/faculties', {
    	method: 'POST',
      body: JSON.stringify(faculty),
    	mode: 'cors',
    	redirect: 'follow',
    	headers: new Headers({
    		'Authorization': 'Bearer ' + getState().idToken
      	})
      }).then(response => {

      }).catch(function(err) {
      	// Error :(
      });
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
