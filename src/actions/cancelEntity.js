import createDb from '~/actions/createDb'

export function cancelEntity({entity, user, table, updateAction, dispatch}){
  const db = createDb(user)
  db.open()
  const current = db[table], orig = db[table + 'Orig']

  orig.get(entity.id).
    then(_entity => {
      if(_entity !== undefined){
        orig.delete(_entity.id)
        current.put(_entity)
        dispatch(updateAction(_entity.id, _entity))
      }
      else {
        current.delete(entity.id)
        dispatch(updateAction(entity.id))
      }
    })
    db.close()
}

module.exports = cancelEntity
