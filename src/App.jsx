import React, { useState } from 'react';
import Counter from './Counter';
import Button from './Button';
var test = {a :1}
const App = () => {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(0)
  console.log('App=====')
  test.a ++;
  return (
      <div>
        <div>
          <button onClick={() => setCount(count + 1)}>add: {count}</button>
          <button onClick={() => setStep(step + 1)}>add step: {step}</button>
        </div>
        <Button test={test} step={step} />
        <Counter /> 
      </div>
  )
}


export default App
