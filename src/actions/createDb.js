import Dexie from 'dexie'
import config from 'config'

export default function createDb(version, username){
  const _version = version === undefined || version === null ? 1 : version
  var db = new Dexie(username + '@sisdn-' + _version)
  let stores = {}
  for(let tbl of config.db['version_' + _version]){
    Object.assign(stores, {[tbl.name]: tbl.schema})
  }
  db.version(_version).stores(stores)

  return db
}
