import React from 'react'

import './App.css'
import logo from './logo.svg'
import GeoShapes from './containers/GeoShapes'

// eslint-disable-next-line react/prefer-stateless-function
class App extends React.Component {
  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Map Assistant</h2>
          <h4>Calculations at your service.</h4>
        </div>
        <div className="container">
          <GeoShapes />
        </div>
      </div>
    )
  }
}

export default App
