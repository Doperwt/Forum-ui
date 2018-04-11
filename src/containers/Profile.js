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
    console.log(!profile)
    if(!!profile){
      getProfile(userId)
    } else {
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
    const profile = this.props.profile
    let hidden = this.state.editHidden
    console.log('render',profile)
    if(!profile){hidden=false}
    return(
      <div className='profile'>
        <Title content='Profile' level={2} />
        {hidden?<ShowProfile profile={profile}/>:<EditProfile profile={profile} />}
        <button onClick={ this.toggleEdit.bind(this)} >{hidden? 'Edit profile':'Cancel'}</button>
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

export default connect(mapStateToProps, { push,getProfile })(Profile)
