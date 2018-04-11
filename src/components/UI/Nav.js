import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import signOut from '../../actions/user/sign-out'
import { connect } from 'react-redux'
import './UI.css'
import logo from '../../logo.svg'
import getProfile from '../../actions/user/get-profile'

class Nav extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
  }
  componentWillMount() {
    const { userId,getProfile } = this.props
    console.log('mount',userId)
    if(userId!==null){
      getProfile(userId)
    } else {
      console.log('wat')
    }
  }
  constructor(props){
    super(props)
    console.log('constructor',this.props)
  }
  componentDidMount(){
    console.log('didmount',this.props)
  }
  componentDidUpdate(){
    console.log('didupdate',this.props)
  }
  goRoute = (route,event) => {
    this.props.push(route)
  }

  signOut = (event) => {
  event.preventDefault()
  this.props.signOut()
  }

  signIn = (event) => {
    event.preventDefault()
    this.props.push('/sign-in')
  }

  signUp = (event) => {
    event.preventDefault()
    this.props.push('/sign-up')
  }
  profile = (event) => {
    event.preventDefault()
    this.props.push('/profile')
  }

  dropDown = () => {
    let profile = this.props.profile
    let email = this.props.email
    let displayName = 'Welcome'
    // console.log(!!profile)
    if (!!email) {
      displayName = email
    }
    if(!!profile.fullName){
      displayName = profile.fullName
    }
    console.log(displayName,email,profile)
    if(!this.props.signedIn){
      return(
        <span className='dropdown'>
          <button className='dropbtn'>Sign in/up</button>
          <div className='dropdown-content'>
            <button className='dropbtn' onClick={this.signIn}>Sign in</button><hr />
            <button className='dropbtn' onClick={this.signUp}>Sign up</button>
          </div>
        </span>
      )
    } else {
      return(
        <span className='dropdown'>
          <button className='dropbtn'>{displayName}</button>
          <div className='dropdown-content'>
            <button className='dropbtn' onClick={this.profile}>Profile</button>
            <button className='dropbtn' onClick={this.signOut}>Sign out</button>
          </div>
        </span>
      )
    }
  }

  render(){
    return(
      <div className='navi'>
        <img src={logo} className='logo' onClick={this.goRoute.bind(this,'/')} alt='somealt'/>
        <div className='navText navTitle'>The Forum Site </div>
        <a className='navText' onClick={ this.goRoute.bind(this,'/about') }>about </a>
        <a className='navText' onClick={ this.goRoute.bind(this,'/contact') }>contact </a>
        {this.dropDown()}
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,profile }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  userId: (!currentUser? null:currentUser._id),
  profile: profile,
  email: (!currentUser? null:currentUser.email),
})

export default connect(mapStateToProps, { push, signOut, getProfile })(Nav)
