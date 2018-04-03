import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import '../articles.css'

class Replies extends PureComponent {

  constructor(props){
    super()
    this.state = { }
  }

  toggleEdit(reply,event){
    const replyId = reply._id
    this.setState({[replyId]:!this.state[replyId]})
  }

  showReply(reply){
    const isAuthor = (this.props.userId===reply.author)
    let replyId = reply._id
    let editHidden = this.state[replyId]
    return(
      <div className='reply' key={ reply._id }>
        <p>{ reply.content } </p>
        <p hidden={ !editHidden }>test</p>
        <button hidden={ !isAuthor } onClick={ this.toggleEdit.bind(this,reply) }>Edit</button>
      </div>
    )
  }

  render() {
    const replies = this.props.replies
    return(
      <div className='replies' >{ replies.map(this.showReply.bind(this)) }</div>
    )
  }
}

export default Replies
