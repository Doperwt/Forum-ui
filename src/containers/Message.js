import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SendMessage from '../components/Messages/sendMessage'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import getMessages,{ clearMessages } from '../actions/messages/fetchMessage'
import './container.css'

class Message extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {  getMessages,clearMessages,userId } = this.props
    clearMessages()
    console.log(userId)
    getMessages(userId)
    subscribeToWebsocket()
  }

  showMessage(message) {
    console.log(this)
    const clicky = (id,event) => {
      console.log(id)
      this.props.push(`/message/${id}`)
    }
    return(
      <div><p onClick={clicky.bind(this,message._id)}>From {message.author} on {message.createdAt.slice(0,10)},{message.createdAt.slice(11,16)}</p></div>
    )
  }

  render(){
    const signedIn = this.props.signedIn
    const {recievedMessages,sentMessages} = this.props

    return(
      <div className='main'>
        <p>Messages sent to you:</p>
        {recievedMessages.map(this.showMessage.bind(this))}
        <p>Messages sent by you</p>
        {sentMessages.map(this.showMessage.bind(this))}
        {signedIn?<SendMessage />:null}
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,messages } ) => {
  let filteredRecievedMessages,filteredSentMessages
  filteredRecievedMessages = messages.filter(message => message.reciever===currentUser._id )
  filteredSentMessages = messages.filter(message => message.author===currentUser._id)
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: (!!currentUser?currentUser._id:null),
    recievedMessages:filteredRecievedMessages,
    sentMessages:filteredSentMessages,

  }
}

export default connect(mapStateToProps, { push, getMessages,clearMessages })(Message)
