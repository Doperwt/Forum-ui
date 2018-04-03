import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import { signIn } from '../actions/user'
import Title from '../components/UI/Title'
import './container.css'

export class SignIn extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signIn: PropTypes.func.isRequired,
    signedIn: PropTypes.bool,
  }

  componentWillMount() {
    const { push, signedIn } = this.props
    if (signedIn) push('/')
  }

  constructor(props) {
    super(props)
    this.state = {email: '',password: ''}
  }

  submitForm(event) {
    event.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.signIn(user)
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

  handleChangePassword(event){
    this.setState({password: event.target.value})
  }

  signUp() {
    this.props.push('/sign-up')
  }

  render() {
    return (
      <div className='sign_up'>
        <Title content='Sign In' level={2} />
        <form onSubmit={this.submitForm.bind(this)}>
          <div className='input'>
          <input type='text'  name='email' placeholder='Email address'
            onChange={this.validateEmail.bind(this)} />
            <p>{ this.state.emailError}</p>
          </div>
          <div className='input'>
            <input type='password'  value={this.props.password}
            placeholder='Password' onChange={this.handleChangePassword.bind(this)} />
          </div>
        </form>
        <button
          className='sign_in selected_button'
          onClick={ this.signUp.bind(this) }
          >Sign up</button>
        <button
          className='sign_up'
          onClick={ this.submitForm.bind(this) }
          >Sign in</button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { signIn, replace, push })(SignIn)
