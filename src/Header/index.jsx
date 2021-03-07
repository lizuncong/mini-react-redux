import React, { memo } from 'react';
import styles from './index.module.less';

const Index = memo(() => {
  console.log('header..render')
  return (
      <div>
        header
      </div>
  )
})

export default Index;
