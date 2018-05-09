import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewArticle from '../components/Articles/NewArticle'
import getArticles from '../actions/articles/fetchArticles'
import { connect as subscribeToWebsocket } from '../actions/websocket'
import ShowArticle from '../components/Articles/showArticle'
import { clearReplies } from '../actions/articles/fetchReplies'
import Categories, {clearCategories} from '../actions/categories'

import './container.css'

class Article extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
    getArticles: PropTypes.func.isRequired,
  }

  componentWillMount() {
    const {  getArticles,clearReplies, Categories, route } = this.props
    clearReplies()
    getArticles()
    subscribeToWebsocket()
    Categories(route)
  }

  showArticle(article) {
    return(
      <ShowArticle article={article} key={article._id}/>
    )
  }

  render(){
    const signedIn = this.props.signedIn
    const articles = this.props.articles
    return(
      <div className='main'>
        {articles.map(this.showArticle)}
        {signedIn?<NewArticle />:null}
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, articles, router }, match ) => {
  const category = match.match.params.category
  const route = router.location.pathname.split('/')[1]
  let filteredArticles
  if(category!=='all'){
     filteredArticles = articles.filter(article => article.category===category )
  } else { filteredArticles = articles }
  return {
    signedIn: (!!currentUser && !!currentUser._id),
    articles:filteredArticles,
    route:route
  }
}

export default connect(mapStateToProps, { push, getArticles,clearReplies, Categories,clearCategories })(Article)
