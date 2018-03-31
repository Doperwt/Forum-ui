import { FETCHED_ARTICLES, FETCHED_ONE_ARTICLE } from '../actions/articles/fetch'
import { NEW_ARTICLE } from '../actions/articles/newArticle'

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

    default :
      return state
  }
}
