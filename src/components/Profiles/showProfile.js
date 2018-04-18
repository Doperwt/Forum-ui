import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfile } from '../../actions/user'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import noPic from '../../lib/GenericImages/118781.png'

class ShowProfile extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    signedIn: PropTypes.bool
  }
  componentWillMount() {
    const { push, signedIn,profile,userId,getProfile } = this.props
    if (!signedIn) push('/sign-in')
    if(!profile){
      getProfile(userId)
    }
    subscribeToWebsocket()
  }

  render(){
    const profile = this.props.profile
    return(
      <div>
        <img className='profile_pic' src={!!profile? (!!profile.picture?profile.picture:noPic):noPic} alt={!!profile?profile.fullName:'no name'} />
        <div className='input'>
          <p>{!!profile ? profile.fullName:'Your full name'}</p>
        </div>
        <div className='input' >
          <hr />
          <p>{!!profile ? profile.bio:'this.state.bio'}</p>
        </div>
    </div>
    )
  }
}

const mapStateToProps = ({ currentUser, profile }) => {
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    profile: profile
  }
}

export default connect(mapStateToProps, { push,getProfile })(ShowProfile)
