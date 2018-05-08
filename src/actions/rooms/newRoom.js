import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const CREATED_ROOM = 'CREATED_ROOM'
const api = new API()

export default (room) => {
  return dispatch => {
    api.post('/room',room)
      .then((result) => {
        dispatch({type:CREATED_ROOM,payload:result})
      })
      .catch((err)=>{dispatch({type:LOAD_ERROR,payload:err.message})})
  }
}
