import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRoom } from '../../actions/rooms/getRooms'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import SendMessage from './sendMessage'

class ShowRoom extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getRoom: PropTypes.func.isRequired,
    signedIn: PropTypes.bool
  }
  componentWillMount() {
    const { push, signedIn,roomId,getRoom } = this.props
    if (!signedIn) push('/sign-in')
    getRoom(roomId)
    subscribeToWebsocket()
  }

  render(){
    const { room,userId } = this.props
    console.log(this.props)
    return(
      <div>
        <div className='input'>
          <p>{!!room ? room.name:'Room name'}</p>
        </div>
        <div className='input' >
          <hr />
          <SendMessage roomId={!!room?room._id:null} userId={userId}/>
        </div>
    </div>
    )
  }
}

const mapStateToProps = ({ currentUser, rooms },match) => {
  const roomId = match.match.params.roomId
  console.log(roomId)
  let specificRoom
  if(rooms.length!==0){
    specificRoom = rooms.filter(r => r._id===roomId)[0]
    console.log(specificRoom)
  }
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    room: specificRoom,
    roomId:roomId
  }
}

export default connect(mapStateToProps, { push,getRoom })(ShowRoom)
