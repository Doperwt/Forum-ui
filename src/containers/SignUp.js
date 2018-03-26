import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import signUp from '../actions/user/sign-up'
import Title from '../components/UI/Title'

const dialogStyle = {
  width: '400px',
  margin: '50px auto',
  padding: '2rem',
}

export class SignUp extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
  }

  state = {}

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const user = {
        name: this.refs.name.getValue(),
        email: this.refs.email.getValue(),
        password: this.refs.password.getValue()
      }
      this.props.signUp(user)
    }
    return false
  }

  signIn() {
    this.props.push('/sign-in')
  }

  validateAll() {
    return this.validateName() &&
      this.validateEmail() &&
      this.validatePassword() &&
      this.validatePasswordConfirmation()
  }

  validateName() {
    const { name } = this.refs

    if (name.getValue().length > 1) {
      this.setState({
        nameError: null
      })
      return true
    }

    this.setState({
      nameError: 'Please provide your name'
    })
    return false
  }

  validateEmail() {
    const { email } = this.refs

    if (email.getValue().match(/^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$/)) {
      this.setState({
        emailError: null
      })
      return true
    }

    if (email.value === '') {
      this.setState({
        emailError: 'Please provide your email address'
      })
      return false
    }

    this.setState({
      emailError: 'Please provide a valid email address'
    })
    return false
  }

  validatePassword() {
    const { password } = this.refs

    if (password.getValue().length < 6) {
      this.setState({
        passwordError: 'Password is too short'
      })
      return false
    }

    if (password.getValue().match(/[a-zA-Z]+/) && password.getValue().match(/[0-9]+/)) {
      this.setState({
        passwordError: null
      })
      return true
    }

    this.setState({
      passwordError: 'Password should contain both letters and numbers'
    })
    return false
  }

  validatePasswordConfirmation() {
    const { password, passwordConfirmation } = this.refs

    if (password.value === passwordConfirmation.value) {
      this.setState({
        passwordConfirmationError: null
      })
      return true
    }

    this.setState({
      passwordConfirmationError: 'Passwords do not match'
    })
    return false
  }

  render() {
    return (
      <div style={dialogStyle}>
        <Title content='Sign Up' level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className='input'>
              <input type='text' name='name'  placeholder='Your name'
              onChange={this.validateName.bind(this)}
              errorText={ this.state.nameError} />
          </div>
          <div className='input'>
            <input type='text'  name='email' placeholder='Email address'
              onChange={this.validateEmail.bind(this)}
              errorText={ this.state.emailError} />
          </div>
          <div className='input'>
            <input type='password' name='password'  placeholder='Password'
              onChange={this.validatePassword.bind(this)}
              errorText={ this.state.passwordError} />
          </div>
          <div className='input'>
            <input type='password' ref='passwordConfirmation'  placeholder='Repeat Password'
              onKeyUp={this.validatePasswordConfirmation.bind(this)}
              onChange={this.validatePasswordConfirmation.bind(this)}
              errorText={ this.state.passwordConfirmationError} />
          </div>
        </form>
        <button onClick={ this.signIn.bind(this) } >Sign in</button>
        <button onClick={ this.submitForm.bind(this) }>SIgn up</button>
      </div>
    )
  }
}

export default connect(null, { signUp, push })(SignUp)
