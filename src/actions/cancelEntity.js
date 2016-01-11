import Dexie from 'dexie'
import createDb from '~/actions/createDb'
import { SUCCESS, FAILURE, PENDING } from '~/stores/status'

export function cancelEntity({version, entity, username, table, origTable, updateAction}){
  const db = createDb(version, username)
  db.open()
  const current = db[table], orig = db[origTable]

  orig.get(entity.id).
    then(_entity => {
      if(_entity !== undefined){
        orig.delete(_entity.id)
        current.put(_entity)
        global.store.dispatch(updateAction(_entity.id, _entity))
      }
      else {
        current.delete(entity.id)
        global.store.dispatch(updateAction(entity.id))
      }
    })
    db.close()
}

module.exports = cancelEntity
