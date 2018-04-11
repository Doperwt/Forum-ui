import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewReply from './Replies/NewReply'
import Reply from './Replies/Replies'
import getReplies from '../../actions/articles/fetchReplies'
import EditArticle from './editArticle'
import './articles.css'

class ShowArticle extends PureComponent {
  static propTypes = {
    replies: PropTypes.array
    }
  constructor(){
    super()
    this.state = { repliesHidden: true,editArticleHidden:true }
  }

  componentWillMount(){
    const { article,getReplies } = this.props
    getReplies(article._id)
    console.log('mount article')
  }

  toggleReplies(){
    this.setState({repliesHidden:!this.state.repliesHidden})
  }
  toggleEditArticle(){
    this.setState({editArticleHidden:!this.state.editArticleHidden})
  }
  showArticle(article){
    return(
      <div>
        <h4>{article.title}</h4>
        <p>{article.content}</p>
      </div>
    )
  }

  render() {
    const signedIn = this.props.signedIn
    const replies = this.props.replies
    const article = this.props.article
    const userId = this.props.authorId
    const repliesHidden = this.state.repliesHidden
    let editArticleHidden = this.state.editArticleHidden
    const articleReplies = replies.filter((r) => r.articleId === article._id)
    let day = article.createdAt.slice(0,10)
    let time = article.createdAt.slice(11,16)
    let author = article.author
    let isAuthor = userId===author
    return(
      <div className='article'>
      <span className='article_header'><span>{author} </span><span>posted on { day } at {time}</span></span>
        {editArticleHidden?this.showArticle(article):<EditArticle article={article} />  }

        <button className='button' onClick={this.toggleEditArticle.bind(this)} hidden={!isAuthor}>
          {editArticleHidden?'Edit article':'Cancel'}
        </button>
        <div hidden={repliesHidden}>
          <Reply replies={articleReplies} userId={userId}/>
          {signedIn?<NewReply ArticleId={article._id}/>:null}
        </div>
        <button className='button' onClick={this.toggleReplies.bind(this)}>
          {repliesHidden?'show replies':'hide replies'}
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,replies,profile },match) => {
  const article = match.article
  getReplies(article._id)
  console.log('map article')
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: (!!currentUser?currentUser._id:null),
    replies: replies,
    authorId: (!!currentUser?(!!profile.fullName?profile.fullName:currentUser.email):null)
  }
}

export default connect(mapStateToProps,{getReplies})(ShowArticle)
