import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getSingleMessage } from '../../actions/messages/fetchMessage'
class ShowMessage extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getSingleMessage: PropTypes.func.isRequired,
  }
  componentWillMount(){
    const {messageId,getSingleMessage } = this.props
    getSingleMessage(messageId)
    console.log('mount')
  }
  render(){
    let message = this.props.message
    if(!message){
      message = {content:'placeholder'}
    }
    return(
      <div>{message.content}</div>
    )
  }
}

const mapStateToProps = ({ currentUser,messages },match) => {
  let id = match.match.params.messageId
  console.log(id)
  let message = messages.filter(message => message._id===id)[0]
  console.log(message)
  return{
    signedIn: (!!currentUser && !!currentUser._id),
    userId: (!!currentUser?currentUser._id:null),
    message:message,
    messageId:id,
  }
}

export default connect(mapStateToProps,{push,getSingleMessage})(ShowMessage)
