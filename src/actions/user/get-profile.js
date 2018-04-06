import API from '../../api/client'
import { LOAD_ERROR, LOAD_SUCCESS, APP_LOADING } from '../loading'

export const COLLECTED_PROFILES = 'COLLECTED_PROFILES'
export const GOT_PROFILE = 'GOT_PROFILE'
const api = new API()


export default (userId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })
    console.log(userId,'USER ID')
    api.get(`/profile/${userId}`)
    .then((result) => {
      console.log(result.body,userId,'RESULT')
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

export const specificProfiles = (ids) => {
  return dispatch => {
    dispatch({ type: APP_LOADING})
    api.get(`/profiles`,ids)
      .then((result) => {
        dispatch({
          type:COLLECTED_PROFILES,
          payload:result
        })
      })
      .catch((err) => {dispatch({ type:LOAD_ERROR,payload:err.message})} )
  }
}
