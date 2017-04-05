import http from 'axios';
import { loadUserData } from './';
import { show as showToast } from '../../Toasts/Toasts.actions.js';

export default (code) => {
  return (dispatch) => {
    return dispatch({
      type: 'AUTH/SUBMIT_BETA_CODE',
      payload: http({
        url: `/api/v1/beta/signup`,
        method: 'POST',
        data: {
          ref: code
        }
      })
    }).then(response => {
      dispatch(loadUserData());
      dispatch(showToast({ title: `Beta access granted. Welcome to the Stemn Desktop Beta!`}));
    })
  }
}