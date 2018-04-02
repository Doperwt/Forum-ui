import { replace } from 'react-router-redux'
import API from '../../api/client'
import { LOAD_ERROR, LOAD_SUCCESS, APP_DONE_LOADING } from '../loading'

import websocket from '../websocket'

export const USER_SIGNED_IN = 'USER_SIGNED_IN'

const api = new API()

export default ({ email, password}) => {
  return dispatch => {

    api.authenticate(email, password)
      .then((res) => {
        dispatch({ type: LOAD_SUCCESS })

        const jwt = res.body.token

        api.storeToken(jwt)

        dispatch(replace('/'))

        dispatch(websocket.connect())

        return api.get('/users/me')
      })
      .then((res) => {
        dispatch({
          type: USER_SIGNED_IN,
          payload: res.body
        })
      })
      .catch((error) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
