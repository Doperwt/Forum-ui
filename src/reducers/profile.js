import { GOT_PROFILE,NO_PROFILE } from '../actions/user/get-profile'
import { UPDATED_PROFILE } from '../actions/user/update-profile'
import { CLEAR_PROFILE } from '../actions/user/sign-out'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case GOT_PROFILE :
      return [payload]

    case UPDATED_PROFILE :
      return [payload]  

    case CLEAR_PROFILE :
      return []
    // case 'PROFILE_CREATED' :
    //   return [ ...payload ]
    case NO_PROFILE :
      return []

    default :
      return state
  }
}
