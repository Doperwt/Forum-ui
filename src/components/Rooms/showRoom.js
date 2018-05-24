import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getRoom } from '../../actions/rooms/getRooms'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import SendMessage from './sendMessage'
import { addUser,removeUser } from '../../actions/rooms/changeParticipants'
import './room.css'

class ShowRoom extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getRoom: PropTypes.func.isRequired,
    signedIn: PropTypes.bool
  }
  componentWillMount() {
    const { push, signedIn,roomId,getRoom,subscribeToWebsocket } = this.props
    if (!signedIn) push('/sign-in')
    getRoom(roomId)
    subscribeToWebsocket(roomId)
  }
  componentDidMount(){
  }
  componentWillReceiveProps(){

    const { room,userId,push } = this.props
    if( !!room && !!userId && (!!room?(room.participants.indexOf(userId)===-1):true)){
      push('/rooms')
    }
  }
  showLines(line,indexOf){
    return( <span key={indexOf}>{ line.userName } : {line.content}<br/></span>)
  }
  render(){
    const { room,userName } = this.props
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
  let userName = currentUser.email.split('@')[0]
  const userProfile = profile.filter(p => p.userId===currentUser._id)[0]
  if(!!userProfile){
    userName = userProfile.fullName
  }
  let specificRoom = ((rooms.length!==0)?rooms.filter(r => r._id===roomId)[0]:null)
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    room: specificRoom,
    roomId:roomId,
    userName:userName
  }
}

export default connect(mapStateToProps, { push,getRoom,addUser,removeUser,subscribeToWebsocket })(ShowRoom)
