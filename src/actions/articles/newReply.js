import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const NEW_REPLY = 'NEW_REPLY'
export const UPDATED_REPLY = 'UPDATED_REPLY'

const api = new API()

export default (articleId,reply) => {
  return (dispatch) => {
    api.post(`/articles/${articleId}/replies`,reply)
      .then((result) => {
        dispatch({
          type:NEW_REPLY,
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

export const updateReply = (articleId,reply) => {
  return (dispatch) => {
    api.patch(`/articles/${articleId}/replies/${reply._id}`,reply)
      .then((result) => {
        dispatch({
          type:UPDATED_REPLY,
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
