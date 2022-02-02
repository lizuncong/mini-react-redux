import { createStore } from "redux";

function counterReducer(state = { value: 0, number: 1, product: { id: 123, name: 'orange' } }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 }
    case 'counter/decremented':
      return { ...state, value: state.value - 1 }
    case 'counter/decrementedNum':
      return { ...state, number: state.number - 1 }
    default:
      return state
  }
}


// createStore返回值{ subscribe, dispatch, getState }.
export default createStore(counterReducer)
