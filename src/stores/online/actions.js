
export const IS_ONLINE = 'IS_ONLINE'
export function isOnline(online){
  return {
    type: IS_ONLINE,
    online
  }
}

export function setOnline(online){
  return (dispatch) => {
    dispatch(isOnline(online))
  }
}
