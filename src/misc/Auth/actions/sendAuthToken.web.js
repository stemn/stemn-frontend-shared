import http                           from 'axios';
import setAuthToken                   from './setAuthToken.js';
import loadUserData                   from './loadUserData.js';
import { oauthCreds }                 from '../Auth.config.js';

export default ({ provider, code }) => {
  return (dispatch) => {
    if(oauthCreds[provider]){
      dispatch({
        type: 'AUTH/POST_AUTHENTICATE',
        payload: http({
          method: 'POST',
          url: oauthCreds[provider].postUrl,
          data: {
            code: code,
            redirectUri: oauthCreds[provider].params.redirect_uri
          }
        }).then(response => {
          dispatch(setAuthToken(response.data.token))
          setTimeout(() => dispatch(loadUserData()), 1)
          return response
        })
      })
    }
  }
}