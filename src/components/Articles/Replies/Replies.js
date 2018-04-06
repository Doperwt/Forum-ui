import React, { PureComponent } from 'react'
import '../articles.css'

class Replies extends PureComponent {

  constructor(props){
    super()
    this.state = { }
  }

  toggleEdit(_id,event){
    this.setState({[_id]:!this.state[_id]})
  }

  showReply(reply){
    const isAuthor = (this.props.userId===reply.author)
    let { _id,author } = reply
    let editHidden = this.state[_id]
    let day = reply.createdAt.slice(0,10)
    let time = reply.createdAt.slice(11,16)
    console.log(isAuthor,author,this.props.userId,'is author')
    return(
      <div className='reply' key={ _id }>
        <span className='reply_header'><span>{author} </span><span>was posted on { day } at {time}</span></span>
        <p>{ reply.content } </p>
        <p hidden={ !editHidden }>test</p>
        <button hidden={ !isAuthor } onClick={ this.toggleEdit.bind(this,_id) }>Edit</button>
      </div>
    )
  }

  render() {
    const {replies } = this.props
    return(
      <div className='replies' >{ replies.map(this.showReply.bind(this)) }</div>
    )
  }
}

export default Replies
