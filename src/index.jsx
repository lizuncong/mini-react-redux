import React, { Component } from 'react';
import { render } from 'react-dom';
import styles from './index.module.less';

export default class App extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
        <div className={styles.background}>
          Mini React Redux
        </div>
    )
  }
}

render(<App />, document.getElementById('root'))
