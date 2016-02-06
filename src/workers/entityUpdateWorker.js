import config from 'config'
import createDb from '~/actions/createDb'

import { SUCCESS, FAILURE, PENDING_IDLE, PENDING_ACTIVE } from '~/stores/status'

var entityTables = new Map()
var user = {username: undefined, token: undefined}
var isOnline = false
var ports = new Array()
var interval

global.onconnect = (event) => {
  var port = event.ports[0]

  port.onmessage = (e) => {
    if(e.data instanceof Object){
      if(e.data.hasOwnProperty('username')){
        user = Object.assign({}, user, e.data)
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
        if(user.username !== undefined){
          let db = createDb(config.db.version, user.username)
          db.open()
          updateEntity({...e.data}, e.data.entity, ports, db)
        }
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
          let db = createDb(config.db.version, user.username)
          db.open()
          entityTables.forEach((value, key, map) => {
            db[key].where('status').equals('PENDING_IDLE').each(entity => {
              updateEntity(value, entity, ports, db)
            })
          })
        }
        else{
          clearInterval(interval)
        }
      }, config.entityUpdateInterval)
    }
  }
  port.start()
}

const readyToRun = () =>
  user.username != undefined && user.token != undefined && isOnline && entityTables.size > 0

const updateEntity = (entityTable, entity, ports, db) => {console.log(entity);
  let {path, action, table} = entityTable
  let _entityTemp = Object.assign({}, entity)
  delete _entityTemp.status
  const _entity = Object.freeze(_entityTemp)

  ports.forEach(p => p.postMessage({action: action, entity: _entity, status: PENDING_ACTIVE}))

  const current = db[table], orig = db[table + 'Orig']

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
         ports.forEach(p => p.postMessage({action: action, entity: _entity, status: FAILURE}))
         current.put(Object.assign({}, _entity, {status: FAILURE, error: response.statusText}))
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
