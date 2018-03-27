import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import signUp from '../actions/user/sign-up'
import Title from '../components/UI/Title'
import './container.css'


export class SignUp extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signUp: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {email: '',name:'',password: ''};
  }

  submitForm(event) {
    event.preventDefault()
    if (this.validateAll()) {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      }
      this.props.signUp(user)
    }
    return false
  }

  signIn() {
    this.props.push('/sign-in')
  }

  validateAll() {
    return this.validateName({target:this.state.name}) &&
      this.validateEmail({target:this.state.email}) &&
      this.validatePassword({target:this.state.password}) &&
      this.validatePasswordConfirmation({target:this.state.passwordConfirmation})
  }

  validateName(event) {
    this.setState({name: event.target.value})
    const name  = this.state.name
    if (name.length > 1) {
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

  validateEmail(event) {
    this.setState({email: event.target.value})
    const email  = this.state.email
    if (email.match(/^[a-z0-9._-]+@[a-z0-9._-]+.[a-z0-9._-]+$/)) {
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

  validatePassword(event) {
    this.setState({password: event.target.value})
    const password  = this.state.password
    if (password.length < 6) {
      this.setState({
        passwordError: 'Password is too short'
      })
      return false
    }

    if (password.match(/[a-zA-Z]+/) && password.match(/[0-9]+/)) {
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

  validatePasswordConfirmation(event) {
    this.setState({passwordConfirmation: event.target.value})
    const { password, passwordConfirmation } = this.state
    console.log(password, passwordConfirmation )
    if (password === passwordConfirmation && passwordConfirmation) {
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
      <div className='sign_up'>
        <Title content='Sign Up' level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className='input'>
              <input type='text' name='name'  placeholder='Your name'
              onChange={this.validateName.bind(this)} />
              <p>{ this.state.nameError}</p>
          </div>
          <div className='input'>
            <input type='text'  name='email' placeholder='Email address'
              onChange={this.validateEmail.bind(this)} />
              <p>{ this.state.emailError}</p>

          </div>
          <div className='input'>
            <input type='password' name='password'  placeholder='Password'
              onChange={this.validatePassword.bind(this)} />
              <p>{ this.state.passwordError}</p>

          </div>
          <div className='input'>
            <input type='password' ref='passwordConfirmation'  placeholder='Repeat Password'
              onKeyUp={this.validatePasswordConfirmation.bind(this)}
              onChange={this.validatePasswordConfirmation.bind(this)} />
              <p>{ this.state.passwordConfirmationError}</p>

          </div>
        </form>
        <button onClick={ this.signIn.bind(this) } >Sign in</button>
        <button onClick={ this.submitForm.bind(this) }>Sign up</button>
      </div>
    )
  }
}

export default connect(null, { signUp, push })(SignUp)
