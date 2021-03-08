import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './Header';
import Main from './Main';
import { Provider } from './context';
import styles from './index.module.less';

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      count: 0,
    }
  }

  render(){
    const { count } = this.state;
    const contextValue = {
      count,
      add: () => {
        this.setState({ count: count + 1})
      }
    }
    console.log('root..render')
    return (
        <Provider value={contextValue}>
          <div
              onClick={() => {
                this.setState({
                  count: count + 1,
                })
              }}
          >
            root click me
          </div>
          <Header />
          <Main count={count} />
        </Provider>
    )
  }
}

render(<App />, document.getElementById('root'))
