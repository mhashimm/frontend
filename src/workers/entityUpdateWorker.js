
var entityTables = new Map()
var user = {username: undefined, token: undefined}
var isOnline = false
var ports = new Array()
var interval

onconnect = (event) => {
  var port = event.ports[0]

  port.onmessage = (e) => {console.log(e.data);
    if(e.data instanceof Object){
      if(e.data.hasOwnProperty('username')){
        user = Object.assign({}, user, e.data)
      }
      else if(e.data.hasOwnProperty('token')){
        user = Object.assign({}, user, e.data)
      }
      else if(e.data.hasOwnProperty('table') &&
              e.data.hasOwnProperty('version') &&
              e.data.hasOwnProperty('path')){
        entityTables.set(e.data.table, e.data)
      }
      else if(e.data.hasOwnProperty('isOnline')){
        isOnline = e.data.isOnline
          if(e.data.hasOwnProperty('type'))
            ports = [port, ...ports]
      }
    }

    clearInterval(interval)
    if(readyToRun){
      interval = setInterval(() => {
        if(readyToRun()){
          ports.forEach(p => p.postMessage({entityTables, user, isOnline}))
        }
        else{
          clearInterval(interval)
        }
      }, 2000)
    }
    // else {
    //   clearInterval(interval)
    // }

    //port.start()
  }
}

const readyToRun = () =>
  user.username != undefined && user.token != undefined &&
  isOnline && entityTables.size >= 0
