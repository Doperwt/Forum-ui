import API from '../../api/client'

import signIn from './sign-in'

export const USER_SIGNED_UP = 'USER_SIGNED_UP'

const api = new API()

export default (user) => {
  return (dispatch) => {

    api.post('/users', user)
      .then((result) => {
        dispatch({ type: 'LOAD_SUCCESS' })
        dispatch(signIn(user)) // Sign in when sign up succeeded
      })
      .catch((error) => {
        dispatch({
          type: 'LOAD_ERROR',
          payload: error.message
        })
      })
  }
}
