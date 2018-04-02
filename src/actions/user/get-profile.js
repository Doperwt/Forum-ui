import API from '../../api/client'
import { LOAD_ERROR, LOAD_SUCCESS, APP_LOADING } from '../loading'

export const GOT_PROFILE = 'GOT_PROFILE'
const api = new API()


export default (userId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    api.get(`/profile/${userId}`)
    .then((result) => {
      dispatch({ type: LOAD_SUCCESS })
      dispatch({type:GOT_PROFILE,payload:result.body})
    })
    .catch((error) => {
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}
