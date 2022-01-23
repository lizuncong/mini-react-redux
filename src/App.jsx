import React, { useState } from 'react';
import { connect } from 'react-redux'

const App = ({ count, increment, decrement}) => {
  return (
      <div>
        count: {count}
        <div>
          <button onClick={increment}>increment</button>
          <button onClick={decrement}>decrement</button>
        </div>
      </div>
  )
}

const mapStateToProps = (state, ownProps) => ({
  count: state.value + ownProps.step,
})

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    increment: () => dispatch({ type: 'counter/incremented' }),
    decrement: () => dispatch({ type: 'counter/decremented' }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

