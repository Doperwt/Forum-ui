import { FOUND_ROOMS, FOUND_ROOM,CLEAR_ROOMS } from '../actions/rooms/getRooms'
import { CREATED_ROOM } from '../actions/rooms/newRoom'
import { UPDATED_ROOM } from '../actions/rooms/updateRoom'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case FOUND_ROOMS :
      return payload

    case FOUND_ROOM :
      const replyIds = state.map(g => g._id)
        if (replyIds.indexOf(payload._id) !== 0) {
          return [{ ...payload }].concat(state)
        }
        return state.map((reply) => {
          if (reply._id === payload._id) {
            return { ...payload }
          }
          return reply
        })

    case CREATED_ROOM :
      return [...state].concat(payload)

    case UPDATED_ROOM :
      let newState = state.map((room) => {
        if(payload._id===room._id){
          return payload
        } else {
          return room
        }
      })
      return newState

    case CLEAR_ROOMS :
      return [payload]

    default :
      return state
  }
}
