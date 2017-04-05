import http from 'axios';
import { setAuthToken, loadUserData } from './';

export default ({email, password, firstname, lastname}) => {
  return (dispatch) => {
    dispatch({
      type:'AUTH/REGISTER',
      payload: http({
        url: `/api/v1/auth/register`,
        method: 'POST',
        data: {
          email,
          password,
          firstname,
          lastname
        }
      }).then((response)=>{
        dispatch(setAuthToken(response.data.token))
        setTimeout(()=>dispatch(loadUserData()), 1)
        return response
      })
    })
  }
}