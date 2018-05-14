import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../components/UI/Title'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import EditProfile from '../components/Profiles/editProfile'
import ShowProfile from '../components/Profiles/showProfile'
import { getProfile } from '../actions/user'
import './container.css'

class Profile extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signedIn: PropTypes.bool
  }

  componentWillMount() {
    const { push, signedIn,profile,userId,getProfile } = this.props
    if (!signedIn) push('/sign-in')
    if(!profile && !!userId){
      getProfile(userId)
    } else {
      console.log('wat',!!userId,!!profile)
    }
    this.setState({
      editHidden:true,
    })
    subscribeToWebsocket()
  }

  constructor(props) {
    super(props)
    this.state = {
      editHidden:true,
    }
  }

  toggleEdit(event){
    event.preventDefault()
    this.setState({editHidden: !this.state.editHidden})
  }

  render(){
    const { profile,userId } = this.props
    let hidden = this.state.editHidden
    let ownProfile
    if(!profile){ ownProfile=true} else { ownProfile = profile.userId===userId }
    if(!profile){hidden=false}
    return(
      <div className='profile main'>
        <Title content='Profile' level={2} />
        {hidden?<ShowProfile profile={profile}/>:<EditProfile profile={profile} />}
        <button onClick={ this.toggleEdit.bind(this)} hidden={!ownProfile}>{hidden? 'Edit profile':'Cancel'}</button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, profile }) => {
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    profile: profile[0]
  }
}

export default connect(mapStateToProps, { push,getProfile })(Profile)
