import { FETCHED_MESSAGE, FETCHED_ONE_MESSAGE,CLEAR_MESSAGE } from '../actions/Messages/fetchMessage'
import { NEW_MESSAGE } from '../actions/Messages/newMessage'
import { MESSAGE_UPDATED } from '../actions/Messages/editMessage'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case FETCHED_MESSAGE :
      let uniqueReplies
      uniqueReplies = payload.filter(r => !state.filter(a=> a._id===r._id)[0])
      if( state.length!==0){
        return [ ...state ].concat(uniqueReplies)
      } else {
        return [ ...uniqueReplies ]
      }

    case FETCHED_ONE_MESSAGE :
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

    case NEW_MESSAGE :
      return [...state].concat(payload)

    case MESSAGE_UPDATED :
      let newState = state.map((reply) => {
        if(payload._id===reply._id){
          return payload[0]
        } else {
          return reply
        }
      })
      return newState

    case CLEAR_MESSAGE :
      return [payload]

    default :
      return state
  }
}
