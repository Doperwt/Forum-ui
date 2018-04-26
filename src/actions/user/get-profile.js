import API from '../../api/client'
import { LOAD_ERROR, LOAD_SUCCESS, APP_LOADING } from '../loading'

export const COLLECTED_PROFILES = 'COLLECTED_PROFILES'
export const GOT_PROFILE = 'GOT_PROFILE'
export const NO_PROFILE = 'NO_PROFILE'
const api = new API()


export default (userId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    api.get(`/profile`)
    .then((result) => {
      if(result.body==='not found'){
        dispatch({type: NO_PROFILE })
      } else {
        dispatch({ type: LOAD_SUCCESS })
        dispatch({ type:GOT_PROFILE ,payload:result.body })
      }
    })
    .catch((error) => {
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}

export const specificProfile = (id) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    api.get(`/profile/${id}`)
      .then((result) => {
        dispatch({
          type:GOT_PROFILE,
          payload:result.body
        })
      })
      .catch((err) => {
        dispatch({
          type:LOAD_ERROR,
          payload:err.message
        })
      })
  }
}
