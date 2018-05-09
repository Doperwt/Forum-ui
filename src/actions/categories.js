import API from '../api/client'
import { LOAD_ERROR } from './loading'
export const GOT_CATEGORIES = 'GOT_CATEGORIES'
export const CLEAR_CATEGORIES = 'CLEAR_CATEGORIES'
const api = new API()

export default (route) => {
  return (dispatch) => {
    api.get(`/categories/${route}`)
      .then((result) => {
        dispatch({
          type: GOT_CATEGORIES,
          payload: result.body
        })
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ERROR,
          payload: error.message
        })
      })
  }
}
export const clearCategories = () => {
  return (dispatch) => {
    dispatch({type:CLEAR_CATEGORIES})
  }
}
