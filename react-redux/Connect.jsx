import React, { useContext, useState, useMemo, useReducer, useRef, useLayoutEffect } from 'react'
import Context from './Context'
import childPropsSelectorFactory from './utils';
const INITIAL_STATE = [null, 0]
function storeStateUpdatesReducer(state, action) {
  var updateCount = state[1];
  return [action.payload, updateCount + 1];
}
/**
 * 需要注意的是，如果WrappedComponent上有静态属性，此时返回的高阶组件Connect上会丢失这些属性。这也是为啥react redux中要使用
 * hoist-non-react-statics包装一下的原因
 * */
const Connect = (mapStateToProps, mapDispatchToProps = () => {}) => {
  return function wrapWithConnect(WrappedComponent) {
    // 返回来的组件丢失了WrappedComponent的静态属性，因此理论上是要将WrappedComponent的静态
    // 属性重新挂到返回的组件上的
    return React.memo((props) => {
      const wrapperProps = props;
      const contextValue = useContext(Context)
      const store = contextValue.store

      const childPropsSelector = useMemo(() => {
        return childPropsSelectorFactory(mapStateToProps, mapDispatchToProps, store.dispatch)
      }, [])

      // 1.创建subscription todo 
      // 2.创建 useReducers用来触发子组件重新渲染
      const [[previousStateUpdateResult], dispatch] = useReducer(storeStateUpdatesReducer, INITIAL_STATE)
      const lastChildProps = useRef();
      const lastWrapperProps = useRef(wrapperProps);
      const childPropsFromStoreUpdate = useRef();
      // 3.计算actualChildProps，store、状态、组件自身接收的props改变，都要重新计算组件实际接收的props
      const actualChildProps = useMemo(() => {
        if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
          return childPropsFromStoreUpdate.current;
        }
        return childPropsSelector(store.getState(), wrapperProps);
      }, [store, previousStateUpdateResult, wrapperProps])
      useLayoutEffect(() => {
        lastWrapperProps.current = wrapperProps;
        lastChildProps.current = actualChildProps;
          childPropsFromStoreUpdate.current = null;
      })
      // 4.监听store状态更新
      useLayoutEffect(() => {
        if(!mapStateToProps) return;
        const checkForUpdates = () => {
          const latestStoreState = store.getState();
          const newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current)
          // 如果组件订阅的state发生变更，则触发子组件重新渲染
          if(newChildProps !== lastChildProps.current){
            lastChildProps.current = newChildProps;
            childPropsFromStoreUpdate.current = newChildProps;
            dispatch({
              type: 'STORE_UPDATED',
              payload: {},
            })
          }
        }
        checkForUpdates()
        store.subscribe(checkForUpdates)
      }, [])
      return (
          <WrappedComponent {...actualChildProps}/>
      )
    })
  }
}

export default Connect