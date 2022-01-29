import React, { useContext, useRef, useLayoutEffect } from 'react'
import Context from './Context'

/**
 * 需要注意的是，如果WrappedComponent上有静态属性，此时返回的高阶组件Connect上会丢失这些属性。这也是为啥react redux中要使用
 * hoist-non-react-statics包装一下的原因
 * */
const Connect = (mapStateToProps, mapDispatchToProps) => {
  return function wrapWithConnect(WrappedComponent) {
    // 返回来的组件丢失了WrappedComponent的静态属性，因此理论上是要将WrappedComponent的静态
    // 属性重新挂到返回的组件上的
    return React.memo((props) => {
      const contextValue = useContext(Context)
      console.log('useContext====', contextValue)
      const store = contextValue.store
      // 1.创建subscription todo 
      // 2.创建 useReducers ？用来更新组件？todo

      // 3.计算actualChildProps
      const state = store.getState()
      const stateProps = mapStateToProps(state, props)
      const dispatchProps = mapDispatchToProps(store.dispatch, props)
      const mergeProps = { ...props, ...stateProps, ...dispatchProps }
      // 4.监听状态
      const lastChildProps = useRef();
      const lastWrapperProps = useRef(props);
      const childPropsFromStoreUpdate = useRef();
      useLayoutEffect(() => {
        // We want to capture the wrapper props and child props we used for later comparisons
        // lastWrapperProps.current = wrapperProps;
        // lastChildProps.current = actualChildProps;
        // renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

        // if (childPropsFromStoreUpdate.current) {
        //   childPropsFromStoreUpdate.current = null;
        //   notifyNestedSubs();
        // }
        lastWrapperProps.current = props;
        lastChildProps.current = mergeProps;
      })
      useLayoutEffect(() => {
        if(!mapStateToProps) return;
      }, [store, subscription, childPropsSelector])
      return (
          <WrappedComponent {...mergeProps}/>
      )
    })
  }
}

export default Connect



//
// const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
//   class Connect extends React.Component {
//     constructor (props) {
//       super(props)
//       this.state = {
//         allProps: {}
//       }
//     }
//     componentWillMount () {
//       const { store } = this.context
//       this._updateProps()
//       store.subscribe(() => this._updateProps())
//     }
//     _updateProps () {
//       const { store } = this.context
//       let stateProps = mapStateToProps
//           ? mapStateToProps(store.getState(), this.props)
//           : {} // 防止 mapStateToProps 没有传入
//       let dispatchProps = mapDispatchToProps
//           ? mapDispatchToProps(store.dispatch, this.props)
//           : {} // 防止 mapDispatchToProps 没有传入
//       this.setState({
//         allProps: {
//           ...stateProps,
//           ...dispatchProps,
//           ...this.props
//         }
//       })
//     }
//     render () {
//       return <WrappedComponent {...this.state.allProps} />
//     }
//   }
//   Connect.contextType = ReactReduxContext
//   return Connect
// }
