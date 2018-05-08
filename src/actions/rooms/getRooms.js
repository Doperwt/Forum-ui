import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const FOUND_ROOMS = 'FOUND_ROOMS'
export const FOUND_ROOM = 'FOUND_ROOM'
export const CLEAR_ROOMS = 'CLEAR_ROOMS'
const api = new API()

export default () => {
  return dispatch => {
    api.get('/rooms')
      .then((result) => {
        dispatch({type:FOUND_ROOMS,payload:result.body})
      })
      .catch((err)=>{dispatch({type:LOAD_ERROR,payload:err.message})})
  }
}

export const getRoom = (roomId) => {
  return dispatch => {
    api.get(`/room/${roomId}`)
      .then((result) => {
        if(!!result.body._id){
        dispatch({type:FOUND_ROOM,payload:result.body})
      } else {
        dispatch({type:LOAD_ERROR,payload:'room not found'})
      }

      })
      .catch((err) => { dispatch({type:LOAD_ERROR,payload:err.message})})
  }
}

export const clearReplies = () => {
  return dispatch => {
    dispatch({type:CLEAR_ROOMS})
  }
}
