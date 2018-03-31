import API from '../../api/client'

export const NEW_ARTICLE = 'NEW_ARTICLE'

const api = new API()

export default (article) => {
  return (dispatch) => {
    api.post('/articles',article)
      .then((result) => {
        dispatch({
          type:NEW_ARTICLE,
          payload:result.body
        })
      })
      .catch((error) => {
        dispatch({
          type: 'LOAD_ERRORR',
          payload: error.message
        })
      })
  }
}
