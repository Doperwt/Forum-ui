import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Overview,
  Article,
  SignIn,
  SignUp,
} from './containers'
// import Overview from './containers/Overview'
// import Article from './containers/Article'
// import SignIn from './containers/SignIn'
// import SignUp from './containers/SignUp'

export default class Routes extends Component {

  render() {
    console.log(SignIn)
    return (
      <div>
        <Route exact path='/' component={Overview} />
        <Route path='/class/:classId' component={Article} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />
      </div>
    )
  }
}
