import createStore from '../redux/createStore'
import combineReducers  from '../redux/combineReducers'
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
let store = createStore(rootReducer)

store.subscribe(() => console.log('test===1',store.getState()))


store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'ADD_TODO', text: 'redux' })
