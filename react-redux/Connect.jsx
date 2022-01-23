import React, { useContext } from 'react'
import Context from './Context'

/**
 * 需要注意的是，如果WrappedComponent上有静态属性，此时返回的高阶组件Connect上会丢失这些属性。这也是为啥react redux中要使用
 * hoist-non-react-statics包装一下的原因
 * */
const Connect = (mapStateToProps, mapDispatchToProps) => {
  return function wrapWithConnect(WrappedComponent) {
    const Connect = React.memo((props) => {
      const contextValue = useContext(Context)
      const store = contextValue.store
      return (
          <div>hah</div>
      )
    })

    return Connect
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
