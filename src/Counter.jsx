import React from 'react';
import { useSelector } from '../react-redux'
const Counter = () => {
  const state = useSelector(state => state.number)
  console.log('counter====', '计数器', state);
  return (
      <div>
        计数器：{state}
      </div>
  )
}
// const mapStateToProps = (state) => {
//   return {
//     number: state.number,
//   }
// }


// export default connect(mapStateToProps)(Counter)


export default Counter

