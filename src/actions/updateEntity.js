'use strict';

import config from 'config'
import createDb from '~/actions/createDb'
import { dispatch } from './dispatch'

import { SUCCESS, FAILURE, PENDING } from '~/stores/status'

function updateEntity({version, path, entity, username, table, origTable, updateAction}){
  let _entityTemp = Object.assign({}, entity)
  delete _entityTemp.status
  const _entity = Object.freeze(_entityTemp)

  dispatch(updateAction, _entity, PENDING)

  let db = createDb(version, username)
  db.open()
  const current = db[table], orig = db[origTable]

  current.get(_entity.id).then(o => {
    if(o.status === undefined)
      orig.put(o)
    }).then(() => current.put(Object.assign({}, _entity, {status: PENDING})))
  //.catch(error => console.log(error))

  const isNew = typeof _entity.isNew !== 'undefined' && _entity.isNew

  global.fetch(config.apiUrl + (isNew ? path.post : path.put), {
  	method: isNew ? 'POST' : 'PUT',
    body: JSON.stringify(_entity),
  	mode: 'cors',
  	headers: new Headers({
  		'Authorization':  'Bearer ' + global.keycloak.token,
      'Content-Type' :  'application/json'
    	})
    }).then(response => {
      if(response.status == 200 || response.status == 201){
        let _local = Object.assign({}, _entity)
        delete _local.isNew
        dispatch(updateAction, _local, SUCCESS)
        db.transaction('rw', current, orig, function() {
          current.delete(_entity.id)
          current.put(_local)
          orig.delete(_entity.id)
        })//.catch(error => console.log(error))
        setTimeout(() => dispatch(updateAction, _local), 2000)
      }
      else {
         dispatch(updateAction, _entity, FAILURE)
         current.put(Object.assign({}, _entity, {status: FAILURE}))
         //console.log(response.statusText)
      }
    }
    ).catch(error => {
      dispatch(updateAction, _entity, FAILURE)
      db.transaction('rw', current, orig, function() {
        current.delete(_entity.id).then(() =>
        current.put(Object.assign({}, _entity, {status: FAILURE})))
      })//.catch(error => window.console.log(error))
      //console.log(error)
    })
    db.close()
}

module.exports = updateEntity
