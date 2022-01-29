import React, { useContext } from 'react';
import { connect } from '../react-redux'
// import { useSelector } from '../react-redux'
const Counter = ({ number }) => {
  // const state = useSelector(state => state)
  console.log('counter====', number);
  return (
      <div>
        计数器：{number}
      </div>
  )
}
const mapStateToProps = (state) => {
  return {
    number: state.number,
  }
}


export default connect(mapStateToProps)(Counter)


// export default Counter

