import querystring    from 'querystring';
import { shell }      from 'electron';
import { oauthCreds } from '../Auth.config.js';

export default (provider) => {
  return (dispatch) => {
    if(oauthCreds[provider]){
      const url = oauthCreds[provider].url +'?'+ querystring.stringify(oauthCreds[provider].params);
      shell.openExternal(url)
    }
    return dispatch({
      type:'AUTH/AUTHENTICATE',
      payload: {}
    })
  }
}