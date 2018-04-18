import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewMessage from '../components/Articles/NewMessage'
import getMessages from '../actions/articles/getMessages'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import ShowMessage from '../components/Articles/showMessage'
import { clearMessages } from '../actions/articles/getMessages'
import './container.css'

class Message extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getMessages: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {  getMessages,clearMessages } = this.props
    clearMessages()
    getMessages()
    subscribeToWebsocket()
  }

  showArticle(message) {
    return(
      <ShowMessage article={message} key={message._id}/>
    )
  }

  render(){
    const signedIn = this.props.signedIn
    const recievedMessages = this.props.recievedMessages
    return(
      <div className='main'>
        {recievedMessages.map(this.showMessage)}
        {signedIn?<NewMessage />:null}
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
    recievedMessages:filteredRecievedMessages,
    sentMessages:filteredSentMessages
  }
}

export default connect(mapStateToProps, { push, getMessages,clearMessages })(Message)
