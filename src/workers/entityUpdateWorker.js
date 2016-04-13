import config from 'config'
import createDb from '~/actions/createDb'

import { SUCCESS, FAILURE, PENDING_IDLE, PENDING_ACTIVE } from '~/stores/status'

var entityTables = new Map()
var user = undefined
var isOnline = false
var ports = new Array()
var interval

global.onconnect = (event) => {
  var port = event.ports[0]

  port.onmessage = (e) => {
    if(e.data instanceof Object){
      if(e.data.hasOwnProperty('username')){
        user = Object.assign({}, user, ...[e.data])
      }
      else if(e.data.hasOwnProperty('token')){
        user = Object.assign({}, user, e.data)
      }
      else if(e.data.hasOwnProperty('isOnline')){
        isOnline = e.data.isOnline
          if(e.data.hasOwnProperty('type'))
            ports = [port, ...ports]
      }
      else if(e.data.hasOwnProperty('entity') && e.data.hasOwnProperty('table') &&
              e.data.hasOwnProperty('path') && e.data.hasOwnProperty('action')){
        if(user !== undefined)
          updateEntity({...e.data}, e.data.entity, user)
      }
      else if(e.data.hasOwnProperty('table') &&
              e.data.hasOwnProperty('path') &&
              e.data.hasOwnProperty('action')){
        entityTables.set(e.data.table, e.data)
      }
    }

    clearInterval(interval)

    if(readyToRun()){
      interval = setInterval(() => {
        if(readyToRun()){
          let db = createDb(user)
          db.open()
          entityTables.forEach((value, key, map) => {
            db[key].where('status').equals('PENDING_IDLE').each(entity => {
              updateEntity(value, entity, user)
            })
          })
        }
        else
          clearInterval(interval)
      }, config.entityUpdateInterval)
    }
  }
}

const readyToRun = () => user !== undefined && user.token !== undefined &&
                          isOnline && entityTables.size > 0

const updateEntity = (entityTable, entity, user) => {
  let db = createDb(user)
  let {path, action, table} = entityTable
  let _entityTemp = Object.assign({}, entity)
  delete _entityTemp.status
  const _entity = Object.freeze(_entityTemp)

  ports.forEach(p => p.postMessage({action: action, entity: _entity, status: PENDING_ACTIVE}))

  db.open()
  const current = db[table]
  const orig    = db[table + 'Orig']

  current.get(_entity.id).then(o => {
    if(o.status === undefined)
      orig.put(o)
    }).then(() => current.put(Object.assign({}, _entity, {status: PENDING_IDLE})))

  const isNew = typeof _entity.isNew !== 'undefined' && _entity.isNew

  fetch(config.apiUrl + (isNew ? path.post : path.put), {
  	method: isNew ? 'POST' : 'PUT',
    body: JSON.stringify(_entity),
  	mode: config.cors,
  	headers: new Headers({
  		'Authorization':  'Bearer ' + user.token,
      'Content-Type' :  'application/json'
    	})
    }).then(response => {
      if(response.status == 200 || response.status == 201){
        let _local = Object.assign({}, _entity)
        delete _local.isNew
        ports.forEach(p => p.postMessage({action: action, entity: _entity, status: SUCCESS}))
        db.transaction('rw', current, orig, function() {
          current.delete(_entity.id)
          current.put(_local)
          orig.delete(_entity.id)
        })//.catch(error => console.log(error))
        let timeout = setTimeout(() => {
            ports.forEach(p => p.postMessage({action: action, entity: _local}))
            clearTimeout(timeout)
          }, 5000)
      }
      else {
        let _local = Object.assign({}, _entity, {status: FAILURE, error: response.statusText})
        ports.forEach(p => p.postMessage({action: action, entity: _local, status: FAILURE}))
        current.put(_local)
      }
    }
    ).catch(error => {
      ports.forEach(p => p.postMessage({action: action, entity: _entity, status: PENDING_IDLE}))
      db.transaction('rw', current, orig, function() {
        current.delete(_entity.id).then(() =>
        current.put(Object.assign({}, _entity, {status: PENDING_IDLE})))
      })
    })
}
