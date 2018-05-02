import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewReply from './Replies/NewReply'
import Reply from './Replies/Replies'
import getReplies from '../../actions/articles/fetchReplies'
import EditArticle from './editArticle'
import deleteArticle from '../../actions/articles/deleteArticle'
import { push } from 'react-router-redux'
import { specificProfile } from '../../actions/user/get-profile'
import ShowPostTime from '../UI/showPostTime'
import './articles.css'

class ShowArticle extends PureComponent {
  static propTypes = {
    replies: PropTypes.array,
    deleteArticle: PropTypes.func.isRequired,
    getReplies: PropTypes.func.isRequired,
    }
  constructor(){
    super()
    this.state = { repliesHidden: true,editArticleHidden:true,deleteVerification:false }
  }

  componentWillMount(){
    const { article,getReplies,specificProfile } = this.props
    specificProfile(article.author)
    getReplies(article._id)
  }

  toggleReplies(){
    this.setState({repliesHidden:!this.state.repliesHidden})
  }
  toggleEditArticle(){
    this.setState({editArticleHidden:!this.state.editArticleHidden})
  }
  setDelete(){
    this.setState({deleteVerification:!this.state.deleteVerification})
  }
  deleteArticle(){
    const articleId = this.props.article._id
    const { deleteArticle } = this.props
    deleteArticle(articleId)
  }
  showArticle(article){
    return(
      <div>
        <h4>{article.title}</h4>
        <p>{article.content}</p>
      </div>
    )
  }
  redirectProfile(event){
    const profile = event.props.filteredProfile
    const { push } = event.props
    push(`/profile/${profile.userId}`)
  }
  render() {
    const { signedIn,replies,article,userId,filteredProfile } = this.props
    const repliesHidden = this.state.repliesHidden
    const editArticleHidden = this.state.editArticleHidden
    const articleReplies = replies.filter((r) => r.articleId === article._id)
    let { createdAt,updatedAt,authorName,author,_id } = article
    // const day = createdAt.slice(0,10)
    // const time = createdAt.slice(11,16)
    let updated = false
    if(createdAt!==updatedAt){
      updated = true
    }

    let deleteVerification = this.state.deleteVerification
    let isAuthor = userId===author
    return(
      <div className='article'>
      <span className='article_header'>
        <span onClick={!!filteredProfile?this.redirectProfile.bind(filteredProfile.userId,this):null}>{authorName} </span>
        {ShowPostTime(createdAt,'posted ')}<span>{updated?ShowPostTime(updatedAt,' edited '):null}</span>
      </span>
        {editArticleHidden?this.showArticle(article):<EditArticle article={article} />  }

        <button className='button' onClick={this.toggleEditArticle.bind(this)} hidden={!isAuthor}>
          {editArticleHidden?'Edit article':'Cancel'}
        </button>
        <button hidden={!isAuthor}
          onClick={deleteVerification?this.deleteArticle.bind(this):this.setDelete.bind(this)}>
          {deleteVerification?'are you sure?':'delete'}
        </button>
        <div hidden={repliesHidden}>
          <Reply replies={articleReplies} userId={userId}/>
          {signedIn?<NewReply ArticleId={_id}/>:null}
        </div>
        <button className='button' onClick={this.toggleReplies.bind(this)}>
          {repliesHidden?`show ${ articleReplies.length } replies`:'hide replies'}
        </button>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser,replies,profile },match) => {
  const article = match.article
  getReplies(article._id)
  let filteredProfile = profile.filter(p => p.userId === article.author)[0]
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    userId: (!!currentUser?currentUser._id:null),
    replies: replies,
    filteredProfile:filteredProfile,
    authorId: (!!currentUser?(!!profile?profile.fullName:currentUser.email.split('@')[0]):null)
  }
}

export default connect(mapStateToProps,{ getReplies,deleteArticle,push,specificProfile })(ShowArticle)
