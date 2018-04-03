import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import '../articles.css'

class Replies extends PureComponent {

  showReply(reply){
    return(
      <div className='reply' key={ reply._id }>
        <p>{reply.content} </p>
      </div>
    )
  }
  render() {
    const replies = this.props.replies
    return(
      <div className='replies'>{replies.map(this.showReply)}</div>
    )
  }
}

export default Replies
