import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const UPDATED_ROOM = 'UPDATED_ROOM'
const api = new API()

export default (line,roomId) => {
  return dispatch => {
    api.patch(`/room/${roomId}/line`,line)
      .then((result) => {
        dispatch({type:UPDATED_ROOM,payload:result.body})
      })
      .catch((err)=>{dispatch({type:LOAD_ERROR,payload:err.message})})
  }
}
