import Dexie from 'dexie'
import config from 'config'
import createDb from './createDb'
import {dispatch} from './dispatch'

import { SUCCESS, FAILURE, PENDING } from '~/stores/status'

function createEntity({version, path, entity, username, table, updateAction}){
  let _entityTemp = Object.assign({}, entity)
  delete _entityTemp.status
  const _entity = Object.freeze(_entityTemp)

  let dbError = false
  let db = createDb(version, username)
  db.open()
  const current = db[table]

  current.add(Object.assign({}, _entity, { status: PENDING }))
    .catch( error => window.console.log(error))

  global.fetch(config.apiUrl + path.post, {
    method: 'POST',
    body: JSON.stringify(_entity),
    mode: 'cors',
    headers: new Headers({
      'Authorization':  'Bearer ' + global.keycloak.token,
      'Content-Type' :  'application/json',
    })
  }).then(response => {
    if(response.status == 201){
      const _local = Object.assign({}, _entity)
      delete _local.isNew
      db.transaction('rw', current, function() {
        current.delete(_entity.id)
        current.add(_local)
        }).catch(error => {
          dispatch(updateAction, _entity, FAILURE)
          console.log(error)
      })
      dispatch(updateAction, _local, SUCCESS)
      setTimeout(() => dispatch(updateAction, _local), 2000)
    }
    else {
     dispatch(updateAction, _entity, FAILURE)
     current.update(_entity.id, { status : FAILURE})
     console.log('Error while saving entity')
    }
  }
  ).catch(error => {
    dispatch(updateAction, _entity, FAILURE)
    current.update(entity.id, { status : FAILURE})
    console.log(error)
  })
  db.close()
}

module.exports = createEntity
