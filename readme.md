### React共享数据需要解决的问题
- 如何在组件之间共享数据，而不用通过组件树逐层传递props
- 共享数据更新，如何通知组件

### 理论知识
主要是react提供的context api
- React.createContext
- Context.Provider
- Class.contextType
- Context.Consumer
- Context.displayName


### context
#### 创建context
```jsx harmony
import React from 'react';
const defaultValue = { color: 'red' }
const ThemeContext = React.createContext(defaultValue);
const { Provider, Consumer } = ThemeContext;
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      color: 'blue',
    }
  }

  render(){
    return (
        <Provider value={{ color: this.state.color }}>
          <div
            onClick={() => {
              this.setState({
                color: color === 'red' ? 'green' : 'red',
              })
            }}
          >
            click me
          </div>
          <Header />
        </Provider>
    )
  }
}
class Header extends PureComponent{
  static contextType = ThemeContext;

  render(){
    return (
        <div>
          main: {this.context.color}
        </div>
    )
  }
}

```
组件会从组件树中离自身最近的那个匹配的`Provider`中读取到当前的`context`值。只有当组件所处的树中没有匹配到`Provider`时，
`React.createContext(defaultValue)`提供的`defaultValue`才生效。

也就是说，即使没有使用`Provider`提供`context`，只要组件中订阅了`context`，那么组件都可以读到默认的`defaultValue`。
比如
```jsx harmony
// 没有提供value，因此header组件里面读取到的context是默认值defaultValue
<Provider>
  <Header />
</Provider>
```

#### 多个Provider可以嵌套使用，里层的会覆盖外层的数据
#### 重点！！！
当Provider的value值发生变化时，它内部的所有消费组件都会重新渲染。Provider及其内部consumer组件都不受制于
shouldComponentUpdate函数(这点很重要)。即使是consumer组件的父组件使用了shouldComponentUpdate跳过了渲染，consumer组件依然会重新渲染。
```jsx harmony
class Header extends Component{

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render(){
    console.log('main..render')
    return (
        <MyContext.Consumer>
          {
            context => (
                <div>
                  <div>{JSON.stringify(context)}</div>
                </div>
            )
          }
        </MyContext.Consumer>
    )
  }
}
```
这个demo中，Header组件shouldComponentUpdate方法永远返回false，这在普通组件中，Header永远都不会重渲染。
但由于Header订阅了context，因此当Provider的value发生变化时，Header都会忽略掉shouldComponentUpdate而强制重渲染！！！！！

#### React使用了与Object.is相同的算法来比较Provider的value的新旧值。

#### 订阅context的两种方法： 1.Class.contextType 2.Context.Consumer组件
- Class.contextType
    + 可以使用Header.contextType = React.createContext()订阅context。如果是es6，可以在Header类中使用static contextType = React.createContext()订阅
    + 使用this.context可以访问到Provider提供的value或者React.createContext(defaultValue)中的defaultValue。
    + 这种方式只能订阅单一的context。

- Context.Consumer
    + 需要一个函数作为子元素，这个函数接收当前的context值，并返回一个React节点。
    + 支持消费多个context
```jsx harmony
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>

```
