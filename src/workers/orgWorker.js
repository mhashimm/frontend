import config from 'config'
import createDb from '~/actions/createDb'

onmessage = function getOrg(event) {
  const {token, version, username} = event.data
  let db = createDb(version, username)
  db.open()
  Promise.all(
    ['courses', 'departments', 'faculties', 'programs'].map(key => {
    return db[key].orderBy('ts').last().then(last => {
      if(last === undefined || last.ts === undefined) return 0
      else return last.ts
    })
  }))
  .then(lst => {
    global.fetch(config.apiUrl + config.org.path.get +
        `?facultyts=${lst[2]}&departmentts=${lst[1]}&coursets=${lst[0]}&programts=${lst[3]}`, {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
          'Authorization':  'Bearer ' + token
        })
      }).then(response => {
        if(response.status == 200){
          return response.json()
        }
      }).then(org => {
        Object.keys(org).map(key =>{
          org[key].map(entity =>{
            const current = db[key], orig = db[key + 'Orig']
            db.transaction('rw', current, orig, function() {
              current.delete(entity.id)
              current.add(entity)
              orig.delete(entity.id)
            })
          })
        })
      })
    })
}
