import { GOT_PROFILE,NO_PROFILE } from '../actions/user/get-profile'
import { UPDATED_PROFILE } from '../actions/user/update-profile'
import { CLEAR_PROFILE } from '../actions/user/sign-out'
import { UNREAD_MESSAGE_COUNT } from '../actions/messages/fetchMessage'
export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case GOT_PROFILE :
      return [...state,payload]

    case UPDATED_PROFILE :
      let updatedState = state.map((profile)=>{
        if(profile._id===payload._id){
          return payload
        } else {
          return profile
        }
      })
      return updatedState

    case UNREAD_MESSAGE_COUNT  :
      const count = payload.message
      const userId = payload.id
      const stateWithCount = state.map((profile) => {
        if(userId===profile.userId){
          profile.count = count
          return profile
        } else {
          return profile
        }
      })
      return stateWithCount

    case CLEAR_PROFILE :
      return []
    // case 'PROFILE_CREATED' :
    //   return [ ...payload ]
    case NO_PROFILE :
      return state

    default :
      return state
  }
}
