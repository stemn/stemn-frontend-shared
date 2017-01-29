import querystring    from 'querystring';
import { oauthCreds } from '../Auth.config.js';
import sendAuthToken  from './sendAuthToken.web.js';

const authPopup = ({redirect, path}) => {
  return new Promise((resolve, reject) => {
    const windowName    = 'ConnectWithOAuth'; // should not include space for IE
    const windowOptions = 'status=0,width=800,height=400';
    const oauthWindow   = window.open(path, windowName, windowOptions);
    const oauthInterval = window.setInterval(() => {
      const url = oauthWindow.document.URL;
      if (url.includes(redirect)) {
        window.clearInterval(oauthInterval);
        const params = querystring.parse(url.substr(url.indexOf('?') + 1));
        oauthWindow.close();
        resolve(params)
      }
      else if(oauthWindow.closed){
        window.clearInterval(oauthInterval);
        reject('OAuth Popup Closed');
      }
    }, 100);
  })
}

export default (provider) => {
  return (dispatch) => {
    if(oauthCreds[provider]){
      const url = oauthCreds[provider].url +'?'+ querystring.stringify(oauthCreds[provider].params);
      
      // Pop the oAuth popup
      authPopup({
        path     : url, 
        redirect : oauthCreds[provider].params.redirect_uri
      }).then(({code}) => {
        // Send the token
        dispatch(sendAuthToken({
          provider : provider, 
          code     : code
        }))
      })
    }
    return dispatch({
      type:'AUTH/AUTHENTICATE',
      payload: {}
    })
  }
}
