import React, { PureComponent } from 'react'
import { push } from 'react-router-redux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewArticle from '../components/Articles/NewArticle'
import Categories from '../actions/articles/categories'
import getArticles from '../actions/articles/fetch'
import { connect as subscribeToWebsocket } from '../actions/websocket'

class Article extends PureComponent {
  static propTypes = {
    push: PropTypes.func.isRequired,
  }
  componentWillMount() {
    const { Categories, getArticles } = this.props
    Categories()
    getArticles()
    subscribeToWebsocket()
  }

  showArticle(article) {
    return(
      <div key={article._id}>
        <h4>{article.title}</h4>
        <p>{article.content}</p>
      </div>
    )
  }

  render(){
    console.log(this.props.categories)
    const articles = this.props.articles
    return(
      <div>
        {articles.map(this.showArticle)}
        <NewArticle />
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, categories, articles }) => ({
  signedIn: (!!currentUser && !!currentUser._id),
  categories: categories,
  articles:articles
})

export default connect(mapStateToProps, { push, Categories, getArticles })(Article)
