import { FETCHED_ARTICLES, FETCHED_ONE_ARTICLE } from '../actions/articles/fetchArticles'
import { NEW_ARTICLE } from '../actions/articles/newArticle'
import { ARTICLE_UPDATED } from '../actions/articles/editArticle'
import { ARTICLE_DELETED } from '../actions/articles/deleteArticle'
export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case FETCHED_ARTICLES :
      return [ ...payload ]

    case FETCHED_ONE_ARTICLE :
    const articleIds = state.map(g => g._id)
      if (articleIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
      }
      return state.map((article) => {
        if (article._id === payload._id) {
          return { ...payload }
        }
        return article
      })

    case NEW_ARTICLE :
      return [{ ...payload }].concat(state)

    case ARTICLE_UPDATED :
      let updatedState = state.map((article) => {
        if(article._id===payload._id){
          return payload
        } else {
          return article
        }
      })
      return updatedState

    case ARTICLE_DELETED :
      let filterredState = state.filter(article => article._id!==payload._id )
      return filterredState

    default :
      return state
  }
}
