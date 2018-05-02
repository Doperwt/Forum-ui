import { GOT_CATEGORIES,CLEAR_CATEGORIES } from '../actions/categories'
export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case GOT_CATEGORIES :
      return [ ...payload ]

    case CLEAR_CATEGORIES :
      return []
      
    default :
      return state
  }
}
