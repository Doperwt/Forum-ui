import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { specificProfile } from '../../actions/user'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import noPic from '../../lib/GenericImages/118781.png'

class ShowOtherProfile extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    specificProfile: PropTypes.func.isRequired,
    signedIn: PropTypes.bool
  }
  componentWillMount() {
    const { filteredProfile,profileId,specificProfile } = this.props
    if(!filteredProfile){
      specificProfile(profileId)
    }
    subscribeToWebsocket()
  }

  render(){
    const profile = this.props.filteredProfile
    return(
      <div className='profile main' >
        <img className='profile_pic' src={!!profile? (!!profile.picture?profile.picture:noPic):noPic} alt={!!profile?profile.fullName:'no name'} />
        <div className='input'>
          <p>{!!profile ? profile.fullName:'Profile not found'}</p>
        </div>
        <div className='input' >
          <hr />
          <p>{!!profile ? profile.bio:'this.state.bio'}</p>
        </div>
    </div>
    )
  }
}

const mapStateToProps = ({ currentUser, profile },match) => {
  const profileId = match.match.params.profileId
  let filteredProfile = profile.filter(p => p._id===profileId)[0]
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    filteredProfile: filteredProfile,
    profileId:profileId
  }
}

export default connect(mapStateToProps, { push,specificProfile })(ShowOtherProfile)
