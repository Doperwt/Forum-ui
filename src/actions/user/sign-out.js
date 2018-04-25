import { push } from 'react-router-redux'
import API from '../../api/client'
import websocket from '../websocket'

export const USER_SIGNED_OUT = 'USER_SIGNED_OUT'
export const CLEAR_PROFILE = 'CLEAR_PROFILE'
const api = new API()

export default () => {
  return dispatch => {
    api.signOut()
    dispatch(push('/sign-in'))
    dispatch(websocket.disconnect())
    dispatch({ type: USER_SIGNED_OUT })
    dispatch({ type: CLEAR_PROFILE })
  }
}
