// combineReducers一定是返回一个reducer函数
// 然后每当有一个action过来，就将所有的reducer都执行一遍，看哪个匹配的上
const combineReducers = (reducers) => {

  return function combination(state = {}, action) {

    const nextState = {};

    Object.keys(reducers).forEach(key => {
      const reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
    })

    return nextState;
  };
}


export default combineReducers;


