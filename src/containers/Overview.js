import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getProfile from '../actions/user/get-profile'
import Title from '../components/UI/Title'

class Overview extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired
  }

  componentWillMount() {
    const { userId,getProfile } = this.props
    if(userId!==null){
      getProfile(userId)
    } else {
      console.log('wat')
    }
  }
  render(){
    return(
      <div className='article main'>
        <Title content='Overview' level={2} />
        <p></p>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,profile }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  userId: (!currentUser? null:currentUser._id),
  profile: profile,
})

export default connect(mapStateToProps, { push,getProfile })(Overview)
