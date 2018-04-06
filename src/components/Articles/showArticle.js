import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewReply from './Replies/NewReply'
import Reply from './Replies/Replies'
import getReplies from '../../actions/articles/fetchReplies'
import './articles.css'

class ShowArticle extends PureComponent {
  static propTypes = {
    replies: PropTypes.array
  }
  constructor(){
    super()
    this.state = { repliesHidden: true }
  }

  componentWillMount(){
    const { article,getReplies } = this.props
    getReplies(article._id)

  }

  toggleReplies(){
    this.setState({repliesHidden:!this.state.repliesHidden})
  }

  render() {
    const replies = this.props.replies
    const article = this.props.article
    const userId = this.props.authorId
    const repliesHidden = this.state.repliesHidden
    const articleReplies = replies.filter((r) => r.articleId === article._id)
    let day = article.createdAt.slice(0,10)
    let time = article.createdAt.slice(11,16)
    let author = article.author
    console.log(userId)
    return(
      <div className='article'>
      <span className='article_header'><span>{author} </span><span>posted on { day } at {time}</span></span>
        <h4>{article.title}</h4>
        <p>{article.content}</p>
        <div hidden={repliesHidden}>
          <Reply replies={articleReplies} userId={userId}/>
          <NewReply ArticleId={article._id}/>
        </div>
        <button className='button' onClick={this.toggleReplies.bind(this)}>
          {repliesHidden?'show replies':'hide replies  '}
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,replies,profile },match) => {
  const article = match.article
  console.log(profile)
  getReplies(article._id)
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    replies: replies,
    authorId: (!!profile.fullName?profile.fullName:currentUser.email)
  }
}

export default connect(mapStateToProps,{getReplies})(ShowArticle)
