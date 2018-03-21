import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import {
  Overview,
  Article,
  SignIn,
  SignUp
} from './containers'

export default article Routes extends Component {
  render() {
    return (
      <div>
        <Route exact path='/' component={Overview} />
        <Route exact path='/article/:articleId' component={Article} />
        // <Route path='/article/:articleId/students/:studentId' component={Student} />
        <Route path='/sign-in' component={SignIn} />
        <Route path='/sign-up' component={SignUp} />
      </div>
    )
  }
}
