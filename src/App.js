import React, { Component } from 'react'
import './App.css'

// import logo     from './logo.svg'
import Nav      from './components/ui/nav'
import Sidebar  from './components/ui/sidebar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Sidebar />
      </div>
    )
  }
}

export default App
