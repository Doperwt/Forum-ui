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
    this.state = {repliesHidden: true}
  }

  componentWillMount(){
    const { getReplies } = this.props
    getReplies(this.props.article._id)
  }

  toggleReplies(){
    this.setState({repliesHidden:!this.state.repliesHidden})
  }

  render() {
    const replies = this.props.replies
    console.log(replies)
    const article = this.props.article
    const repliesHidden = this.state.repliesHidden
    const articleReplies = replies.filter((r) => r.articleId === article._id)
    return(
      <div className='article'>
        <h4>{article.title}</h4>
        <p>{article.content}</p>
        <div hidden={repliesHidden}>
          <Reply replies={articleReplies} />
          <NewReply ArticleId={article._id}/>
        </div>
        <button className='button' onClick={this.toggleReplies.bind(this)}>
          {repliesHidden?'show replies':'hide replies  '}
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,replies }) => {
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: currentUser._id,
    replies: replies,
  }
}

export default connect(mapStateToProps,{getReplies})(ShowArticle)
