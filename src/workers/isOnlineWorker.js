import config from 'config'

global.onmessage = function getOrg() {
  checkOnlineStatus()
  setInterval(checkOnlineStatus, config.onlineCheckInterval)
}

const checkOnlineStatus = () => {
  global.fetch(config.url, {
    method: 'GET',
    mode: config.cors,
    headers: new Headers({
      'pragma': 'no-cache',
      'cache-control': 'no-cache'
    })
  })
  .then(response => {
    //TODO status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
    if(response.status === 200)
      postMessage(true)
    else postMessage(false)
    })
  .catch(() => postMessage(false))
}
