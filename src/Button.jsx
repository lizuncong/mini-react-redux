import React from 'react';
import { connect } from '../react-redux'

const Button = ({ count, increment, decrement, decrementNum}) => {
  console.log('button=====')
  return (
      <div>
        count: {count}
        <div style={{ marginTop: '100px' }}>
          <button onClick={increment}>increment</button>
          <button onClick={decrement}>decrement</button>
          <button onClick={decrementNum}>decrement number</button>
        </div>
      </div>
  )
}

const mapStateToProps = (state, ownProps) => {
    return {
        count: state.value + ownProps.step,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increment: () => dispatch({ type: 'counter/incremented' }),
    decrement: () => dispatch({ type: 'counter/decremented' }),
    decrementNum: () => dispatch({ type: 'counter/decrementedNum' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Button)

