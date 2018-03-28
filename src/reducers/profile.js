import { GOT_PROFILE } from '../actions/user/get-profile'
import { UPDATED_PROFILE } from '../actions/user/update-profile'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case GOT_PROFILE :
      return [ ...payload ]

    case UPDATED_PROFILE :
      return [ ...payload ]

    case 'PROFILE_CREATED' :
      return [ ...payload ]

    default :
      return state
  }
}
