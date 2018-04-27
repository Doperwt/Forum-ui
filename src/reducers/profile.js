import { GOT_PROFILE,NO_PROFILE } from '../actions/user/get-profile'
import { UPDATED_PROFILE } from '../actions/user/update-profile'
import { CLEAR_PROFILE } from '../actions/user/sign-out'

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
