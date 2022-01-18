import { createStore } from 'redux'

/**
 * reducers是个纯函数，函数类型：(state, action) => newState
 * */
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

// createStore返回值{ subscribe, dispatch, getState }.
let store = createStore(counterReducer)


store.subscribe(() => console.log(store.getState()))

