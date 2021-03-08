import React, { Component } from 'react';
import MyContext from '../context';
import styles from './index.module.less';

class Index extends Component{

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
  }

  render(){
    console.log('main..render')
    return (
        <MyContext.Consumer>
          {
            context => (
                <div>
                  main: {context.count}
                  <div>{JSON.stringify(context)}</div>
                  <div
                      onClick={() => {
                        context.add()
                      }}
                  >
                    add
                  </div>
                </div>
            )
          }
        </MyContext.Consumer>
    )
  }
}

export default Index;
