import React, { memo } from 'react'
import ReactReduxContext from './Context'

export default memo(({ store, children }) => {
  console.log('Provider=======', store)
  return (
      <ReactReduxContext.Provider value={{ store: store}}>
        { children }
      </ReactReduxContext.Provider>
  )
})
