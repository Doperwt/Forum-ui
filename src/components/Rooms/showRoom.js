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
  showLines(line,indexOf){
    return( <span key={indexOf}>{ line.userName } : {line.content}<br/></span>)
  }
  render(){
    const { room,userName } = this.props
    console.log(this.props)
    return(
      <div>
        <div className='chatTitle'>
          <p>{!!room ? room.name:'Room name'}</p>
        </div>
        <div className='chatWindow' >
          <hr />
          <p>{!!room?room.messages.map(this.showLines):null}</p>
          <div className='input' >
          <hr />
          <SendMessage room={room} userName={userName}/>
          </div>
          <hr />
        </div>
    </div>
    )
  }
}

const mapStateToProps = ({ currentUser, rooms,profile },match) => {
  const roomId = match.match.params.roomId
  console.log(roomId)
  let userName = currentUser.email.split('@')[0]
  const userProfile = profile.filter(p => p.userId===currentUser._id)[0]
  if(!!userProfile){
    userName = userProfile.fullName
  }
  let specificRoom
  if(rooms.length!==0){
    console.log(rooms.length)
    specificRoom = rooms.filter(r => r._id===roomId)[0]
    console.log(specificRoom)
  }
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    room: specificRoom,
    roomId:roomId,
    userName:userName
  }
}

export default connect(mapStateToProps, { push,getRoom })(ShowRoom)
