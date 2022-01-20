const createStore = (reducer, preloadedState, enhancer) => {
  let state = preloadedState;
  const listeners = [];

  if(enhancer){
    return enhancer(createStore)(reducer, preloadedState)
  }

  const getState = () => state;

  function dispatch(action) {
    state = reducer(state, action)
    listeners.forEach(listener => listener())

    return action
  }

  function subscribe(listener) {

    listeners.push(listener)

    return function unsubscribe() {
      const index = listeners.indexOf(listener)
      listeners.splice(index, 1)
    }
  }

  // 初始化store
  dispatch({  })

  return {
    dispatch,
    subscribe,
    getState,
  }
}

export default createStore
