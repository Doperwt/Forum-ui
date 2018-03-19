import { FETCHED_ARTICLES, FETCHED_ONE_ARTICLE } from '../actions/articles/fetch'

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

    default :
      return state
  }
}
