import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSingleMessage } from '../../actions/messages/fetchMessage'
import SendMessage from './sendMessage'
import ShowPostTime from '../UI/showPostTime'
import './message.css'

class ShowMessage extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getSingleMessage: PropTypes.func.isRequired,
  }
  componentWillMount(){
    const {messageId,getSingleMessage } = this.props
    getSingleMessage(messageId)
  }
  render(){
    let message = this.props.message
    if(!message){
      message = {content:'placeholder'}
    }
    console.log(message)
    return(
      <div className='message'><h4>{message.authorName}</h4>
        <div>
          <p>{!!message.createdAt?ShowPostTime(message.createdAt,'Send '):null}</p>
          {message.content}
        </div>
        <SendMessage replyTo={message._id} recieverId={message.author} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,messages },match) => {
  let id = match.match.params.messageId
  let message = messages.filter(message => message._id===id)[0]
  return{
    signedIn: (!!currentUser && !!currentUser._id),
    userId: (!!currentUser?currentUser._id:null),
    message:message,
    messageId:id,
  }
}

export default connect(mapStateToProps,{push,getSingleMessage})(ShowMessage)
