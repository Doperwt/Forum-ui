import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getProfile from '../actions/user/get-profile'
import Title from '../components/UI/Title'
import Categories, {clearCategories} from '../actions/categories'
import './container.css'

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
  clickThrough(route,event){
    clearCategories()
    Categories(route.split('/')[0])
    this.props.push(route)
  }
  render(){
    return(
      <div className='article main'>
        <Title content='Overview' level={2} />
        <div className='item' onClick={this.clickThrough.bind(this,'/articles/all')}>Articles</div>
        <div className='item' onClick={this.clickThrough.bind(this,'/rooms')} >Rooms</div>
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
