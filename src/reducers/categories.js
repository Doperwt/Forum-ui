import { GOT_CATEGORIES } from '../actions/articles/categories'
export default ( state = [], { type , payload } = { } ) => {
  switch (type) {
    case GOT_CATEGORIES :
      return [ ...payload ]

    default :
      return state
  }
}
