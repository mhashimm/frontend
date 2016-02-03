
import config from 'config'
import cancelEntity from '~/actions/cancelEntity'
import {loadFaculties} from '../../faculties/store/actions'
import createDb from '~/actions/createDb'
import { PENDING_IDLE } from '~/stores/status'

export const PROGRAM_ADDED = 'PROGRAM_ADDED'
export const PROGRAM_UPDATED = 'PROGRAM_UPDATED'
export const PROGRAM_CANCELED = 'PROGRAM_CANCELED'
export const PROGRAMS_LOADED = 'PROGRAMS_LOADED'

var entityUpdateWorker = require('shared-worker!../../../../../workers/entityUpdateWorker')
var entityWorker = new entityUpdateWorker()

export function createProgram(program){
  return function(dispatch){
    let entity = Object.assign({}, program, {
      isActive: true,
      terms: parseInt(program.terms, 10),
      creditHours: program.creditHours ? parseFloat(program.creditHours) : 0,
      status: PENDING_IDLE,
      isNew: true
    })

    dispatch(programAdded(entity))

    entityWorker.port.postMessage({
      path: config.admin.programs.path,
      entity: entity,
      table: 'programs',
      action: PROGRAM_UPDATED
    })
  }
}

export function updateProgram(program){
  return function(){
    let entity = Object.assign({}, program, {
      terms: parseInt(program.terms, 10),
      creditHours: program.creditHours ? parseFloat(program.creditHours) : 0
    })

    entityWorker.port.postMessage({
      path: config.admin.programs.path,
      entity: entity,
      table: 'programs',
      action: PROGRAM_UPDATED
    })
  }
}

export function cancelProgram(id){
  return function(dispatch, getState){
    cancelEntity({
      entity: getState().programs.find(p => p.id === id),
      user: getState().user,
      table: 'programs',
      updateAction: (id, program) => (dispatch) => dispatch(programCanceled(id, program)),
      dispatch: dispatch
    })
  }
}

export function loadPrograms(){
  return function(dispatch, getState){
    dispatch(loadFaculties())
    let db = createDb(getState().user)
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
    entities: programs
  }
}

export function programAdded(program){
  return {
    type: PROGRAM_ADDED,
    entity: program
  }
}

export function programUpdated(program){
  return{
    type: PROGRAM_UPDATED,
    entity: program
  }
}

export function programCanceled(id, program){
  return{
    type: PROGRAM_CANCELED,
    entity: program,
    id
  }
}
