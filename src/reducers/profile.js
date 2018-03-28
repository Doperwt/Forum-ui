import { GOT_PROFILE, UPDATED_PROFILE } from '../actions/user/get-profile'

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
