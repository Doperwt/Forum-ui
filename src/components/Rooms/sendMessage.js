import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import updateRoom from '../../actions/rooms/updateRoom'
import './room.css'

class SendMessage extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signedIn: PropTypes.bool
  }
  componentWillMount() {
    const { push, signedIn } = this.props
    // if (!signedIn) push('/sign-in')
    subscribeToWebsocket()
  }
  sendMessage(event,message,roomId,userId){
    event.preventDefault()
    const { updateRoom,room } = this.props
    let updatedRoom = room
    updatedRoom.messages = room.messages.concat(message)
    console.log(message,roomId,userId,event)
    // updateRoom(updatedRoom)
  }

  render(){
    const { roomId,userId } = this.props
    console.log(this.props)
    return(
      <div>
        <form className='input'>
          <input type='text' onSubmit={this.sendMessage.bind(this,roomId,userId)} placeholder='type here'/>
        </form>
    </div>
    )
  }
}



export default connect(null, { push,updateRoom })(SendMessage)
