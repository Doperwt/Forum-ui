import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import {
  Overview,
  Article,
  SignIn,
  SignUp,
  Profile,
  Messages,
  Room
} from './containers'
import {
  Contact,
  About
} from './pages'
import ShowMessage from './components/Messages/showMessage'
import ShowOtherProfile from './components/Profiles/showOtherProfile'
import showRoom from './components/Rooms/showRoom'
export default class Routes extends Component {
  render() {
    return (
      <div >
        <Route exact path='/' component={Overview} />
        <Route path='/class/:classId' component={Article} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />
        <Route exact path='/profile' component={Profile} />
        <Route path='/profile/:profileId' component={ShowOtherProfile}/>
        <Route exact path='/articles' component={Article} />
        <Route path='/articles/:category' component={Article} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/about' component={About} />
        <Route exact path='/messages' component={Messages} />
        <Route path='/message/:messageId' component={ShowMessage} />
        <Route exact path='/rooms' component={Room} />
        <Route path='/rooms/:roomId' component={showRoom} />

      </div>
    )
  }
}
