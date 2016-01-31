
import config from 'config'
import createEntity from '~/actions/createEntity'
import updateEntity from '~/actions/updateEntity'
import cancelEntity from '~/actions/cancelEntity'
import {loadFaculties} from '../../faculties/store/actions'
import createDb from '~/actions/createDb'
import { PENDING } from '~/stores/status'

export const PROGRAM_ADDED = 'PROGRAM_ADDED'
export const PROGRAM_UPDATED = 'PROGRAM_UPDATED'
export const PROGRAM_CANCELED = 'PROGRAM_CANCELED'
export const PROGRAMS_LOADED = 'PROGRAMS_LOADED'

export function createProgram(program){
  return function(dispatch, getState){
    let entity = Object.assign({}, program, {
      isActive: true,
      terms: parseInt(program.terms, 10),
      creditHours: program.creditHours ? parseFloat(program.creditHours) : 0,
      status: PENDING,
      isNew: true
    })
    dispatch(programAdded(entity))
    createEntity({
      version: 1,
      path: config.programs.path,
      entity: entity,
      username: getState().user.username,
      table: 'programs',
      updateAction: (program) => (dispatch) => dispatch(programUpdated(program))
    })
  }
}

export function updateProgram(program){
  return function(dispatch, getState){
    let entity = Object.assign({}, program, {
      terms: parseInt(program.terms, 10),
      creditHours: program.creditHours ? parseFloat(program.creditHours) : 0
    })
    updateEntity({
      version: 1,
      path: config.programs.path,
      entity: entity,
      username: getState().user.username,
      table: 'programs',
      origTable: 'programsOrig',
      updateAction: (program) => (dispatch) => dispatch(programUpdated(program))
    })
  }
}

export function cancelProgram(id){
  return function(dispatch, getState){
    cancelEntity({
      version: 1,
      entity: getState().programs.find(p => p.id === id),
      username: getState().user.username,
      table: 'programs',
      origTable: 'programsOrig',
      updateAction: (id, program) => (dispatch) => dispatch(programCanceled(id, program))})
  }
}

export function loadPrograms(){
  return function(dispatch, getState){
    dispatch(loadFaculties())
    let db = createDb(undefined, getState().user.username)
    db.open()
    db.programs.toArray(function(_programs) {
       dispatch(programsLoaded(_programs))
     })

    db.close()
  }
}


export function programsLoaded(programs){
  return {
    type: PROGRAMS_LOADED,
    programs
  }
}

export function programAdded(program){
  return {
    type: PROGRAM_ADDED,
    program
  }
}

export function programUpdated(program){
  return{
    type: PROGRAM_UPDATED,
    program
  }
}

export function programCanceled(id, program){
  return{
    type: PROGRAM_CANCELED,
    program,
    id
  }
}
