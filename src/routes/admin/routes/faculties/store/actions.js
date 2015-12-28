export const FACULTY_CREATED = 'FACULTY_CREATED'
export const FACULTY_UPDATED = 'FACULTY_UPDATED'
export const FACULTY_SAVED = 'FACULTY_SAVED'
export const FACULTY_FAILED = 'FACULTY_FAILED'
//export const GET_FACULTY    = 'GET_FACULTY'

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
