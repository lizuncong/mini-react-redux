import React from 'react';
import Counter from './Counter';
import Button from './Button';
const App = () => {
  console.log('App=====')
  return (
      <div>
        <Button step={1} />
        <Counter /> 
      </div>
  )
}


export default App
