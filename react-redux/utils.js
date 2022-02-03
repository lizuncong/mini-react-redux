function shallowEqual(objA, objB) {
  if (objA === objB) return true;
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}


const childPropsSelectorFactory = (mapStateToProps, mapDispatchToProps, dispatch) => {
  let state;
  let ownProps;
  let stateProps;
  let dispatchProps;
  let mergedProps;
  return (nextState, nextOwnProps) => {
   
    // props发生改变，则子组件必须重新渲染，因此这里计算的stateProps就没必要再进行浅比较了
    function handleNewProps() {
      stateProps = mapStateToProps(state, ownProps);
      dispatchProps = mapDispatchToProps(dispatch, ownProps);
      mergedProps = {...stateProps, ...dispatchProps, ...ownProps};
      return mergedProps;
    }
  
    //如果是通过dispatch导致的状态更新，则计算的nextStateProps需要进行浅比较，以决定是否需要手动触发组件重新渲染
    function handleNewState() {
      const nextStateProps = mapStateToProps(state, ownProps);
      const statePropsChanged = !shallowEqual(nextStateProps, stateProps);
      stateProps = nextStateProps;
      // 只有订阅的状态发生改变了，才需要重新生成mergedProps，以触发子组件重新渲染
      if (statePropsChanged) mergedProps = { ...stateProps, ...dispatchProps, ...ownProps };
      return mergedProps;
    }
  
    function handleSubsequentCalls(nextState, nextOwnProps) {
      const propsChanged = !shallowEqual(nextOwnProps, ownProps);
      const stateChanged = nextState !== state;
      state = nextState;
      ownProps = nextOwnProps;
      // props发生改变，子组件必须要重新渲染，因此需要重新生成mergedProps
      if (propsChanged) return handleNewProps();
      // state发生改变，如果子组件订阅的state没有发生改变，子组件是不需要重新渲染的
      // 比如组件A订阅了count，组件B订阅了number，如果number发生改变，则组件A是不需要重新渲染的
      if (stateChanged) return handleNewState();
      return mergedProps;
    }
    return handleSubsequentCalls(nextState, nextOwnProps)
  }
}

export default childPropsSelectorFactory
