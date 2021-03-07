import React, { PureComponent } from 'react';
import MyContext from '../context';
import styles from './index.module.less';

class Index extends PureComponent{
  static contextType = MyContext;

  render(){
    console.log('main..render')
    return (
        <div>
          main: {this.context.count}
          <div>{JSON.stringify(this.context)}</div>
          <div
            onClick={() => {
              this.context.add()
            }}
          >
            add
          </div>
        </div>
    )
  }
}

export default Index;
