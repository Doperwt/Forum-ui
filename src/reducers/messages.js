import { FETCHED_MESSAGES, FETCHED_ONE_MESSAGE,CLEAR_MESSAGE } from '../actions/messages/fetchMessage'
import { NEW_MESSAGE } from '../actions/messages/newMessage'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case FETCHED_MESSAGES :
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



    case CLEAR_MESSAGE :
      return [payload]

    default :
      return state
  }
}
