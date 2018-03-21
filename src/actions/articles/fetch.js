import API from '../../api/client'

export const FETCHED_ARTICLES = 'FETCHED_ARTICLES'
export const FETCHED_ONE_ARTICLE = 'FETCHED_ONE_ARTICLE'


const api = new API()

export default () => {
  return (dispatch) => {
    api.get('/articles')
      .then((result) => {
        dispatch({
          type: FETCHED_ARTICLES,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({
          type: 'LOAD_ERROR',
          payload: error.message
        })
      })
  }
}

export const fetchOneArticle = (ArticleId) => {
  return dispatch => {
    api.get(`/articles/${ArticleId}`)
      .then((result) => {
        dispatch({
          type: FETCHED_ONE_ARTICLE,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({
          type: 'LOAD_ERROR',
          payload: error.message
        })
      })
  }
}
