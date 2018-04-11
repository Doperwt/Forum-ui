import API from '../../api/client'
import { LOAD_ERROR } from '../loading'
export const GOT_CATEGORIES = 'GOT_CATEGORIES'

const api = new API()

export default () => {
  return (dispatch) => {
    api.get('/categories')
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
