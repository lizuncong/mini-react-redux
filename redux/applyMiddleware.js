// createStore(reducer, preloadedState, enhancer)
// => createStore(reducer, preloadedState, applyMiddleware(...middlewares))
// => enhancer(createStore)(reducer, preloadedState)
// 插件执行有点类似koa的洋葱圈模型，从左往右执行，直到真正的store.dispatch
const applyMiddleware = (...middlewares) => {
  return (createStore) => {
    return (reducer, preloadedState) => {
      const store = createStore(reducer, preloadedState)
      const { getState } = store;
      const mids = middlewares.map(mid => mid({ getState }))
      // 举例，假设有两个middleware
      // const mid1 = mids[0]
      // const mid2 = mids[1]
      // 那么dispatch实现如下：
      // const dispatch = (action) => {
      //   return mid1(mid2(store.dispatch))(action)
      // }
      // 从以上demo可以看出，如果要实现dispatch方法，我们必须先求出最终执行的dispatch方法
      // finalDispatch = mid1(mid2(store.dispatch))
      // 使用函数组合的概念，可以这么实现
      // const dispatch = (action) => {
      //   const finalDispatch = mids.reverse().reduce((arg, f) => { return f(arg)}, store.dispatch)
      //   return finalDispatch(action)
      // }
      const dispatch = (action) => {
        return next(0)(action)
        function next(i){
          if(i === mids.length) return store.dispatch;
          const mid = mids[i]
          return mid(next(i + 1))
        }
      }
      return {
        ...store,
        dispatch
      }
    }
  }
}

export default applyMiddleware
