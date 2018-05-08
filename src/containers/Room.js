import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../components/UI/Title'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import Categories, {clearCategories} from '../actions/categories'
import NewRoom from '../components/Rooms/newRoom'
import getRooms from '../actions/rooms/getRooms'
import './container.css'

class Room extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
  }
  componentWillMount(){
    const { route, Categories,clearCategories,subscribeToWebsocket,getRooms } = this.props
    clearCategories()
    Categories(route)
    getRooms()
    subscribeToWebsocket()
  }
  showRoom(room){
    return(
      <div key={room._id}> {room.name} </div>
    )
  }
  render(){
    const { rooms } = this.props

    return(
      <div className='article main'>
        <Title content='Current Rooms' level={2} />
        {rooms.map(this.showRoom)}
        <NewRoom />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, rooms, router }, match ) => {
  const route = router.location.pathname.split('/')[1]
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    rooms:rooms,
    route:route
  }
}

export default connect(mapStateToProps, { push,Categories,clearCategories,subscribeToWebsocket,getRooms })(Room)
