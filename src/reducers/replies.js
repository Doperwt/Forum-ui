import { FETCHED_REPLIES, FETCHED_ONE_REPLY,CLEAR_REPLIES } from '../actions/articles/fetchReplies'
import { NEW_REPLY } from '../actions/articles/newReply'
import { REPLY_UPDATED } from '../actions/articles/editReply'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case FETCHED_REPLIES :
      let uniqueReplies
      uniqueReplies = payload.filter(r => !state.filter(a=> a._id===r._id)[0])
      if( state.length!==0){
        return [ ...state ].concat(uniqueReplies)
      } else {
        return [ ...uniqueReplies ]
      }

    case FETCHED_ONE_REPLY :
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

    case NEW_REPLY :
      return [...state].concat(payload)

    case REPLY_UPDATED :
      let newState = state.map((reply) => {
        if(payload._id===reply._id){
          return payload[0]
        } else {
          return reply
        }
      })
      return newState

    case CLEAR_REPLIES :
      return [payload]

    default :
      return state
  }
}
