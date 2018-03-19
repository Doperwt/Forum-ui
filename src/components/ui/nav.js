import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import signOut from '../../actions/user/sign-out'
import { connect } from 'react-redux'


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
    this.props.push('/sign-in')
  }

  render(){
    return(
      <div className='navi'>
        <p>test</p>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id)
})

export default connect(mapStateToProps, { push, signOut })(Nav)
