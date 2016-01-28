import config from 'config'

global.onmessage = function getOrg(event) {
  setInterval(() => {
    global.fetch(config.url, {
      method: 'GET',
      mode: config.cors
    })
    .then(response => {
      if(response.status == 200)
        postMessage(true)
      else postMessage(false)
      })
    .catch(() => postMessage(false))
  }, config.onlineCheckInterval)
}
