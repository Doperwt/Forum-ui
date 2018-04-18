import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const NEW_MESSAGE = 'NEW_MESSAGE'
const api = new API()

export default (message) => {
  return (dispatch) => {
    api.post(`/messages`,message)
      .then((result) => {
        dispatch({
          type:NEW_MESSAGE,
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
