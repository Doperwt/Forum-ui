import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../components/UI/Title'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import Categories, {clearCategories} from '../actions/categories'
import NewRoom from '../components/Rooms/newRoom'
import getRooms from '../actions/rooms/getRooms'
import updateRoom from '../actions/rooms/updateRoom'
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
  roomClick(bound,event){
    const { room,userId } = bound
    const { updateRoom } = this.props
    let updatedRoom = room
    let participants = room.participants
    let index = participants.indexOf(userId)
    if(room.ownerId===userId){
      console.log('the delete code would go here, if i had any')
      // delete room stuff
    } else {
      if(index === -1){
        updatedRoom.participants = room.participants.concat(userId)
        updateRoom(updatedRoom)
      } else {
        updatedRoom.participants.splice(index,1)
        updateRoom(updatedRoom)
      }
    }
  }
  listRoom(room){
    const { userId } = this.props
    let isOwner = (userId === room.ownerId)
    let hasJoined = (room.participants.indexOf(userId) !== -1)
    let bind = {userId:userId,room:room}
    return(
      <div key={room._id}>
        {room.name}: current users:{room.participants.length}
        <button onClick={ this.roomClick.bind(this,bind) }>
          {isOwner?'delete':(hasJoined?'leave':'join')}
        </button>
      </div>
    )
  }
  render(){
    const { rooms } = this.props
    return(
      <div className='article main'>
        <Title content='Current Rooms' level={2} />
        {rooms.map(this.listRoom.bind(this))}
        <NewRoom />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, rooms, router }, match ) => {
  const route = router.location.pathname.split('/')[1]
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: (!!currentUser?currentUser._id:null),
    rooms:rooms,
    route:route
  }
}

export default connect(mapStateToProps, { push,Categories,clearCategories,subscribeToWebsocket,getRooms,updateRoom })(Room)
