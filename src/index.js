import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import App from './App'
import './index.css'
import shapeMapApp from './reducers'

const store = createStore(shapeMapApp)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
