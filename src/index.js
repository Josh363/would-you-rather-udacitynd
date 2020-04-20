import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import 'bootstrap/dist/css/bootstrap.min.css'

import reducer from './reducers'
import middleWare from './middleware'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(reducer, middleWare)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
