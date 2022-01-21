// import { applyMiddleware } from 'redux'
import createStore from '../redux/createStore'
import applyMiddleware from '../redux/applyMiddleware'
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
    console.log('will dispatch===============1')
    const returnValue = next(action)
    console.log('state after dispatch================1', getState())
    return returnValue
  }
}

function logger2({ getState, dispatch }) {
  return next => action => {
    console.log('will dispatch==============2')
    const returnValue = next(action)
    console.log('state after dispatch==============2', getState())
    return returnValue
  }
}
function logger3({ getState }) {
  return next => action => {
    console.log('will dispatch==============3')
    const returnValue = next(action)
    console.log('state after dispatch==============3', getState())
    return returnValue
  }
}

// createStore返回值{ subscribe, dispatch, getState }.
// 第三个参数 enhancer(createStore)(reducer, preloadedState)
let store = createStore(counter, undefined, applyMiddleware(logger, logger2, logger3))

store.subscribe(() => console.log('test===1',store.getState()))


console.log('dispatch=======', store.dispatch({ type: 'counter/incremented' }))
