### 目录划分
- redux目录。该目录下是手写redux源码实现的。对应的官方Redux版本：4.0.0
- react-redux目录。该目录是手写react redux源码实现的。对应的官方React Redux版本：7.2.6

### React共享数据需要解决的问题
- 如何在组件之间共享数据，而不用通过组件树逐层传递props
- 共享数据更新，如何通知组件

### 理论知识
- [React.context理论知识](./react.context理论知识.md)
- Redux基础知识

### Redux
redux只是一种架构模式，它不关注我们到底用什么库，可以把它应用到React和Vue中。


redux中比较重要的几个概念：Reducers，Actions，Store
- reducers是一个纯函数，接收一个state和一个action对象，然后根据action.type更新state并返回一个新的state。
- actions是一个对象，包含一个type属性和一个payload属性。
- Store是createStore方法的返回值，提供了getState方法获取当前最新的state。dispatch方法触发state更新。subscribe方法订阅state状态变化的回调。

### react redux
react redux无非就是将context和redux架构结合实现的react共享状态管理方法。

react redux最主要的就是提供了connect方法，Provider组件将context从react组件中剥离出来，使得我们所写的组件能够和context解耦。

react redux无非就是将context和redux思想结合起来，使得context能和我们的业务组件解耦并且方便状态管理。

react redux最主要的两个API就是context方法和Provider组件。

其中，Provider组件比较简单，接收一个store对象。这个store对象就是redux的createStore方法的返回值，包含getState，dispatch，subscribe方法。
然后Provider组件创建一个context，包含store的值，并在render方法原封不动的渲染子组件。

connect方法接收一个mapStateToProps和一个mapDispatchToProps方法。并返回一个函数，这个函数接收一个组件，并且返回值是一个高阶组件。
这个高阶组件主要做了以下几件事：

订阅context，读取store对象，调用store.subscribe监听状态修改，然后执行更新操作。更新操作里面调用mapStateToProps以及mapDispatchToProps
方法，并将两个方法的返回值当作Props传递给包裹的组件。

### redux的使用
```js
/**
 * reducers是个纯函数，函数类型：(state, action) => newState
 * */
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 }
    case 'counter/decremented':
      return { value: state.value - 1 }
    default:
      return state
  }
}

//createStore返回值{ subscribe, dispatch, getState }.
let store = createStore(counterReducer)

store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: 'counter/incremented' })
```


### 简单版本的Redux及React Redux实现：
简易版的Redux，主要实现Redux的 `createStore` 方法
```js
function createStore (reducer) {
  let state = null
  const listeners = []
  const subscribe = (listener) => listeners.push(listener)
  const getState = () => state
  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
    return action;
  }
  dispatch({}) // 初始化 state
  return { getState, dispatch, subscribe }
}
```

简易版的React Redux
```jsx harmony
const ReactReduxContext = React.createContext(null)

class Provider extends React.Component {

  render () {
    return (
        <ReactReduxContext.Provider value={{store: this.props.store}}>
          {this.props.children}
        </ReactReduxContext.Provider>
    )
  }
}

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        allProps: {}
      }
    }
    componentWillMount () {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }
    _updateProps () {
      const { store } = this.context
      let stateProps = mapStateToProps
          ? mapStateToProps(store.getState(), this.props)
          : {} // 防止 mapStateToProps 没有传入
      let dispatchProps = mapDispatchToProps
          ? mapDispatchToProps(store.dispatch, this.props)
          : {} // 防止 mapDispatchToProps 没有传入
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }
    render () {
      return <WrappedComponent {...this.state.allProps} />
    }
  }
  Connect.contextType = ReactReduxContext
  return Connect
}
```



