import API from '../../api/client'
import { LOAD_ERROR } from '../loading'
export const FETCHED_REPLIES = 'FETCHED_REPLIES'
export const FETCHED_ONE_REPLY = 'FETCHED_ONE_REPLY'
export const CLEAR_REPLIES = 'CLEAR_REPLIES'

const api = new API()

export default (ArticleId) => {
  return (dispatch) => {
    api.get(`/articles/${ArticleId}/replies`)
      .then((result) => {
        dispatch({
          type: FETCHED_REPLIES,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({
          type: 'LOAD_ERRORr',
          payload: error.message
        })
      })
  }
}

export const fetchOneReply = (ArticleId,ReplyId) => {
  return dispatch => {
    api.get(`/articles/${ArticleId}/replies/${ReplyId}`)
      .then((result) => {
        dispatch({
          type: FETCHED_ONE_REPLY,
          payload: result.body
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
export const clearReplies = () => {
  return dispatch => {
    dispatch({
      type:CLEAR_REPLIES,
      payload:[]
    })
  }
}
