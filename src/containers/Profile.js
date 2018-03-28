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
    updateProfile: PropTypes.func.isRequired
  }
  componentWillMount() {
    const { push, signedIn, getProfile } = this.props
    if (!signedIn) push('/sign-in')
    console.log('test')
    getProfile(this.props.userId)
    subscribeToWebsocket()
  }

  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName:'',
      bio: '',
      picture:'',
    }
  }

  submitForm(event) {
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
      this.props.updateProfile(id,profile)
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
    if (firstName.length > 1) {
      this.setState({
        firstNameError: null
      })
      return true
    }
    this.setState({
      firstNameError: 'Please provide your first name'
    })
    return false
  }

  validateLastName(event) {
    this.setState({lastName: event.target.value})
    const lastName  = this.state.lastName
    if (lastName.length > 1) {
      this.setState({
        lastNameError: null
      })
      return true
    }
    this.setState({
      lastNameError: 'Please provide your last name'
    })
    return false
  }

  validateBio(event) {
    this.setState({bio: event.target.value})
    const bio  = this.state.bio
    if (bio.length > 1) {
      this.setState({
        bioError: null
      })
      return true
    }
    this.setState({
      bioError: 'Please provide your last name'
    })
    return false
  }

  validatePicture(event) {
    this.setState({picture: event.target.value})
    const picture  = this.state.picture
    if (picture.length > 1) {
      this.setState({
        pictureError: null
      })
      return true
    }
    this.setState({
      pictureError: 'Please provide your last name'
    })
    return false
  }

  render(){
    console.log(this.props)
    return(
      <div>
        <Title content='Profile' level={2} />

        <form onSubmit={this.submitForm.bind(this)}>
          <div className='input'>
              <input type='text' name='first_name'  placeholder='Your first name'
              onChange={this.validateFirstName.bind(this)} />
              <p>{ this.state.firstNameError}</p>
          </div>
          <div className='input'>
            <input type='text'  name='last_name' placeholder='Your last name'
              onChange={this.validateLastName.bind(this)} />
              <p>{ this.state.lastNameError}</p>

          </div>
          <div className='input'>
            <input type='text' name='bio'  placeholder="Write something 'interesting' about yourself "
                          onChange={this.validateBio.bind(this)} />
              <p>{ this.state.bioError}</p>

          </div>
          <div className='input'>
            <input type='text' ref='picture'  placeholder='Picture here'
              onChange={this.validatePicture.bind(this)} />
              <p>{ this.state.pictureError}</p>

          </div>
        </form>
        <button onClick={ this.submitForm.bind(this) }>Update Profile</button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  userId: currentUser._id
})

export default connect(mapStateToProps, { push,getProfile,updateProfile })(Profile)
