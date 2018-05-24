import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { connect as subscribeToWebsocket } from '../../actions/websocket'
import sendLine from '../../actions/rooms/sendLine'
import './room.css'

class SendMessage extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    signedIn: PropTypes.bool
  }
  componentWillMount() {
    subscribeToWebsocket()
  }
  constructor(props){
    super(props)
    this.state = { line:''}
  }
  sendMessage(event){
    const { sendLine,room,userName } = this.props
    event.preventDefault()
    let { line } = this.state
    let newLine = {content:line,userName:userName}
    sendLine(newLine,room._id)
    this.setState({line:''})
  }
  writeMessage(event){
    let line = event.target.value
    this.setState({line:line})
  }

  render(){
    let inputStyle = {width:'95%'}
    return(
      <div>
        <form className='input chatLine' onSubmit={this.sendMessage.bind(this)}>
          <input type='text' name='message' autoComplete='off' style={inputStyle} value={this.state.line} onChange={this.writeMessage.bind(this)} placeholder='type here'/>
        </form>
    </div>
    )
  }
}



export default connect(null, { push,sendLine })(SendMessage)
