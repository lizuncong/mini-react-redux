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
































/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
//
// export default function compose(...funcs) {
//   if (funcs.length === 0) {
//     return (arg) => arg
//   }
//
//   if (funcs.length === 1) {
//     return funcs[0]
//   }
//
//   return funcs.reduce((a, b) => (...args) => a(b(...args)))
// }
//
// function applyMiddleware(...middlewares) {
//   return (createStore) => (reducer, preloadedState) => {
//     const store = createStore(reducer, preloadedState)
//     let dispatch = () => {
//       throw new Error(
//           'Dispatching while constructing your middleware is not allowed. ' +
//           'Other middleware would not be applied to this dispatch.'
//       )
//     }
//
//     const middlewareAPI = {
//       getState: store.getState,
//       dispatch: (...args) => dispatch(...args),
//     }
//     const chain = middlewares.map((middleware) => middleware(middlewareAPI))
//     dispatch = compose(...chain)(store.dispatch)
//
//     return {
//       ...store,
//       dispatch,
//     }
//   }
// }
//
//
// export default applyMiddleware
