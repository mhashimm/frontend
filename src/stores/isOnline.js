import {setOnline} from '../stores/online/actions'

export default function Online(store){
  var isOnline = require('worker!../workers/isOnlineWorker.js');
  var worker = new isOnline();
  worker.postMessage({start: ''})
  worker.onmessage = (e) => {
    if(e.data != store.getState().isOnline)
      store.dispatch(setOnline(e.data))
  }
}
