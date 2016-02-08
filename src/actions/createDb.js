import Dexie from 'dexie'
import config from 'config'

export default function createDb(user){
  const version = config.db.version
  var db = new Dexie(user.username + '@sisdn-' + version)
  let stores = {users: 'username, password, name, orgId, orgName, groups, token'}

  if(user.groups.indexOf('admin') > -1){
    for(let tbl of config.admin.db){
      Object.assign(stores, {[tbl.name]: tbl.schema})
      Object.assign(stores, {[tbl.name + 'Orig']: tbl.schema})
    }
  }

  db.version(version).stores(stores)
  return db
}
