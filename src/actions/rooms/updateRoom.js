import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const UPDATED_ROOM = 'UPDATED_ROOM'
const api = new API()

export default (room) => {
  return dispatch => {
    api.patch('/room',room)
      .then((result) => {
        dispatch({type:UPDATED_ROOM,payload:result})
      })
      .catch((err)=>{dispatch({type:LOAD_ERROR})})
  }
}
