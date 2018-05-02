import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SendMessage from '../components/Messages/sendMessage'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import getMessages,{ clearMessages } from '../actions/messages/fetchMessage'
import ShowPostTime from '../components/UI/showPostTime'
import './container.css'

class Message extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {  getMessages,clearMessages,userId,messages } = this.props
    console.log('mount',userId,messages)
    clearMessages()
    getMessages(userId)
    subscribeToWebsocket()
  }

  showMessage(message,index) {
    let messageReciever = `from ${message.authorName}`
    const clicky = (id,event) => {
      this.props.push(`/message/${id}`)
    }
    const odd = (index%2===0?false:true)
    const isAuthor = message.author===this.props.userId
    // console.log(isAuthor?(message.read?'read':'unread'):'notAuthor')
    if(isAuthor){
      messageReciever = `to ${message.recieverName}`
    }
    return(
      <div key={message._id} className={odd?'odd message':'even message'}>
        <p onClick={clicky.bind(this,message._id)} className={!isAuthor?(message.read?'read':'unread'):'notAuthor'}>{messageReciever} {ShowPostTime(message.createdAt,' sent ')}</p>
      </div>
    )
  }

  render(){
    const { recievedMessages,sentMessages } = this.props

    return(
      <div className='profile main'>
        <p>Messages sent to you:</p>
        {recievedMessages.map(this.showMessage.bind(this))}
        <p>Messages sent by you</p>
        {sentMessages.map(this.showMessage.bind(this))}
        <SendMessage />
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
