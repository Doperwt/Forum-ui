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

  handleContent(event){
    this.setState({content: event.target.value})
  }

  handleReciever(event){
    const { getNames } = this.props
    getNames(event.target.value)
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
    const { names } = this.props
    let recieverName
    if(!!this.state){
      recieverName = this.state.recieverName
    }
    return(
      <div>
        <form>
          <h4>New message:</h4>
          <div>
            <input type='text' name='reciever' placeholder='Reciever' onChange={this.handleReciever.bind(this)}/><br/>
            <div className='nameBox'>{ names.map(this.showNames.bind(this))} </div>
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

const mapStateToProps = ({ currentUser,names }) => {
  let filteredNames = names.filter(name=> name._id!==currentUser._id)
  return{
    signedIn: (!!currentUser && !!currentUser._id),
    userId: (!!currentUser?currentUser._id:null),
    names: filteredNames,
    }

}

export default connect(mapStateToProps,{ push,newMessage,getNames })(SendMessage)
