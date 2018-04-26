import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const ARTICLE_DELETED = 'ARTICLE_DELETED'

const api = new API()

export default (id) => {
  return (dispatch) => {
    api.delete(`/articles/${id}`)
      .then((result) => {
        dispatch({
          type:ARTICLE_DELETED,
          payload:result.body
        })
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
