import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const ARTICLE_UPDATED = 'ARTICLE_UPDATED'

const api = new API()

export default (article) => {
  return (dispatch) => {
    api.patch(`/articles/${article._id}`,article)
      .then((result) => {
        dispatch({
          type:ARTICLE_UPDATED,
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
