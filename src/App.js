import React, { Component } from 'react'
import './App.css'
// import logo     from './logo.svg'
import Nav      from './components/UI/Nav'
import Sidebar  from './components/UI/Sidebar'
import Sidecircle  from './components/UI/sideCircle'

import Routes from './routes'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Nav />
        <Sidebar />
        <Sidecircle />
        <Routes />
      </div>
    )
  }
}

export default App
