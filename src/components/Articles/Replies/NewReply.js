import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import newReply from '../../../actions/articles/newReply'
import { fetchOneArticle } from '../../../actions/articles/fetchArticles'
import { connect as subscribeToWebsocket } from '../../../actions/websocket'

class NewReply extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    newReply: PropTypes.func.isRequired,
    fetchOneArticle: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      content: '',
      hidden:true,
    }
  }

  componentWillMount() {
    const { article,fetchOneArticle, subscribeToWebsocket,articleId } = this.props
    // if (!article) { fetchOneArticle(articleId) }
    subscribeToWebsocket()
  }

  submitForm(event) {
    const {newReply,articleId} = this.props
    event.preventDefault()
    const reply = {
      content: this.state.content,
      author: this.props.userId,
      replyTo: this.props.articleId,
    }
    newReply(articleId,reply)
  }

  handleContent(event){
    this.setState({content: event.target.value})
    const content  = this.state.content
    if(!!content){
      if (content.length > 1) {
        this.setState({
          contentError: null
        })
        return true
      }
    }

    this.setState({
      contentError: 'Please provide your first name'
    })
    return false
  }
  toggleHidden(event){
    event.preventDefault()
    this.setState({hidden: !this.state.hidden})
  }

  render(){
    let hidden = this.state.hidden
    return(
      <div className='new_reply'>
          <form onSubmit={this.submitForm.bind(this)}>
          <div className='input' hidden={hidden}><hr />
          <p>Reply</p>
          <input type='text'  name='content' placeholder='Content'
            onChange={this.handleContent.bind(this)} />
            <p>{ this.state.contentError}</p>
          </div>
        </form>
        <button
          className='reply_button'
          onClick={ this.toggleHidden.bind(this) }

          >{hidden? 'Reply':'Cancel'}</button>
          <button
          className='reply_button'
          onClick={ this.submitForm.bind(this) }
          hidden={hidden}
          >Submit</button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,articles }, match) => {
  const article = articles.filter((a) => (a._id === match.ArticleId))[0]
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    articleId: article._id,
  }
}

export default connect(mapStateToProps,{ push,newReply,fetchOneArticle,subscribeToWebsocket })(NewReply)
