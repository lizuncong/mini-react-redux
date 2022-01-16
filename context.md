### 理论知识
react提供的context api
- React.createContext
- Context.Provider
- Context.Consumer
- Class.contextType
- Context.displayName


#### React.createContext
```javascript
const MyContext = React.createContext(defaultValue);
```
返回一个包含 `Provider` 和 `Consumer` 的 `MyContext` 对象
- 当组件树中没有对应的 `Provider` 组件时，`defaultValue` 才生效

#### Context.Provider
```javascript
<MyContext.Provider value={/* 某个值 */}>
```
`Provider` 接收一个 `value` 属性。***当 `value` 变化时，所有订阅的组件都会强制刷新，不受限于 `shouldComponentUpdate`***

#### 订阅Context的API
react提供了三个订阅 `context` 的api
- MyClass.contextType = MyContext。在 `MyClass` 内部就可以通过 `this.context` 获取 `MyContext` 的值
- MyContext.Consumer
```javascript
<MyContext.Consumer>
  {value => {
    return (
        <div>{value}</div>
    )
  }}
</MyContext.Consumer>
```

- useContext
```javascript
const value = useContext(MyContext);
```
