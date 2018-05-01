import { FOUND_ROOMS, FOUND_ROOM,CLEAR_ROOMS } from '../actions/rooms/getRooms'
import { CREATED_ROOM } from '../actions/rooms/newRoom'
import { UPDATED_ROOM } from '../actions/rooms/updateRoom'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case FOUND_ROOMS :
      let uniqueReplies
      uniqueReplies = payload.filter(r => !state.filter(a=> a._id===r._id)[0])
      if( state.length!==0){
        return [ ...state ].concat(uniqueReplies)
      } else {
        return [ ...uniqueReplies ]
      }

    case FOUND_ROOM :
      const replyIds = state.map(g => g._id)
        if (replyIds.indexOf(payload._id) < 0) {
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
      let newState = state.map((reply) => {
        if(payload._id===reply._id){
          return payload[0]
        } else {
          return reply
        }
      })
      return newState

    case CLEAR_ROOMS :
      return [payload]

    default :
      return state
  }
}
