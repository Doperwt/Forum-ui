import { GOT_NAMES } from '../actions/messages/getNames'

export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case GOT_NAMES :
      return payload

    default :
      return state
  }
}
