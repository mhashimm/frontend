
export  const dispatch = (action, entity, status) => {
  global.store.dispatch(action(Object.assign({}, entity, status ? { status: status} : {})))
}
