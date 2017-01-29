import { websocketLeaveRoom } from '../Auth.actions.js'
import { loginRoute } from 'route-actions';

export default () => {
  return (dispatch, getState) => {
    dispatch({
      type:'AUTH/LOGOUT'
    })
    dispatch(loginRoute())
    dispatch(websocketLeaveRoom({
      userId: getState().auth.user._id
    }))
  }
}