import { applyMiddleware } from 'redux'
import createStore from '../redux/createStore'
// import applyMiddleware from '../redux/applyMiddleware'
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


function logger({ getState, dispatch }) {
  return next => action => {
    console.log('will dispatch', action, next)
    // dispatch(action)
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

function logger2({ getState }) {
  return next => action => {
    console.log('will dispatch2', action, next)

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action)

    console.log('state after dispatch2', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

// createStore返回值{ subscribe, dispatch, getState }.
// 第三个参数 enhancer(createStore)(reducer, preloadedState)
let store = createStore(counter, undefined, applyMiddleware(logger, logger2))

store.subscribe(() => console.log('test===1',store.getState()))


store.dispatch({ type: 'counter/incremented' })
