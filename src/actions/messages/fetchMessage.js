import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const FETCHED_MESSAGES = 'FETCHED_MESSAGES'
export const FETCHED_ONE_MESSAGE = 'FETCHED_ONE_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export const UNREAD_MESSAGE_COUNT = 'UNREAD_MESSAGE_COUNT'
const api = new API()

export default (userId) => {
  return (dispatch) => {
    // console.log('gonnagetsomemessagesmkay',userId)
    api.get(`/messages/${userId}`)
      .then((result) => {
        dispatch({
          type: FETCHED_MESSAGES,
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
export const getSingleMessage = (messageId) => {
  return dispatch => {
    api.get(`/message/${messageId}`)
      .then((result) => {
        dispatch({
          type: FETCHED_ONE_MESSAGE,
          payload: result.body
        })
      })
  }
}
export const unreadMessageCount = () => {
  return dispatch => {
    api.get(`/messages`)
      .then((result) => {
        console.log(result.body)
        dispatch({
          type:UNREAD_MESSAGE_COUNT,
          payload: result.body
        })
      })
  }
}
export const clearMessages = () => {
  return dispatch => {
    dispatch({
      type:CLEAR_MESSAGE,
      payload:[]
    })
  }
}
