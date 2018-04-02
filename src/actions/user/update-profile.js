import API from '../../api/client'
import { LOAD_ERROR,LOAD_SUCCESS } from '../loading'

export const UPDATED_PROFILE = 'UPDATED_PROFILE'
const api = new API()


export default (userId,profile) => {
  return dispatch => {
    api.post(`/profile/${userId}`,profile)
    .then((result) => {
      dispatch({ type: LOAD_SUCCESS })
      dispatch({type:UPDATED_PROFILE,payload:result.body})
    })
    .catch((error) => {
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}
