import React, { Component, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import Header from './Header';
import Main from './Main';
import { Provider } from './context';
import styles from './index.module.less';

const HeaderHook = () => {
  const [num, addNum] = useState(0);
  return (
      <div>
        这是一个hook组件：{num}
        <div>
          <button
            onClick={() => {
              console.log('hook.before..', num);
              addNum(n =>  n + 1);
              addNum(n =>  n + 1);
              addNum(n =>  n + 1);
              console.log('hook.after..', num);
            }}
          >
            点击触发hook
          </button>
        </div>
      </div>
  )
}
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      count: 0,
    }
  }

  render(){
    const { count } = this.state;
    const len = 3000;
    return (
        <>
          <div>
            <HeaderHook />
            <div>计数器：{ count }</div>
            <button
                onClick={() => {
                  // console.log('before..', this.state.count);
                  // this.setState({ count: count + 1});
                  // console.log('after...',this.state.count)
                  Promise.resolve(1).then(res => {
                    console.log('before..', this.state.count);
                    this.setState({ count: count + 1});
                    console.log('after...',this.state.count)
                  })
                }}
            >
              add
            </button>
          </div>
          <ul>
            {Array(len).fill(0).map((_, i) => <li>{i}</li>)}
          </ul>
        </>
    );
  }
}

const root = document.getElementById('root');
// render(<App />, root)
ReactDOM.unstable_createRoot(root).render(<App/>);

