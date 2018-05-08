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
    // const { push, signedIn } = this.props
    // if (!signedIn) push('/sign-in')
    subscribeToWebsocket()
  }
  sendMessage(event){
    const { updateRoom,room,userName } = this.props
    event.preventDefault()
    let { message } = this.state
    let updatedRoom = room
    let line = {content:message,userName:userName}
    updatedRoom.messages = room.messages.concat(line)
    console.log(updatedRoom)
    updateRoom(updatedRoom)
  }
  writeMessage(event){
    let message = event.target.value
    this.setState({message:message})
  }

  render(){
    // const { roomId,userId } = this.props
    return(
      <div>
        <form className='input chatLine' onSubmit={this.sendMessage.bind(this)}>
          <input type='text' name='message' autoComplete='off' onChange={this.writeMessage.bind(this)} placeholder='type here'/>
        </form>
    </div>
    )
  }
}



export default connect(null, { push,updateRoom })(SendMessage)
