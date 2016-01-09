import Dexie from 'dexie'
import config from 'config'

import { SUCCESS, FAILURE, PENDING } from '~/stores/status'

export function createEntity({entity, username, table, updateAction}){
  const _entity = Object.assign({}, entity, { status: PENDING })
  window.console.log('OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO')
  window.console.log(entity)
  updateAction(_entity)
  let dbError = false
  table = getTable(undefined, username, table)
  table.add(_entity).catch( error => dbError = true)

  global.fetch(config.apiUrl + table.url, {
    method: 'POST',
    body: JSON.stringify(_entity),
    mode: 'cors',
    headers: new Headers({
      'Authorization':  'Bearer ' + '',//global.keycloak.token,
      'Content-Type' :  'application/json',
    })
  }).then(response => {
    if(response.status == 201){
      delete _entity.status
      updateAction(Object.assign({}, _entity, {status: SUCCESS}))
      table.put(_entity)
      setTimeout(() => updateAction(_entity), 2000)
    }
    else {
       updateAction(Object.assign({}, _entity, {status: FAILURE}), response.statusText)
       table.update(_entity.id, { status : FAILURE})
    }
  }
  ).catch(error => {
    updateAction(Object.assign({}, _entity, {status: FAILURE}))
    table.update(_entity.id, { status : FAILURE})
  })
}

function getTable(version, username, table){
  const _version = version === undefined || version === null ? 1 : version
  var db = new Dexie('VVVVAAAA')//(username +'-sisdn')
  db.version(_version).stores({
    [table.name]: table.schema
  });
  db.open()
  return db[table.name]
}
