import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import newMessage from '../../actions/messages/newMessage'

class SendMessage extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    newMessage: PropTypes.func.isRequired,
  }
  handleContent(event){
    this.setState({content: event.target.value})
  }
  handleReciever(event){
    this.setState({reciever: event.target.value})
  }
  submitForm(event){
    const userId = this.props.userId
    const { content,reciever } = this.state
    const message = {
      constent:content,
      reciever:reciever,
      author:userId
    }
    newMessage(message)
  }

  render(){
    return(
      <div>
        <form>
        <h4>New message:</h4>
        <input type='text' name='reciever' placeholder='Reciever' onChange={this.handleReciever.bind(this)}/><br/>
        <textarea type='text'  name='content' rows='5' cols='60' placeholder='Content'
          onChange={this.handleContent.bind(this)} /><br/>
          <button
          className='reply_button'
          onClick={ this.submitForm.bind(this) }
          >Submit</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({currentUser}) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  userId: (!!currentUser?currentUser._id:null),
})

export default connect(mapStateToProps,{ push,newMessage })(SendMessage)
