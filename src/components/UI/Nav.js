import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import signOut from '../../actions/user/sign-out'
import { connect } from 'react-redux'
import './UI.css'
import logo from '../../logo.svg'
import getProfile from '../../actions/user/get-profile'
import { clearCategories } from '../../actions/categories'

class Nav extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const { userId,getProfile,profile } = this.props
    if(!!userId&&!profile){
      getProfile(userId)
    } else {
    }
    // console.log('wat',!!userId, !profile)
  }
  // componentWillReceiveProps(){
  //   const { userId,getProfile } = this.props
  //   if(!!userId){
  //     getProfile(userId)
  //   } else {
  //     console.log('wat')
  //   }
  // }
  goRoute = (route,event) => {
    event.preventDefault()
    this.props.clearCategories()
    this.props.push(route)
  }

  signOut = (event) => {
  event.preventDefault()
  this.props.signOut()
  }

  dropDown = () => {
    let profile = this.props.profile
    let email = this.props.email
    let displayName = 'Welcome'
    let count = 0
    // console.log(!!profile)
    if (!!email) {
      displayName = email
    }
    if(!!profile){
      displayName = profile.fullName
      count = profile.count
    }
    if(!this.props.signedIn){
      return(
        <span className='dropdown'>
          <button className='dropbtn topbtn'>Sign in/up</button>
          <div className='dropdown-content'>
            <button className='dropbtn' onClick={this.goRoute.bind(this,'/sign-in')}>Sign in</button><hr />
            <button className='dropbtn' onClick={this.goRoute.bind(this,'/sign-up')}>Sign up</button>
          </div>
        </span>
      )
    } else {
      return(
        <span className='dropdown'>
          <button className='dropbtn topbtn'>{displayName} </button>
          <div className='dropdown-content'>
            <button className='dropbtn' onClick={this.goRoute.bind(this,'/profile')}>Profile</button>
            <button className='dropbtn' onClick={this.goRoute.bind(this,'/messages')}>Messages{!(count===0)?`|${count}|`:null}</button>
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
        <div className='navText navTitle' onClick={this.goRoute.bind(this,'/')} >The Forum Site </div>
        <a className='navText staticLink' onClick={ this.goRoute.bind(this,'/about') }>about </a>
        <a className='navText staticLink' onClick={ this.goRoute.bind(this,'/contact') }>contact </a>
        <a className='navText staticLink' onClick={ this.goRoute.bind(this,'/articles/all') }>articles </a>
        <a className='navText staticLink' onClick={ this.goRoute.bind(this,'/rooms') }>rooms </a>
        {this.dropDown()}
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,profile,messages }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  userId: (!currentUser? null:currentUser._id),
  profile: profile[0],
  email: (!currentUser? null:currentUser.email),
})

export default connect(mapStateToProps, { push, signOut, getProfile, clearCategories })(Nav)
