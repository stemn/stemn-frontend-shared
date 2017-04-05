import { oauthCreds } from '../Auth.config.js';
import querystring from 'querystring';
import sendAuthToken from './sendAuthToken';

const getPosition = (w, h) => {
  return {
    left: (screen.width/2)-(w/2),
    top: (screen.height/2)-(h/2),
  }
}

const popOauth = (url) => new Promise((resolve, reject) => {
    const interval = 500;
    const width = 780;
    const height = 410;
    const position = getPosition(width, height);
    const options = `width=${width},height=${height},toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=${position.left},top=${position.top}`;
    const signinWin = window.open(url, "SignIn", options);

    const check = () => {
      const query = signinWin.location.search.substr(1);
      const queryParams = querystring.parse(query);
      if (queryParams.code) {
        resolve(queryParams);
        signinWin.close();
      } else if (signinWin.closed) {
        reject('Window Closed')
      }
      else {
        setTimeout(check, interval);
      }
    };
  
    setTimeout(check, interval);
    signinWin.focus();
})


export default (provider) => (dispatch) => {
  if(oauthCreds[provider]){
    const url = oauthCreds[provider].url +'?'+ querystring.stringify(oauthCreds[provider].params);
    
    return dispatch({
      type:'AUTH/AUTHENTICATE',
      payload: popOauth(url),
    }).then(({ value: { code } })=> {
      console.log({provider, code});
      dispatch(sendAuthToken({
        provider, 
        code
      }))
    })
  }
}

