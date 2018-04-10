import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateProfile,getProfile } from '../../actions/user'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import noPic from '../../lib/GenericImages/118781.png'

class ShowProfile extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    signedIn: PropTypes.bool
  }
  componentWillMount() {
    const { push, signedIn,profile,userId,getProfile } = this.props
    console.log(profile)
    if (!signedIn) push('/sign-in')
    if(!profile){
      getProfile(userId)
    } else {
      if(!!profile.fullName){
        this.setState({
          firstName: profile.fullName.split(' ')[0],
          lastName:profile.fullName.split(' ').splice(1).join(' '),
          bio: profile.bio,
          picture:profile.picture,
        })
      }
    }
    subscribeToWebsocket()
  }
  componentWillReceiveProps(){
    const { profile } = this.props
    console.log('props',this.props)
    if(!!profile&&!!profile.fullName){
      this.setState({
        firstName: profile.fullName.split(' ')[0],
        lastName:profile.fullName.split(' ').splice(1).join(' '),
        bio: profile.bio,
        picture:profile.picture,
      })
    }
  }
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName:'',
      bio: "Write something 'interesting' about yourself ",
      picture:'',
      editHidden:true,
    }
  }

  render(){
    const profile = this.props.profile
    console.log(this.props)
    console.log(!!profile)
    return(
      <div>
        <img src={!!profile? (!!profile.picture?profile.picture:noPic):noPic} alt={!!profile?profile.fullName:'no name'} />
        <div className='input'>
          <p>{!!profile ? profile.fullName:'Your full name'}</p>
        </div>
        <div className='input' >
          <hr />
          <p>{!!profile ? profile.bio:this.state.bio}</p>
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

export default connect(mapStateToProps, { push,getProfile,updateProfile })(ShowProfile)
