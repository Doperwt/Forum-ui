import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import signOut from '../../actions/user/sign-out'
import { connect } from 'react-redux'
import './UI.css'

class Nav extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  goHome = () => {
    this.props.push('/')
  }

  signOut = (event) => {
  event.preventDefault()
  this.props.signOut()
  }

  signIn = () => {
    console.log('/sign-in')
    this.props.push('/sign-in')
  }

  signUp = () => {
    console.log('/sign-up')
    this.props.push('/sign-up')
  }

  dropDown = () => {
    if(this.props.signedIn){
      return(
        <span className="dropdown">
          <button className="dropbtn">Dropdown</button>
          <div className="dropdown-content">
            <button onClick={this.signIn}>Log in</button><hr />
            <button onClick={this.signUp}>Sign up</button>
          </div>
        </span>
      )
    } else {
      return(
        <div className='dropdown'>
          <span>Profile</span>
        </div>
      )
    }

  }
  render(){
    return(
      <div className='navi'>
        <span className='nav'>test</span> {this.dropDown()}
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, signOut })(Nav)
