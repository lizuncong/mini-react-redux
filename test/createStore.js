import createStore from '../redux/createStore'

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

store.subscribe(() => console.log('test===1',store.getState()))


store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/incremented' })
