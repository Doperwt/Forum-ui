import React, { Component } from 'react'
import './App.css'
import Overview from './containers/Overview'
// import logo     from './logo.svg'
import Nav      from './components/UI/Nav'
import Sidebar  from './components/UI/Sidebar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Sidebar />
        <div className='content'>
          <Overview />
        </div>
      </div>
    )
  }
}

export default App
