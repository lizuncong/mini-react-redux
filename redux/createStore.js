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


// 测试用例
// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case 'counter/incremented':
//       return { value: state.value + 1 }
//     case 'counter/decremented':
//       return { value: state.value - 1 }
//     default:
//       return state
//   }
// }
//
//
// // createStore返回值{ subscribe, dispatch, getState }.
// let store = createStore(counterReducer)
//
// store.subscribe(() => console.log('test===1',store.getState()))
// store.subscribe(() => console.log('test===', store.getState()))
//
//
// store.dispatch({ type: 'counter/incremented' })
// store.dispatch({ type: 'counter/incremented' })
// store.dispatch({ type: 'counter/incremented' })
