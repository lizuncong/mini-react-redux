import React, { memo } from 'react'
import ReactReduxContext from './Context'

export default Provider = memo(({ store, children }) => {
  return (
      <ReactReduxContext.Provider value={{ store: store}}>
        { children }
      </ReactReduxContext.Provider>
  )
})
