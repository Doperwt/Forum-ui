import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateProfile,getProfile } from '../../actions/user'
import  { post } from 'axios'

class EditProfile extends PureComponent {
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
    this.validateFirstName = this.validateFirstName.bind(this)
    this.validateLastName = this.validateLastName.bind(this)
    this.validateBio = this.validateBio.bind(this)
    this.validatePicture = this.validatePicture.bind(this)
    this.submitForm = this.submitForm.bind(this)
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

  fileUpload(file){
    const url = process.env.REACT_APP_FILEHOST
    const unsignedUploadPreset = process.env.REACT_APP_UNSIGNEDPRESET
    const formData = new FormData()
    formData.append('file',file)
    formData.append('upload_preset', unsignedUploadPreset)
    formData.append('sources',['local','url','camera'])
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
                  }
    }
    return  post(url, formData,config)
  }

  validateAll() {
    return this.validateFirstName({target:this.state.firstName}) &&
    this.validateLastName({target:this.state.lastName}) &&
    this.validateBio({target:this.state.bio})
  }

  validateFirstName(event) {
    this.setState({firstName: event.target.value})
    const firstName  = this.state.firstName
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
    // this.setState({picture: event.target.value})
    const picture  = event.target.files[0]
    const fileType = picture.name.split('.').splice(1)[0]
    if(!!picture){
      if (picture.name.length > 1 && (fileType==='jpg'||fileType==='png'||fileType==='bmp') ) {
        this.setState({
          pictureError: null
        })
        this.fileUpload(picture)
          .then((result) => {
            this.setState({picture:result.data.url})
            return true
          })
      } else {
        this.setState({
          pictureError: 'Please provide a proper picture'
        })
        return false
      }
    }
    this.setState({
      pictureError: null
    })
    return true
  }

  render(){
    const hasProfile = !!this.props.profile
    let firstName,lastName,fullName,bio
    if(hasProfile){
       bio = this.props.profile.bio
       fullName = this.props.profile.fullName
       firstName = fullName.split(' ')[0]
       lastName = fullName.split(' ').splice(1).join(' ')
    }
    return(
      <div>
        <form >
        <div className='input'>
          <p>First name</p>
          <input type='text' name='first_name'
            placeholder={hasProfile ? firstName:'Your first name'}
            onChange={ this.validateFirstName } />
          <p>{ this.state.firstNameError }</p>
        </div>
        <div className='input' >
          <p>Last name</p>
          <input type='text'  name='last_name'
            placeholder={hasProfile ? lastName:'Your last name'}
            onChange={ this.validateLastName } />
          <p>{ this.state.lastNameError }</p>
        </div>
        <div className='input' >
          <p>Bio</p>
          <textarea type='textarea'  name='bio' defaultValue={hasProfile ? bio:this.state.bio }
            rows='6' cols='50'
            onChange={ this.validateBio } />
          <p>{ this.state.bioError }</p>
        </div>
        <div className='input' >
          <p>Profile picture</p>
          <input type='file' ref='picture' multiple accept="image/*"  placeholder='Picture here'
            onChange={ this.validatePicture.bind(this) } />
        <p>{ this.state.pictureError }</p>
        </div>
      </form>
      <button onClick={ this.submitForm } >Update Profile</button>
    </div>
    )
  }
}


const mapStateToProps = ({ currentUser, profile }) => {
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    profile: profile[0],
  }
}

export default connect(mapStateToProps, { push,getProfile,updateProfile })(EditProfile)
