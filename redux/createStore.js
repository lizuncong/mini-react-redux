const createStore = (reducer, preloadedState, enhancer) => {
  console.log('自定义store...')
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];

  if(enhancer){
    return enhancer(createStore)(reducer, preloadedState)
  }

  function getState() {
    return currentState;
  }

  function dispatch(action) {


    currentState = currentReducer(currentState, action)

    for (let i = 0; i < currentListeners.length; i++) {
      const listener = currentListeners[i]
      listener()
    }

    return action
  }

  function subscribe(listener) {


    currentListeners.push(listener)

    return function unsubscribe() {
      const index = currentListeners.indexOf(listener)
      currentListeners.splice(index, 1)
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
