import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from '../react-redux'

import App from './App'
import store from './store'

const Root = () => {
    console.log('Root....')
    return (
        <Provider store={store}>
            <App step={2} />
        </Provider>
    )
}

ReactDOM.render(
    <Root />,
    document.getElementById('root')
)
