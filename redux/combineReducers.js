// combineReducers一定是返回一个reducer函数
// 然后每当有一个action过来，就将所有的reducer都执行一遍，看哪个匹配的上
const combineReducers = (reducers) => {

  return function combination(state, action) {
    console.log('自定义combine reducers...')
    if (state === void 0) {
      state = {};
    }


    let hasChanged = false;
    const nextState = {};

    for (let _i = 0; _i < reducers.length; _i++) {
      const _key = reducers[_i];
      const reducer = reducers[_key];
      const previousStateForKey = state[_key];
      // 这也就是为什么type一定要有命名空间，这里遍历reducers里面每一个函数
      const nextStateForKey = reducer(previousStateForKey, action);

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }


    // 在createStore创建的时候，会初始化一次state，因此reducers.length !== Object.keys(state).length
    hasChanged = hasChanged || reducers.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}


export default combineReducers;


// 测试用例
/**
 * reducers是个纯函数，函数类型：(state, action) => newState
 * */
// function counter(state = { value: 0 }, action) {
//   switch (action.type) {
//     case 'counter/incremented':
//       return { value: state.value + 1 }
//     case 'counter/decremented':
//       return { value: state.value - 1 }
//     default:
//       return state
//   }
// }
// function todos(state = [], action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return state.concat([action.text])
//     default:
//       return state
//   }
// }
//
// const rootReducer = combineReducers({
//   counter,
//   todos
// })
//
// // createStore返回值{ subscribe, dispatch, getState }.
// let store = createStore(rootReducer)
//
// store.subscribe(() => console.log('test===1',store.getState()))
//
//
// store.dispatch({ type: 'counter/incremented' })
// store.dispatch({ type: 'ADD_TODO', text: 'redux' })
