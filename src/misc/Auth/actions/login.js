import http from 'axios';
import setAuthToken from './setAuthToken.js'
import loadUserData from './loadUserData.js'

export default ({email, password}) => {
  return (dispatch) => {
    dispatch({
      type:'AUTH/LOGIN',
      payload: http({
        url: '/api/v1/auth/login',
        method: 'POST',
        data: {
          email,
          password
        }
      }).then((response)=>{
        dispatch(setAuthToken(response.data.token))
        setTimeout(()=>dispatch(loadUserData()), 1)
        return response
      })
    })
  }
}