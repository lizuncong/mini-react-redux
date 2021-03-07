### context
#### 创建context
```jsx harmony
import React from 'react';
const ThemeContext = React.createContext(defaultValue);
const { Provider, Consumer } = ThemeContext;
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      count: 0,
    }
  }

  render(){
    return (
        <Provider value={{ count: this.state.count }}>
          <div
            onClick={() => {
              this.setState({
                count: count + 1,
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
          main: {this.context.count}
        </div>
    )
  }
}

```
组件会从组件树中离自身最近的那个匹配的`Provider`中读取到当前的`context`值。只有当组件所处的树中没有匹配到`Provider`时，
`React.createContext(defaultValue)`提供的`defaultValue`才生效。

也就是说，即使没有使用`Provider`提供`context`，只要组件中订阅了`context`，那么组件都可以读到默认的`defaultValue`。

