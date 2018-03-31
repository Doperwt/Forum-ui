import API from '../../api/client'

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
          type: 'LOAD_ERRORR',
          payload: error.message
        })
      })
  }
}
