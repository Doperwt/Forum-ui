import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import editReply from '../../../actions/articles/editReply'
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
    const isAuthor = (this.props.authorId===reply.author)
    let { _id,author } = reply
    let editHidden = this.state[_id]
    let day = reply.createdAt.slice(0,10)
    let time = reply.createdAt.slice(11,16)
    let updated
    if(reply.createdAt!==reply.updatedAt){
      updated = `  Edited on:${reply.updatedAt.slice(0,10)},${reply.updatedAt.slice(11,16)}`
    }
    console.log(reply.createdAt!==reply.updatedAt,updated,reply.content,'is updated')

    let Edit = (reply) => {
      let changeContent = (event) => {
        this.setState({content: event.target.value})
        return false
      }
      let submitReply = (event) => {
        event.preventDefault()
        let { editReply } = this.props
        let newReply = {
          content:this.state.content,
          articleId:reply.articleId,
          _id:reply._id
        }
        editReply(newReply)
      }
      return(
        <div><form><textarea defaultValue={reply.content} type='textarea' name='content' onChange={changeContent.bind(this)} /></form><button onClick={submitReply.bind(this)}>submit</button></div>
      )
    }
    return(
      <div className='reply' key={ _id }>
        <span className='reply_header'><span>{author} </span><span>posted on { day } at { time}</span><span>{!!updated?updated:null}</span></span>
        <br /><span>{ editHidden?Edit(reply):reply.content }</span><br />
        <button hidden={ !isAuthor } onClick={ this.toggleEdit.bind(this,_id) }>Edit</button>
      </div>
    )
  }

  render() {
    const { replies } = this.props
    return(
      <div className='replies' >{ replies.map(this.showReply.bind(this)) }</div>
    )
  }
}

export default connect(null,{ editReply })(Replies)
