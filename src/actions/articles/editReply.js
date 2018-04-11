import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const REPLY_UPDATED = 'REPLY_UPDATED'

const api = new API()

export default (reply) => {
  return (dispatch) => {
    api.patch(`/articles/${reply.articleId}/replies/${reply._id}`,reply)
      .then((result) => {
        dispatch({
          type:REPLY_UPDATED,
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
