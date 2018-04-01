import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../components/UI/Title'
import updateProfile from '../actions/user/update-profile'
import getProfile from '../actions/user/get-profile'
import { connect as subscribeToWebsocket } from '../actions/websocket'

class Profile extends PureComponent {
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
      console.log(profile.fullName.split(' ').splice(1).join(' '),'profilename')
      this.setState({
        firstName: profile.fullName.split(' ')[0],
        lastName:profile.fullName.split(' ').splice(1).join(' '),
        bio: profile.bio,
        picture:profile.picture,
        editHidden:true,
      })
    }
    // console.log(profile,'mount')

    subscribeToWebsocket()
  }

  constructor(props) {
    console.log('constructor')
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
      console.log(id,' - ',profile,'updateProfile')
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

  toggleEdit(event){
    event.preventDefault()
    console.log(this.state)
    this.setState({editHidden: !this.state.editHidden})
  }

  render(){
    const profile = this.props.profile
    let hidden = this.state.editHidden
    if(!profile){hidden=false}
    return(
      <div>
        <Title content='Profile' level={2} />
        <form >
          <div className='input' hidden={hidden}>
              <input type='text' name='first_name'  placeholder={!!profile ? profile.fullName.split(' ')[0]:'Your first name'}
              onChange={this.validateFirstName.bind(this)} />
              <p>{ this.state.firstNameError}</p>
          </div>
          <div className='input' hidden={hidden}>
            <input type='text'  name='last_name' placeholder={!!profile ? profile.fullName.split(' ').splice(1).join(' '):'Your last name'}
              onChange={this.validateLastName.bind(this)} />
              <p>{ this.state.lastNameError}</p>

          </div>
          <div className='input' hidden={hidden}>
            <input type='text' name='bio'  placeholder={!!profile ? profile.bio:this.state.bio}
                          onChange={this.validateBio.bind(this)} />
              <p>{ this.state.bioError}</p>

          </div>
          <div className='input' hidden={hidden}>
            <input type='file' ref='picture'  placeholder='Picture here'
              onChange={this.validatePicture.bind(this)} />
              <p>{ this.state.pictureError}</p>

          </div>
        </form>
        <button onClick={ this.toggleEdit.bind(this)} > Edit profile</button>
        <button onClick={ this.submitForm.bind(this) } hidden={hidden}>Update Profile</button>
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

export default connect(mapStateToProps, { push,getProfile,updateProfile })(Profile)
