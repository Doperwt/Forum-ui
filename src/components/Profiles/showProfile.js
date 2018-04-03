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
    if (!signedIn) push('/sign-in')
    if(!profile){
      getProfile(userId)
    } else {
      this.setState({
        firstName: profile.fullName.split(' ')[0],
        lastName:profile.fullName.split(' ').splice(1).join(' '),
        bio: profile.bio,
        picture:profile.picture,
      })
    }
    subscribeToWebsocket()
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

  submitForm(event) {
    const { updateProfile } = this.props
    event.preventDefault()
    const fullName = `${this.state.firstName} ${this.state.lastName}`
    const id = this.props.userId
    if (this.validateAll()) {
      const profile = {
        fullName: fullName,
        bio: this.state.bio,
        picture: this.state.picture
      }
      updateProfile(id,profile)
    }
    return false
  }

  validateAll() {
    return this.validateFirstName({target:this.state.firstName}) &&
    this.validateLastName({target:this.state.lastName}) &&
    this.validateBio({target:this.state.bio}) &&
    this.validatePicture({target:this.state.picture})
  }

  validateFirstName(event) {
    this.setState({firstName: event.target.value})
    const firstName  = this.state.firstName
    console.log(firstName)
    if(!!firstName){
      if (firstName.length > 1) {
        this.setState({
          firstNameError: null
        })
        return true
      }
    }
    this.setState({
      firstNameError: 'Please provide your first name'
    })
    return false
  }

  validateLastName(event) {
    this.setState({lastName: event.target.value})
    const lastName  = this.state.lastName
    if(!!lastName){
      if (lastName.length > 1) {
        this.setState({
          lastNameError: null
        })
        return true
      }
    }
    this.setState({
      lastNameError: 'Please provide your last name'
    })
    return false
  }

  validateBio(event) {
    this.setState({bio: event.target.value})
    const bio  = this.state.bio
    if(!!bio){
      if (bio.length > 1) {
        this.setState({
          bioError: null
        })
        return true
      }
    }
    this.setState({
      bioError: 'Too short'
    })
    return false
  }

  validatePicture(event) {
    this.setState({picture: event.target.value})
    const picture  = this.state.picture
    if(!!picture){
      if (picture.length > 1) {
        this.setState({
          pictureError: null
        })
        return true
      }
    }
    this.setState({
      pictureError: 'Please provide your last name'
    })
    return false
  }

  render(){
    const profile = this.props.profile

    return(
      <div>
        <img src={!!profile? (!!profile.picture?profile.picture:noPic):noPic} alt={!!profile?profile.fullName:'no name'} />
        <div className='input'>
          <p>{!!profile ? profile.fullName:'Your first name'}</p>
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
    profile: profile[0]
  }
}

export default connect(mapStateToProps, { push,getProfile,updateProfile })(ShowProfile)
