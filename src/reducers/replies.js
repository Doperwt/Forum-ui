import { FETCHED_REPLIES, FETCHED_ONE_REPLY,CLEAR_REPLIES } from '../actions/articles/fetchReplies'
import { NEW_REPLY,UPDATED_REPLY } from '../actions/articles/newReply'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case FETCHED_REPLIES :
      return [ ...payload ].concat(state)

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
      return [{ ...payload }].concat(state)

    case UPDATED_REPLY :
      return [{ ...payload }].concat(state)
    case CLEAR_REPLIES :
      return [payload]

    default :
      return state
  }
}