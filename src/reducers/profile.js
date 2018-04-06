import { GOT_PROFILE,COLLECTED_PROFILES } from '../actions/user/get-profile'
import { UPDATED_PROFILE } from '../actions/user/update-profile'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case GOT_PROFILE :
      return payload

    case UPDATED_PROFILE :
      return payload

    case COLLECTED_PROFILES :
      return payload
    // case 'PROFILE_CREATED' :
    //   return [ ...payload ]

    default :
      return state
  }
}
