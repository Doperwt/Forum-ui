import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { replace, push } from 'react-router-redux'
import signIn from '../actions/user/sign-in'
import Title from '../components/UI/Title'


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
    super(props);
    this.state = {email: ''};
    this.state = {password: ''};
  }
  
  submitForm(event) {
    event.preventDefault()
    const user = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.signIn(user)
  }

  handleChangeEmail(event){
    this.setState({email: event.target.value})
  }

  handleChangePassword(event){
    this.setState({password: event.target.value})
  }

  signUp() {
    this.props.push('/sign-up')
  }

  render() {
    return (
      <div>
        <Title content='Sign In' level={2} />
        <form onSubmit={this.submitForm.bind(this)}>
          <div className='input'>
            <input type='text'  value={this.props.email}
            placeholder='Email address' onChange={this.handleChangeEmail.bind(this)}/>
          </div>
          <div className='input'>
            <input type='password'  value={this.props.password}
            placeholder='Password' onChange={this.handleChangePassword.bind(this)} />
          </div>
        </form>
        <button
          onClick={ this.signUp.bind(this) }
          >Sign up</button>
        <button
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
