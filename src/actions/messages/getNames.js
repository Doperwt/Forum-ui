import API from '../../api/client'
import { LOAD_ERROR } from '../loading'

export const GOT_NAMES = 'GOT_NAMES'
const api = new API()

export default (partialName) => {
  return (dispatch) => {
    api.get(`/names/${partialName}`)
      .then((result) => {
        dispatch({ type:GOT_NAMES, payload:result.body})
      })
      .catch((err) => {
        dispatch({ type:LOAD_ERROR })
      })
  }
}
