import { createStore, combineReducers, applyMiddleware } from '../redux'

function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

/**
 * reducers是个纯函数，函数类型：(state, action) => newState
 * */
function counter(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const rootReducer = combineReducers({
  counter,
  todos
})

// createStore返回值{ subscribe, dispatch, getState }.
let store = createStore(rootReducer, undefined, applyMiddleware(logger))

store.subscribe(() => console.log('test===1',store.getState()))


store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'ADD_TODO', text: 'redux' })




