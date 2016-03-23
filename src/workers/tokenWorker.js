import {getAccessToken} from '~/routes/login/store/actions'

global.onmessage = function getToken(event) {
  const {refreshToken} = event.data

  getAccessToken(refreshToken).then(response => {
    postMessage(response)
  })
}
