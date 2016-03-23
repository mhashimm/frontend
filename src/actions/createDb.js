import Dexie from 'dexie'
import config from 'config'

export default function createDb(user){
  const version = config.db.version
  var db = new Dexie(user.username + '@sisdn-' + version)
  let stores = {}

  for(let tbl of config.admin.db){
    Object.assign(stores, {[tbl.name]: tbl.schema}, {[tbl.name + 'Orig']: tbl.schema})
  }

  db.version(version).stores(stores)
  return db
}
