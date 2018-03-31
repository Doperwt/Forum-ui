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
    const { profile,userId,getProfile } = this.props
    if(!profile){
      getProfile(userId)
    } else {
    }
  }
  goHome = () => {
    this.props.push('/')
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
    let displayName = this.props.email
    // console.log(!!profile)
    if(!!profile){
      displayName = profile.fullName
    }
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
            <button className='dropbtn' onClick={this.profile}>Profile</button><hr />
            <button className='dropbtn' onClick={this.signOut}>Sign out</button>
          </div>
        </span>
      )
    }
  }

  render(){
    let profile = this.props.profile
    console.log(profile,'mount profile')

    return(
      <div className='navi'>
        <img src={logo} className='logo' onClick={this.goHome} alt='somealt'/>
        <span className='navText'>test</span> {this.dropDown()}
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,profile }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  userId: (!currentUser? null:currentUser._id),
  profile: profile[0],
  email: (!currentUser? null:currentUser.email),
})

export default connect(mapStateToProps, { push, signOut, getProfile })(Nav)
