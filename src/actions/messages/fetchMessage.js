import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const FETCHED_MESSAGES = 'FETCHED_MESSAGES'
export const FETCHED_ONE_MESSAGE = 'FETCHED_ONE_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

const api = new API()

export default (userId) => {
  return (dispatch) => {
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

export const clearMessages = () => {
  return dispatch => {
    dispatch({
      type:CLEAR_MESSAGE,
      payload:[]
    })
  }
}
