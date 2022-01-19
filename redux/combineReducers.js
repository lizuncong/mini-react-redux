const combineReducers = (reducers) => {

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }


    let hasChanged = false;
    const nextState = {};

    for (let _i = 0; _i < reducers.length; _i++) {
      const _key = reducers[_i];
      const reducer = reducers[_key];
      const previousStateForKey = state[_key];
      // 这也就是为什么type一定要有命名空间
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
