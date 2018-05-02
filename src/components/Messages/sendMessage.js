import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import newMessage from '../../actions/messages/newMessage'
import getNames from '../../actions/messages/getNames'
import './message.css'

class SendMessage extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    newMessage: PropTypes.func.isRequired,
  }
  constructor(props){
    super(props)
    this.state = { messageSent:false }
  }
  componentDidMount(){
    // console.log(this.props)
  }
  handleContent(event){
    this.setState({content: event.target.value})
  }

  handleReciever(event){
    const { getNames } = this.props
    getNames(event.target.value)
    console.log(event.target.value)
    this.setState({reciever: event.target.value})
  }

  submitForm(event){
    event.preventDefault()
    const {userId,newMessage} = this.props
    const { content,reciever } = this.state
    const message = {
      content:content,
      reciever:reciever,
      author:userId
    }
    newMessage(message)
    this.setState({messageSent:true})
  }

  showNames(name){
    const clickName = (name,event) => {
      this.setState({recieverName:name.name})
      this.handleReciever({target:{value:name._id}})
    }
    return(
      <p key={name._id} onClick={clickName.bind(this,name)}>{name.name}</p>
    )
  }

  render(){
    const { names,replyTo,recieverId,signedIn } = this.props
    // console.log(!!replyTo)
    let recieverName
    let { messageSent } = this.state
    if(!!this.state){
      recieverName = this.state.recieverName
    }
    if(!!replyTo){
      this.setState({reciever:recieverId,replyTo:replyTo})
    }
    let isReply = !!replyTo
    if(replyTo==='user'){
      isReply = false
    }
    return(
      <div hidden={!signedIn}>
        <form>
          <h4>{!isReply?'New message':'Send Reply'}</h4>
          <div>
            <p hidden={!messageSent} >message sent </p>
            <input type='text' name='reciever' placeholder='Reciever' autoComplete='off'  hidden={!!replyTo} onChange={this.handleReciever.bind(this)}/><br/>
            <div className='nameBox' hidden={!!replyTo} >{ names.map(this.showNames.bind(this))} </div>
            <p>{recieverName?`reciever is ${recieverName}`:null}</p>
            <textarea type='text'  name='content' rows='5' cols='60' placeholder='Content'
              onChange={this.handleContent.bind(this)} /><br/>
            <button
              className='reply_button'
              onClick={ this.submitForm.bind(this) }
              >Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,names },match) => {
  let filteredNames = names.filter(name=> name._id!==currentUser._id)
  // console.log(match)
  return{
    signedIn: (!!currentUser && !!currentUser._id),
    userId: (!!currentUser?currentUser._id:null),
    names: filteredNames,
    }

}

export default connect(mapStateToProps,{ push,newMessage,getNames })(SendMessage)
