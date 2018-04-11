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
    const { _id,authorName,author,createdAt,updatedAt,content } = reply
    const isAuthor = (this.props.userId===author)
    let editHidden = this.state[_id]
    let day = createdAt.slice(0,10)
    let time = createdAt.slice(11,16)
    let updated
    if(createdAt!==updatedAt){
      updated = `  Edited on:${updatedAt.slice(0,10)},${updatedAt.slice(11,16)}`
    }
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
        this.setState({[_id]:!this.state[_id]})
        editReply(newReply)
      }
      return(
        <div>
          <form>
            <textarea defaultValue={reply.content}
            type='textarea' name='content'
            onChange={changeContent.bind(this)} />
          </form>
          <button onClick={submitReply.bind(this)}>submit</button>
        </div>
      )
    }

    return(
      <div className='reply' key={ _id }>
        <span className='reply_header'><span>{authorName} </span><span>posted on { day } at { time}</span><span>{!!updated?updated:null}</span></span>
        <br /><span>{ editHidden?Edit(reply):content }</span><br />
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
