import API from '../../api/client'

export const GOT_PROFILE = 'GOT_PROFILE'
const api = new API()


export default (userId) => {
  return dispatch => {
    dispatch({ type: 'APP_LOADINK' })
    api.get(`/profile/${userId}`)
    .then((result) => {
      dispatch({ type: 'LOAD_SUCCESS' })
      dispatch({type:GOT_PROFILE,payload:result.body})
    })
    .catch((error) => {
      dispatch({
        type: 'LOAD_ERROR',
        payload: error.message
      })
    })
  }
}
