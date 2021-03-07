import React from 'react';

const MyContext = React.createContext({ defaultCount: 1, });

const { Provider, Consumer } = MyContext;

export default MyContext
export { Provider, Consumer }
